import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { EMAIL, TEL_DISPLAY, TEL_HREF } from '../data/contact'

export default function Impressum() {
  return (
    <main className="min-h-screen bg-ink-950 px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-brand-300 transition hover:text-brand-200">
          <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
        </Link>

        <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Impressum</h1>

        <div className="mt-10 space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">Angaben gemäß § 5 TMG</h2>
            <p>
              Roman Sattler
              <br />
              Kfz-Mechatroniker - Dellentechniker
              <br />
              Bettinger Weg 13
              <br />
              51545 Waldbröl
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">Kontakt</h2>
            <p>
              Telefon:{' '}
              <a href={TEL_HREF} className="text-brand-300 hover:text-brand-200">
                {TEL_DISPLAY}
              </a>
              <br />
              E-Mail:{' '}
              <a href={`mailto:${EMAIL}`} className="text-brand-300 hover:text-brand-200">
                {EMAIL}
              </a>
            </p>
            <p className="mt-4 text-sm text-white/45">
              Quelle:{' '}
              <a href="http://www.e-recht24.de" className="hover:text-white" target="_blank" rel="noreferrer">
                http://www.e-recht24.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">Haftungsausschluss (Disclaimer)</h2>
            <h3 className="mb-2 font-semibold text-white">Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach § 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder
              Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
              diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
              möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
              entfernen.
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-white">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
              verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
              Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
              zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-white">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
              Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem
              auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
              Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
