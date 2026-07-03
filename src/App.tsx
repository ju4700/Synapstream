import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Approach } from './components/Approach';
import { WhyNewFirm } from './components/WhyNewFirm';
import { Stack } from './components/Stack';
import { ClosingCTA } from './components/ClosingCTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <div className="grain-overlay" />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Approach />
        <WhyNewFirm />
        <Stack />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
