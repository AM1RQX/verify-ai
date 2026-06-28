"use client";
import Navbar from "./Navbar";
import Hero from "./Hero";
import DashboardPreview from "./DashboardPreview";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Footer from "./Footer";

export default function DesktopHome() {
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

            </div>

            {/* PAGE CONTENT */}
            <div className="relative z-10">

                <Navbar />

                <div className="space-y-32 pb-32">

                    {/* PRODUCT */}
                    <section id="product" className="pt-10 md:pt-20">
                        <Hero />
                    </section>

                    {/* DASHBOARD PREVIEW */}
                    <section className="px-6">
                        <div className="max-w-7xl mx-auto">
                            <DashboardPreview />
                        </div>
                    </section>

                    {/* FEATURES */}
                    <section id="features" className="relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
                        <Features />
                    </section>

                    {/* HOW IT WORKS */}
                    <section
                        id="how-it-works"
                        className="px-6 bg-zinc-900/10 backdrop-blur-[2px] py-24"
                    >
                        <HowItWorks />
                    </section>

                    {/* PRICING */}
                    <section id="pricing" className="px-6">
                        <Pricing />
                    </section>

                    {/* REVIEWS */}
                    <section id="reviews" className="px-6">
                        <Testimonials />
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="px-6 max-w-4xl mx-auto">
                        <FAQ />
                    </section>

                </div>

                <Footer />

            </div>


        </main>
    );
}