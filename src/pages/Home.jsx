import CarHero from '../components/CarHero'
import Services from '../components/Services'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Reviews from '../components/Reviews'
import Contact from '../components/Contact'
import Directions from '../components/Directions'

export default function Home() {
  return (
    <main>
      <CarHero />
      <Services />
      <About />
      <Gallery />
      <Reviews />
      <Contact />
      <Directions />
    </main>
  )
}
