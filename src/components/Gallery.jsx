import { motion, useReducedMotion } from 'framer-motion'

const SHOTS = [
  {
    src: '/sattler/brand/slide2.jpg',
    alt: 'Präzise Klebe-Zieh-Technik auf glänzend schwarzem Lack',
  },
  {
    src: '/sattler/brand/slide3.jpg',
    alt: 'Drücktechnik an der Fahrzeugtür im direkten Einsatz',
  },
  {
    src: '/sattler/brand/schlagmethode.jpg',
    alt: 'Schlagmethode am Fahrzeugdach',
  },
]

export default function Gallery() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="galerie" className="relative scroll-mt-24 bg-ink-950 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center md:mx-0 md:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-300">Galerie</p>
          <h2
            className="mt-4 font-heading font-extrabold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.1rem, 6vw, 3.4rem)' }}
          >
            Präzision im Detail
          </h2>
        </motion.div>

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SHOTS.map((shot, i) => (
            <motion.li
              key={shot.src}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: reduceMotion ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-3xl border border-white/10"
            >
              <img
                src={shot.src}
                alt={shot.alt}
                width={900}
                height={600}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] h-auto w-full object-cover"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
