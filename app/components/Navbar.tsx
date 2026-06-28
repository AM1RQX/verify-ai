"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav
            className="
            sticky
            top-0
            z-50
            max-w-7xl
            mx-auto
            px-6
            py-6
            flex
            items-center
            justify-between
            backdrop-blur-xl
            "
        >
            {/* Logo */}
            <Link href="/" className="flex items-center">
                <span className="text-4xl font-black text-purple-500">
                    V
                </span>

                <span className="-ml-1 text-4xl font-black text-white">
                    erifyAI
                </span>

                <span className="ml-3 px-2 py-1 rounded-full bg-purple-500/20 text-xs text-purple-300">
                    Beta
                </span>
            </Link>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-14 text-xl text-white/70">

                <a href="#product" className="hover:text-white transition">
                    Product
                </a>

                <a href="#features" className="hover:text-white transition">
                    Features
                </a>

                <a href="#how-it-works" className="hover:text-white transition">
                    How It Works
                </a>

                <a href="#pricing" className="hover:text-white transition">
                    Pricing
                </a>

                <a href="#reviews" className="hover:text-white transition">
                    Reviews
                </a>

                <a href="#faq" className="hover:text-white transition">
                    FAQ
                </a>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard"
                    className="
                    px-5
                    py-2
                    rounded-xl
                    border
                    border-purple-500/30
                    bg-purple-500/10
                    text-purple-300
                    hover:bg-purple-500/20
                    transition
                    "
                >
                    My Dashboard
                </Link>
            </div>
        </nav>
    );
}