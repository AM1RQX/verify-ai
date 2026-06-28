"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck,
    Brain,
    Sparkles,
    CheckCircle2,
} from "lucide-react";

export default function MobileDashboardPreview() {
    return (
        <section className="px-6 pb-20">

            <div className="text-center mb-10">

                <p className="text-purple-400 font-semibold uppercase tracking-[3px] text-xs">
                    Dashboard Preview
                </p>

                <h2 className="mt-3 text-4xl font-black">
                    AI Analysis
                </h2>

                <p className="mt-4 text-zinc-400 leading-7">
                    See exactly what you'll receive after every image analysis.
                </p>

            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .6 }}
                className="
                    rounded-[34px]
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-6
                    shadow-[0_0_60px_rgba(99,102,241,.15)]
                "
            >

                {/* Header */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">

                            <Brain className="w-7 h-7 text-white" />

                        </div>

                        <div>

                            <h3 className="font-bold text-xl">
                                VerifyAI
                            </h3>

                            <p className="text-zinc-500 text-sm">
                                Scan Complete
                            </p>

                        </div>

                    </div>

                    <ShieldCheck className="text-emerald-400 w-8 h-8" />

                </div>

                {/* Confidence */}

                <div className="mt-8">

                    <p className="text-zinc-500 uppercase tracking-[3px] text-xs">
                        Confidence
                    </p>

                    <h1 className="text-6xl font-black mt-2">
                        98%
                    </h1>

                    <div className="mt-5 h-3 rounded-full bg-zinc-800 overflow-hidden">

                        <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            style={{ width: "98%" }}
                        />

                    </div>

                </div>

                {/* Cards */}

                <div className="grid grid-cols-2 gap-4 mt-8">

                    <div className="rounded-3xl bg-red-500/10 border border-red-500/10 p-5">

                        <p className="text-red-300 text-sm">
                            AI Probability
                        </p>

                        <div className="mt-2 text-4xl font-black text-red-400">
                            98%
                        </div>

                    </div>

                    <div className="rounded-3xl bg-emerald-500/10 border border-emerald-500/10 p-5">

                        <p className="text-emerald-300 text-sm">
                            Human
                        </p>

                        <div className="mt-2 text-4xl font-black text-emerald-400">
                            2%
                        </div>

                    </div>

                </div>

                {/* Verdict */}

                <div className="mt-8 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 p-5">

                    <div className="flex items-center gap-3">

                        <CheckCircle2 className="text-emerald-400" />

                        <div>

                            <p className="text-zinc-500 text-sm">
                                Final Verdict
                            </p>

                            <h3 className="font-bold text-xl">
                                Likely AI Generated
                            </h3>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="mt-8 flex justify-center">

                    <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/20 px-4 py-2">

                        <Sparkles className="w-4 h-4 text-yellow-400" />

                        <span className="text-sm text-zinc-300">
                            Powered by Sightengine AI
                        </span>

                    </div>

                </div>

            </motion.div>

        </section>
    );
}