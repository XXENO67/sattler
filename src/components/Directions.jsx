import { MapPin } from 'lucide-react'
import { MAPS_EMBED, MAPS_URL } from '../data/contact'

export default function Directions() {
  return (
    <section id="anfahrt" className="scroll-mt-24 bg-[#1a1a1a] px-5 py-16 pb-28 sm:px-8 sm:py-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <MapPin className="h-7 w-7 shrink-0 text-brand-500 sm:h-8 sm:w-8" strokeWidth={2.2} aria-hidden="true" />
          <h2 className="font-heading text-[clamp(1.45rem,7vw,2.2rem)] font-extrabold uppercase tracking-[0.12em] text-white">
            Anfahrt
          </h2>
        </div>
        <div className="mt-4 h-px w-full bg-white" aria-hidden="true" />

        <div className="mt-8 overflow-hidden rounded-sm border border-white/10">
          <iframe
            title="Standort Dellentechnik Sattler in Waldbröl"
            src={MAPS_EMBED}
            className="h-[240px] w-full border-0 sm:h-[340px] md:h-[380px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p className="mt-4 text-center md:text-left">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white/70 underline-offset-4 transition hover:text-brand-300 hover:underline"
          >
            Route in Google Maps öffnen
          </a>
        </p>
      </div>
    </section>
  )
}
