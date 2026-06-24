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
    <main className="relative min-h-screen bg-[#020203] text-zinc-200 selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* PREMIUM BACKGROUND ARCHITECTURE */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* The Dot Grid - Classic Vercel/Linear look */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #3f3f46 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Top Center Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-indigo-600/20 blur-[160px] rounded-full opacity-50" />

        {/* Animated Aurora Blobs */}
        <div
          className="
            absolute
            -top-[10%]
            -left-[10%]
            h-[800px]
            w-[800px]
            rounded-full
            bg-indigo-600/10
            blur-[180px]
            animate-pulse
          "
        />

        <div
          className="
            absolute
            top-[20%]
            -right-[10%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-purple-600/10
            blur-[180px]
            animate-pulse
            [animation-delay:2000ms]
          "
        />

        <div
          className="
            absolute
            bottom-[-20%]
            left-[20%]
            h-[900px]
            w-[900px]
            rounded-full
            bg-blue-600/10
            blur-[220px]
            animate-pulse
            [animation-delay:4000ms]
          "
        />

        {/* Subtle vertical beam for depth */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-10">
        <Navbar />

        <div className="space-y-32 pb-32">
          <section className="pt-10 md:pt-20">
            <Hero />
          </section>

          <section className="px-6">
            <div className="max-w-7xl mx-auto">
              <DashboardPreview />
            </div>
          </section>

          <section className="relative">
            {/* Section Divider Light Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
            <Features />
          </section>

          <section className="px-6 bg-zinc-900/10 backdrop-blur-[2px] py-24">
            <HowItWorks />
          </section>

          <section className="px-6">
            <Pricing />
          </section>

          <section className="px-6">
            <Testimonials />
          </section>

          <section className="px-6 max-w-4xl mx-auto">
            <FAQ />
          </section>
        </div>

        <Footer />
      </div>

      {/* Inline styles for custom animations if not defined in tailwind.config.js */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite alternate;
        }
      `}</style>
    </main>
  );
}