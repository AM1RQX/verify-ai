"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
            },
        });

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        alert("Account created successfully!");
        router.push("/");
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#04050b] text-white">
            {/* BACKGROUND GLOW */}

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[250px] -left-[250px] h-[700px] w-[700px] rounded-full bg-purple-600/20 blur-[180px]" />

                <div className="absolute -bottom-[300px] -right-[300px] h-[800px] w-[800px] rounded-full bg-blue-600/20 blur-[200px]" />

                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/10 blur-[150px]" />
            </div>

            <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
                {/* LEFT */}

                <div className="hidden items-center justify-center lg:flex">
                    <div className="max-w-lg text-center">
                        <div className="mx-auto mb-10 flex items-center justify-center">
                            <div className="hero-cube-container">
                                <div
                                    className="hero-cube"
                                    style={{
                                        animation: "cubeRotate 12s linear infinite",
                                    }}
                                >
                                    <div className="cube-face cube-front"></div>
                                    <div className="cube-face cube-back"></div>
                                    <div className="cube-face cube-right"></div>
                                    <div className="cube-face cube-left"></div>
                                    <div className="cube-face cube-top"></div>
                                    <div className="cube-face cube-bottom"></div>
                                </div>
                            </div>
                        </div>

                        <h2 className="mb-6 text-6xl font-bold">
                            Join VerifyAI
                        </h2>

                        <p className="text-lg text-white/60">
                            Detect AI-generated images with advanced analysis
                            and industry-leading accuracy.
                        </p>

                        <div className="mt-12 grid grid-cols-3 gap-4">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <div className="text-2xl font-bold text-purple-400">
                                    98.2%
                                </div>
                                <div className="text-sm text-white/50">
                                    Accuracy
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <div className="text-2xl font-bold text-purple-400">
                                    500K+
                                </div>
                                <div className="text-sm text-white/50">
                                    Analyses
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <div className="text-2xl font-bold text-purple-400">
                                    12K+
                                </div>
                                <div className="text-sm text-white/50">
                                    Users
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}

                <div className="flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md rounded-3xl border border-purple-500/20 bg-white/[0.03] p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,.08)]">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold">
                                Create Account
                            </h1>

                            <p className="mt-2 text-white/50">
                                Start using VerifyAI today
                            </p>
                        </div>

                        <form onSubmit={handleSignup} className="space-y-5">
                            <input
                                type="text"
                                placeholder="Full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white outline-none focus:border-purple-500"
                            />

                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white outline-none focus:border-purple-500"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white outline-none focus:border-purple-500"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-4 font-semibold transition hover:scale-[1.02]"
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-white/50">
                                Already have an account?
                            </p>

                            <Link
                                href="/signin"
                                className="text-purple-400 hover:text-purple-300"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}