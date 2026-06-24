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
        <main className="min-h-screen bg-[#030303] flex items-center justify-center px-4 overflow-hidden relative">

            {/* Background Aesthetic */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.1]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #3f3f46 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[140px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 rounded-[32px] overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-2xl shadow-2xl">

                {/* LEFT SIDE: Brand & Stats */}
                <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                            V
                        </div>
                        <div>
                            <h2 className="font-bold text-xl tracking-tight text-white">VerifyAI</h2>
                            <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Forensics</p>
                        </div>
                    </div>

                    <div className="my-12">
                        <h1 className="text-6xl font-bold tracking-tighter leading-[0.9] text-white">
                            Welcome <br />
                            <span className="text-zinc-500">Back.</span>
                        </h1>
                        <p className="text-zinc-400 mt-6 text-lg max-w-xs font-medium leading-relaxed">
                            Sign in to access your dashboard and continue verifying visual authenticity.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: "Accuracy", value: "98.2%" },
                            { label: "Latency", value: "<3s" },
                            { label: "Uptime", value: "99.9%" }
                        ].map((stat) => (
                            <div key={stat.label} className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 transition-colors hover:bg-white/[0.05]">
                                <div className="text-indigo-400 text-xl font-bold tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE: Form */}
                <div className="p-8 md:p-16 flex flex-col justify-center bg-zinc-900/20">
                    <div className="mb-10 lg:hidden">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold mb-4">V</div>
                        <h2 className="text-3xl font-bold text-white">Sign In</h2>
                    </div>

                    <div className="hidden lg:block mb-10">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Account Login</h2>
                        <p className="text-zinc-500 text-sm mt-1">Enter your credentials to continue</p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-zinc-950/50 px-4 py-3.5 text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                                placeholder="name@company.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-[10px] font-bold uppercase tracking-tighter text-zinc-600 hover:text-indigo-400 transition-colors"
                                >
                                    Forgot?
                                </Link>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-zinc-950/50 px-4 py-3.5 text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
                                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className="group relative w-full py-4 rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <div className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Verifying...
                                    </>
                                ) : "Sign In"}
                            </div>
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-zinc-500 font-medium">
                            New to the platform?{" "}
                            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold underline underline-offset-4 decoration-indigo-500/30">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}