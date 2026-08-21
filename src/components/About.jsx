import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'

const POINTS = ['Ohne Lackieren', 'Originallack bleibt', 'Präzise & unsichtbar']

export default function About() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="ueber-uns" className="relative overflow-hidden scroll-mt-24 bg-ink-900 py-16 sm:py-24 lg:py-32">
      <img
        src="/brand/logo.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[70%] max-w-3xl -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-300">Über uns</p>
          <h2
            className="mt-4 font-heading font-extrabold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.4rem)' }}
          >
            Handwerk, das man nicht sieht.
          </h2>
          <p className="mx-auto mt-6 max-w-[62ch] text-base leading-relaxed text-white/65 lg:mx-0 sm:text-lg">
            Dellentechnik Sattler steht für lackschadenfreie Dellenreparatur. Parkrempler, Hagel und
            Türdellen werden so korrigiert, dass Lack, Linien und Wert des Fahrzeugs erhalten bleiben.
          </p>
          <ul className="mx-auto mt-9 flex w-max flex-col items-start gap-3 lg:mx-0">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium text-white/80">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-3xl border border-white/10"
        >
          <img
            src="/brand/slide1.jpg"
            alt="Dellentechnik Sattler vor dem Firmenfahrzeug"
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[50%_18%]"
          />
        </motion.div>
      </div>
    </section>
  )
}
