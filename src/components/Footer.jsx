import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { EMAIL, TEL_DISPLAY, TEL_HREF } from '../data/contact'

const SECTIONS = [
  { label: 'Leistungen', id: 'leistungen' },
  { label: 'Über uns', id: 'ueber-uns' },
  { label: 'Bewertungen', id: 'bewertungen' },
  { label: 'Kontakt', id: 'kontakt' },
  { label: 'Anfahrt', id: 'anfahrt' },
]

const linkClass =
  'inline-flex min-h-[36px] items-center rounded transition-colors hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-footer'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const goToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="border-t border-white/[0.08] bg-ink-footer pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8 lg:text-left">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-5">
            <Link to="/" aria-label="Dellentechnik Sattler – zur Startseite" className="inline-flex">
              <img
                src="/sattler/brand/logo.png"
                alt="Dellentechnik Sattler"
                width={196}
                height={56}
                loading="lazy"
                decoding="async"
                className="mx-auto h-14 w-auto max-w-full object-contain lg:mx-0"
              />
            </Link>
            <p className="mx-auto mt-5 w-full min-w-0 max-w-[34ch] break-words text-sm leading-relaxed text-white/50 lg:mx-0 lg:max-w-sm">
              Professionelle Dellenreparatur ohne Lackieren. Original-Lack bleibt erhalten —
              präzise, sauber und unsichtbar.
            </p>
          </div>

          <nav aria-label="Footer-Navigation" className="min-w-0 lg:col-span-3">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">
              Navigation
            </h2>
            <ul className="mx-auto w-max text-sm text-white/55 lg:mx-0">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button type="button" onClick={() => goToSection(s.id)} className={`${linkClass} w-full justify-center lg:justify-start`}>
                    {s.label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/impressum" className={`${linkClass} w-full justify-center lg:justify-start`}>
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className={`${linkClass} w-full justify-center lg:justify-start`}>
                  Datenschutz
                </Link>
              </li>
            </ul>
          </nav>

          <div className="min-w-0 lg:col-span-4">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">
              Kontakt
            </h2>
            <ul className="mx-auto w-max max-w-full space-y-2 text-left text-sm text-white/55 lg:mx-0">
              <li className="flex items-start gap-2.5 py-1">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                Hauptstraße 69, 51545 Waldbröl
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a href={TEL_HREF} className={linkClass}>
                  {TEL_DISPLAY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.08] pt-6">
          <p className="text-xs text-white/40">© 2026 Dellentechnik Sattler · Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}
