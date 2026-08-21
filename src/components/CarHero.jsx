import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

const FRAME_COUNT = 192
const INTRO_END_FRAME = 14
const PRIORITY_PRELOAD_END = 48
const SOURCE_SIZE = { width: 1920, height: 1080 }
const STUDIO = '#080808'

const frameUrl = (frame) => {
  const number = String(frame + 1).padStart(4, '0')
  return `/frames/frame_${number}.png`
}

function drawCover(canvas, image, mode) {
  const rect = canvas.getBoundingClientRect()
  if (!rect.width || !rect.height) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const requestedWidth = Math.round(rect.width * dpr)
  const requestedHeight = Math.round(rect.height * dpr)
  const maxPixels = 3840 * 2160
  const renderScale = Math.min(1, Math.sqrt(maxPixels / (requestedWidth * requestedHeight)))
  const width = Math.max(1, Math.round(requestedWidth * renderScale))
  const height = Math.max(1, Math.round(requestedHeight * renderScale))

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }

  const context = canvas.getContext('2d', { alpha: false, desynchronized: true })
  const sourceWidth = image.naturalWidth || SOURCE_SIZE.width
  const sourceHeight = image.naturalHeight || SOURCE_SIZE.height
  const scale =
    mode === 'mobile'
      ? width / sourceWidth
      : Math.max(width / sourceWidth, height / sourceHeight)
  const drawWidth = sourceWidth * scale
  const drawHeight = sourceHeight * scale
  const drawX = (width - drawWidth) / 2
  const drawY = (height - drawHeight) / 2

  context.setTransform(1, 0, 0, 1, 0, 0)
  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.fillStyle = STUDIO
  context.fillRect(0, 0, width, height)
  context.drawImage(image, drawX, drawY, drawWidth, drawHeight)
}

export default function CarHero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const posterRef = useRef(null)
  const heroTextRef = useRef(null)
  const cueRef = useRef(null)
  const renderFrameRef = useRef(() => {})
  const startIntroRef = useRef(() => {})
  const framesReadyRef = useRef(false)
  const introPlayedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    let disposed = false
    let mode = window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop'
    let currentFrame = 0
    let displayedFrame = -1
    let lastRequestedFrame = 0
    let renderRequest = 0
    let resizeRequest = 0
    let pendingFrame = 0
    const cache = new Map()
    const inFlight = new Map()

    const hidePoster = () => {
      if (posterRef.current) posterRef.current.style.opacity = '0'
    }

    const trimCache = () => {
      const maxEntries = mode === 'mobile' ? 28 : 24
      if (cache.size <= maxEntries) return

      const byDistance = [...cache.keys()].sort(
        (a, b) => Math.abs(a - currentFrame) - Math.abs(b - currentFrame),
      )
      for (const frame of byDistance.slice(maxEntries)) cache.delete(frame)
    }

    const drawFrame = (frame) => {
      const image = cache.get(frame)
      if (!image) return
      drawCover(canvas, image, mode)
      displayedFrame = frame
      hidePoster()
    }

    const closestLoadedFrame = (target) => {
      let closest = -1
      let distance = Number.POSITIVE_INFINITY
      for (const frame of cache.keys()) {
        const nextDistance = Math.abs(frame - target)
        if (nextDistance < distance) {
          closest = frame
          distance = nextDistance
        }
      }
      return closest
    }

    const loadFrame = (frame, priority = 'auto') => {
      if (frame < 0 || frame >= FRAME_COUNT || cache.has(frame)) {
        return Promise.resolve(cache.get(frame))
      }

      const requestKey = String(frame)
      if (inFlight.has(requestKey)) return inFlight.get(requestKey)

      const request = new Promise((resolve) => {
        const image = new Image()
        image.decoding = 'async'
        image.fetchPriority = priority
        image.onload = async () => {
          try {
            await image.decode()
          } catch {
            // Draw anyway if decode() is unavailable.
          }

          inFlight.delete(requestKey)
          if (disposed) {
            resolve(undefined)
            return
          }

          cache.set(frame, image)
          trimCache()
          if (frame === currentFrame || displayedFrame < 0) drawFrame(frame)
          resolve(image)
        }
        image.onerror = () => {
          inFlight.delete(requestKey)
          resolve(undefined)
        }
        image.src = frameUrl(frame)
      })

      inFlight.set(requestKey, request)
      return request
    }

    const preloadRange = async (start, end, concurrency) => {
      let nextFrame = start
      const worker = async () => {
        while (!disposed && nextFrame <= end) {
          const frame = nextFrame
          nextFrame += 1
          await loadFrame(frame, frame <= INTRO_END_FRAME ? 'high' : 'low')
        }
      }
      await Promise.all(Array.from({ length: concurrency }, () => worker()))
    }

    const warmFrames = (target, direction) => {
      const offsets =
        direction >= 0
          ? [1, 2, 3, 4, 5, 7, 10, 14, -1, -2]
          : [-1, -2, -3, -4, -5, -7, -10, -14, 1, 2]

      for (const offset of offsets) {
        const frame = target + offset
        const maxInFlight = mode === 'mobile' ? 8 : 10
        if (inFlight.size >= maxInFlight && Math.abs(offset) > 2) continue
        loadFrame(frame, Math.abs(offset) <= 3 ? 'high' : 'auto')
      }
    }

    const drawRequestedFrame = (requestedFrame) => {
      const target = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(requestedFrame)))
      const direction = target - lastRequestedFrame
      currentFrame = target
      lastRequestedFrame = target

      if (cache.has(target)) drawFrame(target)
      else {
        const closest = closestLoadedFrame(target)
        if (closest >= 0) drawFrame(closest)
        loadFrame(target, 'high')
      }

      warmFrames(target, direction)
    }

    const renderFrame = (requestedFrame) => {
      pendingFrame = requestedFrame
      if (renderRequest) return
      renderRequest = window.requestAnimationFrame(() => {
        renderRequest = 0
        drawRequestedFrame(pendingFrame)
      })
    }

    renderFrameRef.current = renderFrame

    const handleResize = () => {
      if (resizeRequest) window.cancelAnimationFrame(resizeRequest)
      resizeRequest = window.requestAnimationFrame(() => {
        resizeRequest = 0
        const nextMode = window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop'
        if (nextMode !== mode) {
          mode = nextMode
          displayedFrame = -1
          loadFrame(currentFrame, 'high')
        }
        trimCache()
        if (displayedFrame >= 0) drawFrame(displayedFrame)
        ScrollTrigger.refresh()
      })
    }

    loadFrame(0, 'high').then(async () => {
      if (disposed) return
      await preloadRange(1, INTRO_END_FRAME, 5)
      if (disposed) return
      framesReadyRef.current = true
      startIntroRef.current()
      preloadRange(INTRO_END_FRAME + 1, PRIORITY_PRELOAD_END, 3)
    })

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      disposed = true
      framesReadyRef.current = false
      renderFrameRef.current = () => {}
      startIntroRef.current = () => {}
      if (renderRequest) window.cancelAnimationFrame(renderRequest)
      if (resizeRequest) window.cancelAnimationFrame(resizeRequest)
      window.removeEventListener('resize', handleResize)
      cache.clear()
      inFlight.clear()
    }
  }, [])

  useGSAP(
    () => {
      gsap.set(heroTextRef.current, { autoAlpha: 0, y: 16, filter: 'blur(5px)' })
      const media = gsap.matchMedia()

      media.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isMobile, reduced } = context.conditions

          if (reduced) {
            renderFrameRef.current(INTRO_END_FRAME)
            gsap.set(heroTextRef.current, { autoAlpha: 1, y: 0, filter: 'blur(0px)' })
            gsap.set(cueRef.current, { autoAlpha: 0 })
            return undefined
          }

          let introFinished = false
          let introTween
          const introSequence = { frame: 0 }
          const sequence = { frame: INTRO_END_FRAME }

          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${Math.round(window.innerHeight * (isMobile ? 2.2 : 2.6))}`,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              scrub: isMobile ? 0.16 : 0.2,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (self.progress > 0.001 && !introFinished) {
                  introTween?.kill()
                  introFinished = true
                }
              },
            },
          })

          timeline
            .to(
              sequence,
              {
                frame: FRAME_COUNT - 1,
                duration: 100,
                onUpdate: () => {
                  const progress = timeline.scrollTrigger?.progress ?? 0
                  if (introFinished || progress > 0.001) renderFrameRef.current(sequence.frame)
                },
              },
              0,
            )
            .to(cueRef.current, { autoAlpha: 0, duration: 8 }, 0)
            .fromTo(
              heroTextRef.current,
              { autoAlpha: 0, y: 16, filter: 'blur(5px)' },
              { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 8, ease: 'power2.out' },
              0,
            )

          const startIntro = () => {
            if (introPlayedRef.current || introFinished) return
            introPlayedRef.current = true
            introTween = gsap.to(introSequence, {
              frame: INTRO_END_FRAME,
              duration: 1.05,
              ease: 'power2.inOut',
              onUpdate: () => renderFrameRef.current(introSequence.frame),
              onComplete: () => {
                introFinished = true
                renderFrameRef.current(INTRO_END_FRAME)
              },
            })
          }

          startIntroRef.current = startIntro
          if (framesReadyRef.current) startIntro()

          return () => {
            introTween?.kill()
            startIntroRef.current = () => {}
          }
        },
      )

      return () => media.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-[#080808]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
        <img
          ref={posterRef}
          src={frameUrl(0)}
          alt=""
          fetchpriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full max-w-none select-none object-contain object-center transition-opacity duration-200 md:object-cover"
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full max-w-none" />
      </div>

      <p className="sr-only">
        Animierter schwarzer Sportwagen, der sich in einer technischen Explosionsansicht zerlegt und
        anschließend präzise wieder zusammenfügt.
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.12)_36%,rgba(0,0,0,0.04)_70%,rgba(0,0,0,0.5)_100%)]"
      />

      <div className="pointer-events-none absolute left-1/2 top-[clamp(88px,12svh,128px)] z-[5] w-[min(94vw,1100px)] -translate-x-1/2 px-4 text-center md:top-[clamp(90px,11svh,145px)] md:px-6">
        <div
          ref={heroTextRef}
          className="flex flex-col items-center"
          style={{
            willChange: 'transform, opacity, filter',
            textShadow: '0 3px 24px rgba(0, 0, 0, 0.9)',
          }}
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60 md:mb-4 md:text-[clamp(11px,0.8vw,15px)] md:tracking-[0.28em]">
            Dellentechnik
          </p>
          <h1 className="font-heading font-black leading-[0.92] tracking-tight">
            <span
              className="block text-[clamp(36px,11vw,64px)] md:text-[clamp(54px,5vw,92px)]"
              style={{ color: '#E10600' }}
            >
              SATTLER
            </span>
            <span className="mx-auto mt-3 block text-[12px] font-semibold uppercase leading-relaxed tracking-[0.1em] text-white/70 md:text-[clamp(12px,1vw,18px)] md:tracking-[0.14em]">
              Präzise Dellenreparatur
              <span className="hidden md:inline"> · </span>
              <br className="md:hidden" />
              ohne Lackieren
            </span>
          </h1>
          <p className="mt-4 max-w-[22ch] text-center font-heading text-[15px] font-semibold leading-snug text-white sm:max-w-none md:text-[clamp(16px,1.4vw,24px)]">
            Die Karosserie bleibt original. Das Ergebnis ist unsichtbar.
          </p>
        </div>
      </div>

      <div className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-[5] -translate-x-1/2">
        <div ref={cueRef} aria-hidden="true">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 bg-black/10 p-1.5 backdrop-blur-sm">
            <span className="h-2 w-1 animate-bounce rounded-full bg-brand-500" />
          </div>
        </div>
      </div>
    </section>
  )
}
