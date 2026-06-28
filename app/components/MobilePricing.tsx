"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const features = [
    "15 Free analyses every day",
    "AI confidence score",
    "Detailed detection report",
    "Lightning-fast processing",
    "Secure image analysis",
    "24/7 availability"
];

export default function MobilePricing() {
    return (
        <section className="px-6 py-20">

            <div className="text-center">

                <p className="uppercase tracking-[4px] text-xs text-purple-400 font-semibold">
                    Pricing
                </p>

                <h2 className="mt-4 text-4xl font-black">
                    Simple Pricing
                </h2>

                <p className="mt-5 text-zinc-400 leading-7">
                    Start for free. Upgrade anytime as VerifyAI grows.
                </p>

            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .6 }}
                className="
                    mt-14
                    relative
                    rounded-[36px]
                    border
                    border-indigo-500/30
                    bg-gradient-to-b
                    from-indigo-500/10
                    to-white/5
                    backdrop-blur-xl
                    p-8
                    shadow-[0_0_80px_rgba(99,102,241,.25)]
                "
            >

                <div className="absolute -top-4 left-1/2 -translate-x-1/2">

                    <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-xs font-bold text-white shadow-lg">

                        Most Popular

                    </div>

                </div>

                <div className="mt-4 flex items-center gap-3">

                    <Sparkles className="text-yellow-400" />

                    <h3 className="text-2xl font-bold">
                        VerifyAI Pro
                    </h3>

                </div>

                <div className="mt-8">

                    <span className="text-6xl font-black">
                        $9
                    </span>

                    <span className="text-zinc-400 text-lg">
                        /month
                    </span>

                </div>

                <div className="mt-10 space-y-5">

                    {features.map((feature) => (

                        <div
                            key={feature}
                            className="flex items-center gap-4"
                        >

                            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">

                                <Check className="w-4 h-4 text-emerald-400" />

                            </div>

                            <span className="text-zinc-300">
                                {feature}
                            </span>

                        </div>

                    ))}

                </div>

                <Link
                    href="/signup"
                    className="
                        mt-10
                        block
                        w-full
                        rounded-2xl
                        bg-gradient-to-r
                        from-indigo-500
                        via-purple-500
                        to-pink-500
                        py-4
                        text-center
                        font-bold
                        text-lg
                        transition
                        active:scale-[.98]
                    "
                >
                    Get Started
                </Link>

            </motion.div>

        </section>
    );
}