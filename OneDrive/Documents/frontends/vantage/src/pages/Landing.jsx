import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import TechStack from '../components/landing/TechStack';
import Features from '../components/landing/Features';
import Demo from '../components/landing/Demo';
import Innovation from '../components/landing/Innovation';
import CTA from '../components/landing/CTA';

export default function Landing() {
  return (
    <div className="min-h-screen bg-deep-bg">
      <Header />
      <main>
        <Hero />
        <TechStack />
        <Features />
        <Demo />
        <Innovation />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
