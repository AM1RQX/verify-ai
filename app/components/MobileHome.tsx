"use client";

import MobileNavbar from "./MobileNavbar";
import MobileHero from "./MobileHero";
import MobileDashboardPreview from "./MobileDashboardPreview";
import MobileFeatures from "./MobileFeatures";
import MobileHowItWorks from "./MobileHowItWorks";
import MobilePricing from "./MobilePricing";
import MobileTestimonials from "./MobileTestimonials";
import MobileFAQ from "./MobileFAQ";
import MobileFooter from "./MobileFooter";

export default function MobileHome() {
    return (
        <main className="relative min-h-screen bg-[#020203] text-zinc-200 overflow-hidden">

            {/* BACKGROUND (тот же стиль что desktop, но легче) */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #3f3f46 1px, transparent 0)`,
                        backgroundSize: "42px 42px",
                    }}
                />

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10">

                <MobileNavbar />

                {/* HERO */}
                <section id="product">
                    <MobileHero />
                </section>

                {/* DASHBOARD */}
                <section className="mt-10">
                    <MobileDashboardPreview />
                </section>

                {/* FEATURES */}
                <section id="features" className="mt-16">
                    <MobileFeatures />
                </section>

                {/* HOW IT WORKS */}
                <section id="how-it-works" className="mt-16">
                    <MobileHowItWorks />
                </section>

                {/* PRICING */}
                <section id="pricing" className="mt-16">
                    <MobilePricing />
                </section>

                {/* TESTIMONIALS */}
                <section id="reviews" className="mt-16">
                    <MobileTestimonials />
                </section>

                {/* FAQ */}
                <section id="faq" className="mt-16">
                    <MobileFAQ />
                </section>

                {/* FOOTER */}
                <MobileFooter />

            </div>
        </main>
    );
}