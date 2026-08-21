import { motion, useReducedMotion } from 'framer-motion'

const SERVICES = [
  {
    title: 'Drücktechnik',
    desc: 'Dellen werden von innen kontrolliert herausgedrückt. Der Originallack bleibt vollständig erhalten.',
    img: '/brand/druecktechnik.jpg',
    alt: 'Dellentechnik Sattler: Drücktechnik an einer schwarzen Fahrzeugtür',
  },
  {
    title: 'Klebe-Zieh-Technik',
    desc: 'Mit Klebetabs und Zugbrücke werden Dellen millimetergenau gezogen — ohne Bohren und ohne Spachtel.',
    img: '/brand/klebe-zieh-technik.jpg',
    alt: 'Klebe-Zieh-Technik mit Zugbrücke auf glänzend schwarzem Lack',
  },
  {
    title: 'Schlagmethode',
    desc: 'Gezieltes Arbeiten mit Gleithammer und Tabs, wenn Zug und Druck kombiniert die beste Korrektur ergeben.',
    img: '/brand/schlagmethode.jpg',
    alt: 'Schlagmethode mit Gleithammer an einem schwarzen Fahrzeugdach',
  },
]

export default function Services() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="leistungen" className="relative scroll-mt-24 bg-ink-950 pt-5 pb-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center md:mx-0 md:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-300">Leistungen</p>
          <h2
            className="mt-4 font-heading font-extrabold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.1rem, 6vw, 3.4rem)' }}
          >
            Drei Techniken. Ein Ziel.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
            Jede Delle wird so behandelt, wie es die Stelle verlangt. Lack, Spaltmaße und Struktur
            bleiben original — das Fahrzeug sieht aus, als wäre nie etwas gewesen.
          </p>
        </motion.div>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.title}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: reduceMotion ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 transition-colors duration-500 hover:border-brand-400/30"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={s.img}
                  alt={s.alt}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent"
                />
              </div>

              <div className="px-5 pb-6 pt-5 text-center sm:px-6 md:text-left">
                <h3 className="font-heading text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-brand-300 sm:text-xl">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
