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
        <main className="relative min-h-screen overflow-hidden bg-[#030303] text-zinc-100 selection:bg-indigo-500/30">
            {/* PREMIUM BACKGROUND ARCHITECTURE */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Dot Grid */}
                <div
                    className="absolute inset-0 opacity-[0.1]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #3f3f46 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Aurora Blurs */}
                <div className="absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-indigo-600/10 blur-[180px] animate-pulse" />
                <div className="absolute -bottom-[20%] -right-[10%] h-[800px] w-[800px] rounded-full bg-purple-600/10 blur-[180px] animate-pulse [animation-delay:2000ms]" />
                <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[140px]" />
            </div>

            <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
                {/* LEFT: VISUAL BRANDING SECTION */}
                <div className="hidden lg:flex flex-col items-center justify-center p-12 border-r border-white/5 bg-white/[0.01]">
                    <div className="max-w-lg text-center">
                        <div className="mx-auto mb-16 relative">
                            {/* Glowing effect behind the cube */}
                            <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full scale-75" />

                            <div className="hero-cube-container relative">
                                <div
                                    className="hero-cube"
                                    style={{
                                        animation: "cubeRotate 20s linear infinite",
                                    }}
                                >
                                    <div className="cube-face cube-front border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm"></div>
                                    <div className="cube-face cube-back border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm"></div>
                                    <div className="cube-face cube-right border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm"></div>
                                    <div className="cube-face cube-left border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm"></div>
                                    <div className="cube-face cube-top border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm"></div>
                                    <div className="cube-face cube-bottom border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm"></div>
                                </div>
                            </div>
                        </div>

                        <h2 className="mb-6 text-6xl font-bold tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                            Join VerifyAI
                        </h2>

                        <p className="text-lg text-zinc-400 font-medium leading-relaxed">
                            Deploy the industry's most accurate neural engine to detect
                            synthetic images and AI-generated media.
                        </p>

                        <div className="mt-16 grid grid-cols-3 gap-4">
                            {[
                                { label: "Accuracy", value: "98.2%", color: "text-indigo-400" },
                                { label: "Analyses", value: "500K+", color: "text-purple-400" },
                                { label: "Users", value: "12K+", color: "text-emerald-400" }
                            ].map((stat) => (
                                <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-sm hover:bg-white/[0.05] transition-colors">
                                    <div className={`text-2xl font-bold tracking-tight ${stat.color}`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: SIGNUP FORM SECTION */}
                <div className="flex items-center justify-center px-6 py-12 relative">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo Only */}
                        <div className="lg:hidden flex justify-center mb-8">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">V</div>
                        </div>

                        <div className="rounded-[32px] border border-white/10 bg-zinc-900/40 p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
                            <div className="mb-10">
                                <h1 className="text-3xl font-bold tracking-tight text-white">
                                    Create Account
                                </h1>
                                <p className="mt-2 text-zinc-500 font-medium">
                                    Start your 14-day professional trial
                                </p>
                            </div>

                            <form onSubmit={handleSignup} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-zinc-950/50 p-4 text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Work Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-zinc-950/50 p-4 text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-zinc-950/50 p-4 text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full relative group overflow-hidden rounded-xl bg-indigo-600 mt-4 py-4 font-bold text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Creating...
                                            </>
                                        ) : "Get Started"}
                                    </span>
                                </button>
                            </form>

                            <div className="mt-8 text-center border-t border-white/5 pt-8">
                                <p className="text-zinc-500 text-sm font-medium">
                                    Already have an account?{" "}
                                    <Link
                                        href="/signin"
                                        className="text-indigo-400 hover:text-indigo-300 font-bold underline underline-offset-4 decoration-indigo-500/30 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Compliance Text */}
                        <p className="mt-8 text-center text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
                            Secured by Enterprise Grade Encryption
                        </p>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes cubeRotate {
                    from { transform: rotateX(0deg) rotateY(0deg); }
                    to { transform: rotateX(360deg) rotateY(360deg); }
                }
                .hero-cube-container {
                    width: 200px;
                    height: 200px;
                    perspective: 1000px;
                }
                .hero-cube {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transform-style: preserve-3d;
                }
                .cube-face {
                    position: absolute;
                    width: 200px;
                    height: 200px;
                }
                .cube-front  { transform: rotateY(0deg) translateZ(100px); }
                .cube-back   { transform: rotateY(180deg) translateZ(100px); }
                .cube-right  { transform: rotateY(90deg) translateZ(100px); }
                .cube-left   { transform: rotateY(-90deg) translateZ(100px); }
                .cube-top    { transform: rotateX(90deg) translateZ(100px); }
                .cube-bottom { transform: rotateX(-90deg) translateZ(100px); }
            `}</style>
        </main>
    );
}