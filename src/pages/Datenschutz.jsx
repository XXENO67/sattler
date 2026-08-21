import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-ink-950 px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-brand-300 transition hover:text-brand-200">
          <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
        </Link>

        <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Datenschutzerklärung</h1>

        <div className="mt-10 space-y-6 text-white/70 leading-relaxed">
          <h2 className="text-lg font-semibold text-white">Datenschutz</h2>
          <p>
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf
            unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden,
            erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
            Zustimmung nicht an Dritte weitergegeben.
          </p>
          <p>
            Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
            Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
            möglich.
          </p>
          <p>
            Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung
            von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich
            widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der
            unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
          </p>
        </div>
      </div>
    </main>
  )
}
