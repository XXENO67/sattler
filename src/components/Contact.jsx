import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { EMAIL, TEL_DISPLAY, TEL_HREF } from '../data/contact'

const LEISTUNGEN = [
  'Drücktechnik',
  'Klebe-Zieh-Technik',
  'Schlagmethode',
  'Hagelschaden',
  'Parkdelle',
  'Sonstiges',
]

const EMPTY_FORM = { name: '', email: '', telefon: '', leistung: '', nachricht: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({ name: '', email: '', nachricht: '' })
  const [status, setStatus] = useState('idle')
  const reduceMotion = useReducedMotion()

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: '' }))
    if (status === 'error') setStatus('idle')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {
      name: form.name.trim() ? '' : 'Bitte geben Sie Ihren Namen ein.',
      email:
        !form.email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())
          ? ''
          : 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      nachricht: form.nachricht.trim() ? '' : 'Bitte beschreiben Sie den Schaden kurz.',
    }
    setErrors(next)
    if (next.name || next.email || next.nachricht) return

    const subject = encodeURIComponent('Anfrage Dellentechnik Sattler')
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nE-Mail: ${form.email.trim()}\nTelefon: ${form.telefon.trim() || '—'}\nLeistung: ${form.leistung || '—'}\n\n${form.nachricht.trim()}`,
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setStatus('success')
    setForm(EMPTY_FORM)
  }

  const field =
    'w-full min-h-[48px] rounded-xl border bg-ink-950/60 px-4 py-3.5 text-base text-white placeholder-white/35 outline-none transition focus:ring-2 focus:ring-brand-500/20'
  const ok = 'border-white/10 focus:border-brand-400/60'
  const bad = 'border-red-500/70 focus:border-red-500'
  const cls = (key) => `${field} ${errors[key] ? bad : ok}`

  return (
    <section id="kontakt" className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-16 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-300">Kontakt</p>
          <h2
            className="mt-4 font-heading font-extrabold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: 'clamp(1.85rem, 7vw, 3.2rem)' }}
          >
            Schaden einschätzen lassen
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="mx-auto w-max max-w-full space-y-8 text-left text-white/75 lg:mx-0">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">E-Mail</p>
              <a href={`mailto:${EMAIL}`} className="mt-2 inline-flex min-h-[44px] items-center gap-2 break-all text-white transition hover:text-brand-300">
                <Mail className="h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                {EMAIL}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">Telefon</p>
              <a href={TEL_HREF} className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-white transition hover:text-brand-300">
                <Phone className="h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                {TEL_DISPLAY}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">Öffnungszeiten</p>
              <div className="mt-3 flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                <div className="text-sm leading-relaxed">
                  <p>Mo – Fr 08:00 – 12:30 Uhr</p>
                  <p>13:00 – 16:30 Uhr</p>
                  <p className="mt-2">Sa 08:00 – 12:00 Uhr</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">Adresse</p>
              <p className="mt-3 flex gap-2.5 text-sm leading-relaxed">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                <span>
                  Roman Sattler
                  <br />
                  Hauptstraße 69
                  <br />
                  51545 Waldbröl
                </span>
              </p>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-white/10 bg-ink-900/40 p-5 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Name (Pflichtfeld)
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Name*"
                  value={form.name}
                  onChange={update('name')}
                  aria-invalid={errors.name ? 'true' : undefined}
                  className={cls('name')}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="contact-telefon" className="sr-only">
                  Telefonnummer
                </label>
                <input
                  id="contact-telefon"
                  name="telefon"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Telefon"
                  value={form.telefon}
                  onChange={update('telefon')}
                  className={cls('telefon')}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  E-Mail-Adresse
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="E-Mail"
                  value={form.email}
                  onChange={update('email')}
                  aria-invalid={errors.email ? 'true' : undefined}
                  className={cls('email')}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="contact-leistung" className="sr-only">
                  Gewünschte Leistung
                </label>
                <div className="relative">
                  <select
                    id="contact-leistung"
                    name="leistung"
                    value={form.leistung}
                    onChange={update('leistung')}
                    className={`${cls('leistung')} appearance-none pr-11 ${form.leistung ? 'text-white' : 'text-white/40'}`}
                  >
                    <option value="" className="bg-ink-950 text-white">
                      Gewünschte Leistung
                    </option>
                    {LEISTUNGEN.map((l) => (
                      <option key={l} value={l} className="bg-ink-950 text-white">
                        {l}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-nachricht" className="sr-only">
                Ihre Nachricht (Pflichtfeld)
              </label>
              <textarea
                id="contact-nachricht"
                name="nachricht"
                rows={5}
                placeholder="Ihre Nachricht* – wo sitzt die Delle, welches Fahrzeug?"
                value={form.nachricht}
                onChange={update('nachricht')}
                aria-invalid={errors.nachricht ? 'true' : undefined}
                className={`${cls('nachricht')} resize-none`}
              />
              {errors.nachricht && <p className="mt-1.5 text-xs text-red-400">{errors.nachricht}</p>}
            </div>

            <button
              type="submit"
              className="group mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-8 text-base font-semibold text-white shadow-xl shadow-brand-500/25 transition hover:bg-brand-400"
            >
              {status === 'success' ? (
                <>
                  <Check className="h-5 w-5" aria-hidden="true" /> E-Mail-Programm geöffnet
                </>
              ) : (
                <>
                  Anfrage senden
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
