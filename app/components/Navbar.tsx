"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function getUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUser(user);
        }

        getUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    async function handleLogout() {
        await supabase.auth.signOut();
        window.location.href = "/";
    }

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
            <Link
                href="/"
                className="flex items-center"
            >
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
            <div className="hidden md:flex gap-10 text-white/70">
                <a href="#hero" className="hover:text-purple-400 transition">
                    Product
                </a>

                <a href="#features" className="hover:text-purple-400 transition">
                    Features
                </a>

                <a href="#how" className="hover:text-purple-400 transition">
                    How It Works
                </a>

                <a href="#pricing" className="hover:text-purple-400 transition">
                    Pricing
                </a>

                <a href="#testimonials" className="hover:text-purple-400 transition">
                    Reviews
                </a>

                <a href="#faq" className="hover:text-purple-400 transition">
                    FAQ
                </a>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                {user ? (
                    <>
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

                        <button
                            onClick={handleLogout}
                            className="
                            px-5
                            py-2
                            rounded-xl
                            border
                            border-white/10
                            text-white/70
                            hover:text-white
                            hover:bg-white/5
                            transition
                            "
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            href="/signin"
                            className="text-white/80 hover:text-white transition"
                        >
                            Sign In
                        </Link>

                        <Link
                            href="/signup"
                            className="
                            px-5
                            py-2
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-500
                            to-purple-600
                            text-white
                            hover:scale-105
                            transition
                            shadow-[0_0_30px_rgba(139,92,246,.35)]
                            "
                        >
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}