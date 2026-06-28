"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function MobileFooter() {
    return (
        <footer className="relative mt-20 border-t border-white/10">

            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />

            <div className="relative px-6 py-14">

                {/* Logo */}

                <div className="flex justify-center">

                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,.35)]">

                        <ShieldCheck className="w-8 h-8 text-white" />

                    </div>

                </div>

                <h2 className="mt-6 text-center text-3xl font-black">

                    VerifyAI

                </h2>

                <p className="mt-4 text-center text-zinc-400 leading-7">

                    Advanced AI image detection built for creators,
                    journalists, researchers and everyone who values
                    authenticity.

                </p>

                {/* Navigation */}

                <div className="mt-10 grid grid-cols-2 gap-4">

                    <Link
                        href="/analyze"
                        className="rounded-2xl border border-white/10 bg-white/5 py-4 text-center font-semibold"
                    >
                        Analyze
                    </Link>

                    <Link
                        href="/dashboard"
                        className="rounded-2xl border border-white/10 bg-white/5 py-4 text-center font-semibold"
                    >
                        Dashboard
                    </Link>

                </div>

                {/* Bottom */}

                <div className="mt-12 border-t border-white/10 pt-8">

                    <div className="flex justify-center gap-6 text-sm text-zinc-500">

                        <a href="#">
                            Privacy
                        </a>

                        <a href="#">
                            Terms
                        </a>

                        <a href="#">
                            Contact
                        </a>

                    </div>

                    <p className="mt-8 text-center text-xs text-zinc-600">

                        © 2026 VerifyAI. All rights reserved.

                    </p>

                </div>

            </div>

        </footer>
    );
}