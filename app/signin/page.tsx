"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSignIn(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        window.location.href = "/";
    }

    return (
        <main className="min-h-screen bg-[#05060a] flex items-center justify-center px-6 overflow-hidden relative">

            {/* Glow */}
            <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[180px]" />
            <div className="absolute right-0 w-[400px] h-[400px] bg-blue-600/20 blur-[160px]" />

            <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl">

                {/* LEFT */}
                <div className="p-10 border-r border-white/10">

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold">
                            V
                        </div>

                        <div>
                            <h2 className="font-bold text-2xl">
                                VerifyAI
                            </h2>

                            <p className="text-white/50 text-sm">
                                AI Detection Platform
                            </p>
                        </div>
                    </div>

                    <h1 className="text-5xl font-bold leading-tight">
                        Welcome
                        <br />
                        Back
                    </h1>

                    <p className="text-white/60 mt-5">
                        Sign in to continue analyzing AI-generated content with industry-leading accuracy.
                    </p>

                    <div className="grid grid-cols-3 gap-4 mt-10">

                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 text-center">
                            <div className="text-purple-400 text-2xl font-bold">
                                98.2%
                            </div>

                            <div className="text-xs text-white/50">
                                Accuracy
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 text-center">
                            <div className="text-purple-400 text-2xl font-bold">
                                &lt;3s
                            </div>

                            <div className="text-xs text-white/50">
                                Analysis
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 text-center">
                            <div className="text-purple-400 text-2xl font-bold">
                                12K+
                            </div>

                            <div className="text-xs text-white/50">
                                Users
                            </div>
                        </div>

                    </div>

                </div>

                {/* RIGHT */}
                <div className="p-10">

                    <h2 className="text-3xl font-bold mb-2">
                        Sign In
                    </h2>

                    <p className="text-white/50 mb-8">
                        Access your VerifyAI account
                    </p>

                    <form
                        onSubmit={handleSignIn}
                        className="space-y-5"
                    >

                        <div>

                            <label className="text-sm text-white/60">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="
                                mt-2
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-white/[0.03]
                                px-4
                                py-3
                                outline-none
                                focus:border-purple-500
                                "
                                placeholder="you@example.com"
                                required
                            />

                        </div>

                        <div>

                            <label className="text-sm text-white/60">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="
                                mt-2
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-white/[0.03]
                                px-4
                                py-3
                                outline-none
                                focus:border-purple-500
                                "
                                placeholder="********"
                                required
                            />

                        </div>

                        {error && (
                            <div className="text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className="
                            w-full
                            py-4
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-500
                            to-purple-600
                            font-semibold
                            hover:scale-[1.02]
                            transition
                            disabled:opacity-50
                            "
                        >
                            {loading
                                ? "Signing In..."
                                : "Sign In"}
                        </button>

                    </form>

                    <p className="text-center text-white/50 mt-6">

                        Don't have an account?{" "}

                        <Link
                            href="/signup"
                            className="text-purple-400 hover:text-purple-300"
                        >
                            Sign Up
                        </Link>

                    </p>

                </div>

            </div>

        </main>
    );
}