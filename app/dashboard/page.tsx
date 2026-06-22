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
        <main className="min-h-screen bg-[#04050b] text-white p-8">
            <Link
                href="/"
                className="
            fixed
            top-6
            left-6
            text-5xl
            font-black
            text-purple-500
            hover:scale-110
            transition
            z-50
            "
            >
                V
            </Link>

            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-5xl font-bold">Dashboard</h1>

                        <p className="text-white/50 mt-2">
                            Welcome back, {user?.email}
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="
                    px-6
                    py-3
                    rounded-xl
                    bg-red-500/20
                    border
                    border-red-500/30
                    hover:bg-red-500/30
                    transition
                    "
                    >
                        Logout
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-8">
                        <div className="text-white/70">Available Checks</div>

                        <div className="text-6xl font-bold mt-4">
                            {availableChecks}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-8">
                        <div className="text-white/70">Account Plan</div>

                        <div className="text-4xl font-bold mt-4 text-blue-400">
                            FREE
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-8">
                        <div className="text-white/70">Total Scans</div>

                        <div className="text-4xl font-bold mt-4 text-green-400">
                            {totalScans}
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    <Link
                        href="/analyze"
                        className="
                    rounded-3xl
                    p-10
                    bg-gradient-to-r
                    from-blue-500
                    via-purple-500
                    to-pink-500
                    hover:scale-[1.02]
                    transition
                    "
                    >
                        <div className="text-5xl mb-4">🔍</div>

                        <h2 className="text-3xl font-bold">Analyze Image</h2>

                        <p className="mt-4 text-white/80">
                            Upload a photo and check whether it was generated by AI.
                        </p>
                    </Link>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10">
                        <div className="text-5xl mb-4">📊</div>

                        <h2 className="text-3xl font-bold">Statistics</h2>

                        <p className="mt-4 text-white/60">
                            Your future scan history and analytics will appear here.
                        </p>
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                    <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>

                    {recentAnalyses.length === 0 ? (
                        <div className="rounded-2xl bg-white/[0.03] p-6 text-white/50">
                            No analyses yet.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentAnalyses.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex justify-between items-center"
                                >
                                    <div>
                                        <div className="font-semibold">
                                            AI: {item.ai_probability}% | Human: {item.human_probability}%
                                        </div>
                                        <div className="text-white/40 text-sm mt-1">
                                            {new Date(item.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="text-2xl">
                                        {item.ai_probability > 50 ? "🤖" : "👤"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}