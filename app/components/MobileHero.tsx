"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MobileHero() {
    return (
        <section className="relative overflow-hidden px-6 pt-16 pb-20">

            {/* Background Glow */}

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/20 blur-[180px] rounded-full" />

            <div className="relative z-10">

                {/* Badges */}

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6 }}
                    className="flex flex-wrap justify-center gap-3"
                >

                    <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                        #1 AI Detection Platform
                    </div>

                    <div className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-300">
                        Demo • 15 Analyses / Day
                    </div>

                </motion.div>

                {/* Heading */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .15 }}
                    className="mt-10 text-center"
                >

                    <h1 className="text-5xl font-black leading-[1.05] tracking-tight">

                        Can You Tell

                        <br />

                        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            What's Real?
                        </span>

                    </h1>

                    <p className="mt-6 text-zinc-400 leading-8 text-lg">

                        Detect AI-generated images in seconds.

                        Upload any image and receive an instant confidence score powered by advanced AI.

                    </p>

                </motion.div>

                {/* CTA */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .3 }}
                    className="mt-10"
                >

                    <Link
                        href="/analyze"
                        className="
                        block
                        w-full
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-500
                        via-indigo-500
                        to-purple-600
                        py-5
                        text-center
                        text-lg
                        font-bold
                        shadow-[0_15px_50px_rgba(99,102,241,.35)]
                        active:scale-[.98]
                        transition
                        "
                    >
                        Analyze Now
                    </Link>

                </motion.div>

                {/* Stats */}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .45 }}
                    className="grid grid-cols-3 gap-4 mt-12"
                >

                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl py-5">

                        <div className="text-center">

                            <h3 className="text-3xl font-black text-indigo-400">
                                98.2%
                            </h3>

                            <p className="text-xs text-zinc-500 mt-2">
                                Accuracy
                            </p>

                        </div>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl py-5">

                        <div className="text-center">

                            <h3 className="text-3xl font-black text-purple-400">
                                &lt;3s
                            </h3>

                            <p className="text-xs text-zinc-500 mt-2">
                                Analysis
                            </p>

                        </div>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl py-5">

                        <div className="text-center">

                            <h3 className="text-3xl font-black text-pink-400">
                                12K+
                            </h3>

                            <p className="text-xs text-zinc-500 mt-2">
                                Users
                            </p>

                        </div>

                    </div>

                </motion.div>

            </div>

        </section>
    );
}