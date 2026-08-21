import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import { TEL_HREF } from '../data/contact'

const LINKS = [
  { label: 'Startseite', id: 'top' },
  { label: 'Leistungen', id: 'leistungen' },
  { label: 'Über uns', id: 'ueber-uns' },
  { label: 'Bewertungen', id: 'bewertungen' },
  { label: 'Kontakt', id: 'kontakt' },
  { label: 'Anfahrt', id: 'anfahrt' },
]

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('top')
  const closeButtonRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    closeButtonRef.current?.focus()
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (!sections.length) return

    const ratios = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best = null
        let bestRatio = 0
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        })
        if (best) setActive(best)
      },
      { rootMargin: '-80px 0px -45% 0px', threshold: [0, 0.15, 0.35, 0.6, 0.85, 1] },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname])

  const goToSection = (id) => {
    setOpen(false)
    const behavior = reduceMotion ? 'auto' : 'smooth'
    const scroll = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior })
      else if (id === 'top') window.scrollTo({ top: 0, behavior })
    }
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(scroll, 60)
    } else {
      scroll()
    }
  }

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/10 py-2' : 'border-b border-transparent py-3 sm:py-4'
        }`}
        style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}
      >
        <nav
          aria-label="Hauptnavigation"
          className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-8"
        >
          <Link
            to="/"
            aria-label="Dellentechnik Sattler – zur Startseite"
            onClick={() => setActive('top')}
            className={`flex shrink-0 items-center rounded-md ${focusRing}`}
          >
            <img
              src="/sattler/brand/logo.png"
              alt="Dellentechnik Sattler"
              width={182}
              height={52}
              loading="eager"
              decoding="async"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-[34px] sm:h-[38px]' : 'h-[42px] sm:h-[50px]'}`}
            />
          </Link>

          <ul className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {LINKS.map((l) => {
              const isActive = active === l.id
              return (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => goToSection(l.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative rounded-md py-1 text-[0.9rem] font-medium tracking-[0.04em] transition-colors duration-300 ${focusRing} ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-brand-500 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            onClick={() => goToSection('kontakt')}
            className={`hidden items-center gap-2 rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:bg-brand-400 hover:shadow-brand-400/40 lg:inline-flex ${focusRing}`}
          >
            Anfrage senden
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={TEL_HREF}
              aria-label="Dellentechnik Sattler anrufen"
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-white/80 transition hover:text-brand-300 ${focusRing}`}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              aria-label="Menü öffnen"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${focusRing}`}
            >
              <Menu className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigationsmenü"
            initial={reduceMotion ? { opacity: 0 } : { y: '-100%' }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { y: '-100%' }}
            transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] flex flex-col overflow-y-auto bg-ink-950 lg:hidden"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="flex items-center justify-between px-5 py-3">
              <img
                src="/sattler/brand/logo.png"
                alt="Dellentechnik Sattler"
                width={182}
                height={52}
                decoding="async"
                className="h-[46px] w-auto object-contain"
              />
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Menü schließen"
                onClick={() => setOpen(false)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${focusRing}`}
              >
                <X className="h-7 w-7" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-6 py-6 text-center">
              <ul className="w-full max-w-sm">
                {LINKS.map((l, i) => {
                  const isActive = active === l.id
                  return (
                    <li key={l.id}>
                      <motion.button
                        type="button"
                        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => goToSection(l.id)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`flex min-h-[52px] w-full items-center justify-center rounded-lg font-heading text-[clamp(1.6rem,8vw,2.25rem)] font-extrabold leading-tight transition-colors ${focusRing} ${
                          isActive ? 'text-white' : 'text-white/75'
                        }`}
                      >
                        {l.label}
                      </motion.button>
                    </li>
                  )
                })}
              </ul>

              <button
                type="button"
                onClick={() => goToSection('kontakt')}
                className={`mt-8 flex min-h-[52px] w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-400 ${focusRing}`}
              >
                Anfrage senden
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
