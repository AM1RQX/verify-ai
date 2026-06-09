import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DashboardPreview from "./components/DashboardPreview";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      {/* ANIMATED BACKGROUND */}

      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div
          className="
            absolute
            top-[-300px]
            left-[-250px]
            h-[900px]
            w-[900px]
            rounded-full
            bg-purple-600/20
            blur-[220px]
            animate-blob
          "
        />

        <div
          className="
            absolute
            bottom-[-350px]
            right-[-250px]
            h-[1000px]
            w-[1000px]
            rounded-full
            bg-blue-600/20
            blur-[240px]
            animate-blob
            animation-delay-2000
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[700px]
            w-[700px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-fuchsia-600/10
            blur-[180px]
            animate-blob
            animation-delay-4000
          "
        />

      </div>

      <Navbar />

      <Hero />

      <DashboardPreview />

      <Features />

      <HowItWorks />

      <Pricing />

      <Testimonials />

      <FAQ />

      <Footer />

    </main>
  );
}