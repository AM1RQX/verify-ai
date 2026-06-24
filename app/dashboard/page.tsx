"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type AnalysisItem = {
    created_at: string;
    ai_probability: number;
    human_probability: number;
};

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [totalScans, setTotalScans] = useState<number>(0);
    const [availableChecks, setAvailableChecks] = useState<number>(10);
    const [recentAnalyses, setRecentAnalyses] = useState<AnalysisItem[]>([]);

    useEffect(() => {
        async function loadData() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) return;
            setUser(user);

            // Fetch total scans count
            const { count } = await supabase
                .from("analyses")
                .select("*", { count: "exact", head: true })
                .eq("user_id", user.id);

            if (count !== null) setTotalScans(count);

            // Fetch usage limits
            const today = new Date().toISOString().split("T")[0];
            const { data: usageData } = await supabase
                .from("usage_limits")
                .select("scans_today, last_reset")
                .eq("user_id", user.id)
                .single();

            if (usageData) {
                if (usageData.last_reset !== today) {
                    setAvailableChecks(10);
                } else {
                    setAvailableChecks(Math.max(0, 10 - usageData.scans_today));
                }
            }

            // Fetch recent analyses
            const { data: recent } = await supabase
                .from("analyses")
                .select("ai_probability, human_probability, created_at")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false })
                .limit(3);

            if (recent) setRecentAnalyses(recent);
        }

        loadData();
    }, []);

    async function logout() {
        await supabase.auth.signOut();
        window.location.href = "/";
    }

    return (
        <main className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-indigo-500/30">
            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -mr-40 -mt-40" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -ml-40 -mb-40" />
            </div>

            {/* Sidebar-like Navigation Sidebar Logo */}
            <Link
                href="/"
                className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl font-bold text-2xl text-white shadow-xl shadow-indigo-500/20 hover:scale-110 transition-all duration-300"
            >
                V
            </Link>

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-zinc-500 mt-2 font-medium">
                            Welcome back, <span className="text-zinc-300">{user?.email?.split('@')[0]}</span>
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-200 text-sm font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-sm transition-all hover:border-indigo-500/30">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-12 h-12 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                        </div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Checks Remaining</p>
                        <div className="flex items-baseline gap-2 mt-4">
                            <span className="text-5xl font-bold tracking-tighter text-white">{availableChecks}</span>
                            <span className="text-zinc-600 font-medium">/ 10</span>
                        </div>
                        <div className="mt-6 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-500 transition-all duration-1000"
                                style={{ width: `${(availableChecks / 10) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-sm">
                        <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Plan</p>
                        <div className="mt-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                                Free Tier
                            </span>
                        </div>
                        <p className="mt-6 text-2xl font-bold text-white tracking-tight">Standard</p>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-sm">
                        <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Total Analyzed</p>
                        <div className="mt-4 flex items-center gap-3">
                            <span className="text-5xl font-bold tracking-tighter text-emerald-400">{totalScans}</span>
                            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            </div>
                        </div>
                        <p className="mt-6 text-zinc-500 text-sm font-medium">Lifetime usage</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid lg:grid-cols-2 gap-6 mb-12">
                    <Link
                        href="/analyze"
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600 to-violet-700 p-10 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-indigo-500/20"
                    >
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">New Analysis</h2>
                            <p className="mt-3 text-indigo-100/70 font-medium max-w-sm">
                                Check media authenticity with our neural engine. Instant results.
                            </p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <svg className="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                        </div>
                    </Link>

                    <div className="rounded-3xl border border-white/5 bg-zinc-900/20 p-10 backdrop-blur-sm border-dashed">
                        <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 border border-white/5">
                            <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-zinc-400 tracking-tight">Advanced Stats</h2>
                        <p className="mt-3 text-zinc-600 font-medium max-w-sm">
                            Detailed breakdown of your detection trends and history coming soon.
                        </p>
                    </div>
                </div>

                {/* Activity Table */}
                <div className="rounded-3xl border border-white/5 bg-zinc-900/40 overflow-hidden backdrop-blur-sm">
                    <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-lg font-bold tracking-tight">Recent Activity</h2>
                        <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">View All</button>
                    </div>

                    <div className="p-2">
                        {recentAnalyses.length === 0 ? (
                            <div className="py-20 text-center">
                                <p className="text-zinc-500 font-medium italic">No analysis history found.</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {recentAnalyses.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-center justify-between p-6 rounded-2xl hover:bg-white/[0.02] transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.ai_probability > 50 ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'}`}>
                                                {item.ai_probability > 50 ? (
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                ) : (
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold tracking-tight text-zinc-200">
                                                        AI Probability: {item.ai_probability}%
                                                    </span>
                                                    <span className="text-zinc-600">•</span>
                                                    <span className="text-sm font-medium text-zinc-500">
                                                        Human: {item.human_probability}%
                                                    </span>
                                                </div>
                                                <div className="text-zinc-600 text-xs font-bold uppercase tracking-widest mt-1">
                                                    {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden sm:block">
                                            <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] border ${item.ai_probability > 50 ? 'border-rose-500/30 text-rose-500' : 'border-emerald-500/30 text-emerald-500'}`}>
                                                {item.ai_probability > 50 ? "Synthetic" : "Authentic"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}