import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { REVIEWS } from '../data/reviews'
import { GOOGLE_COUNT, GOOGLE_RATING, GOOGLE_REVIEWS_URL } from '../data/contact'

function GoogleG(props) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function Stars() {
  return (
    <div className="flex justify-center gap-0.5 text-[#FFD700] md:justify-start" aria-label="5 von 5 Sternen">
      {'★★★★★'.split('').map((s, i) => (
        <span key={i} className="text-base leading-none">
          {s}
        </span>
      ))}
    </div>
  )
}

function useVisibleCount() {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return 1
    if (window.innerWidth < 768) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  })
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setCount(1)
      else if (window.innerWidth < 1024) setCount(2)
      else setCount(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return count
}

export default function Reviews() {
  const reduceMotion = useReducedMotion()
  const visible = useVisibleCount()
  const [offset, setOffset] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = REVIEWS.length

  useEffect(() => {
    if (reduceMotion || paused || total < 2) return undefined
    const id = window.setInterval(() => {
      setOffset((o) => (o + visible) % total)
    }, 5500)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion, total, visible])

  const shown = Array.from({ length: visible }, (_, i) => REVIEWS[(offset + i) % total])

  return (
    <section id="bewertungen" className="relative scroll-mt-24 overflow-hidden bg-ink-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-300">Bewertungen</p>
          <h2
            className="mt-4 font-heading font-extrabold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)' }}
          >
            Das sagen unsere Kunden
          </h2>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-white/60">
            <span className="font-semibold text-white">{GOOGLE_RATING}</span>
            <span className="text-[#FFD700]">★★★★★</span>
            <span>auf Google · {GOOGLE_COUNT} Rezensionen</span>
          </p>
        </motion.div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.ul
              key={offset}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto grid max-w-xl grid-cols-1 gap-5 md:max-w-none md:grid-cols-2 lg:grid-cols-3"
            >
              {shown.map((review, i) => (
                <li key={`${review.name}-${offset}-${i}`}>
                  <article className="flex h-full min-h-[220px] flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center md:text-left">
                    <Stars />
                    <p className="mt-4 flex-1 text-sm italic leading-relaxed text-white/80">„{review.text}“</p>
                    <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 font-semibold text-white">
                        {review.name.charAt(0)}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white">{review.name}</div>
                        <div className="flex items-center gap-1.5 text-xs text-white/45">
                          <GoogleG className="h-3.5 w-3.5" /> Google Rezension · 5 Sterne
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-300 transition hover:text-brand-200"
          >
            Alle Google-Bewertungen ansehen
          </a>
        </div>
      </div>
    </section>
  )
}
