"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type AnalysisItem = {
    created_at: string;
    ai_probability: number;
    human_probability: number;
};

const DAILY_LIMIT = 15;

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 25,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
        },
    },
};

export default function MobileDashboard() {
    const [user, setUser] = useState<any>(null);

    const [totalScans, setTotalScans] = useState(0);

    const [availableChecks, setAvailableChecks] =
        useState(DAILY_LIMIT);

    const [recentAnalyses, setRecentAnalyses] =
        useState<AnalysisItem[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        setUser(user);

        const { count } = await supabase
            .from("analyses")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("user_id", user.id);

        setTotalScans(count ?? 0);

        const today =
            new Date().toISOString().split("T")[0];

        const { data: usage } = await supabase
            .from("usage_limits")
            .select("scans_today,last_reset")
            .eq("user_id", user.id)
            .single();

        if (!usage) {
            setAvailableChecks(DAILY_LIMIT);
        } else if (usage.last_reset === today) {
            setAvailableChecks(
                Math.max(
                    0,
                    DAILY_LIMIT - usage.scans_today
                )
            );
        } else {
            setAvailableChecks(DAILY_LIMIT);
        }

        const { data } = await supabase
            .from("analyses")
            .select(
                "created_at,ai_probability,human_probability"
            )
            .eq("user_id", user.id)
            .order("created_at", {
                ascending: false,
            })
            .limit(5);

        if (data) {
            setRecentAnalyses(data);
        }
    }

    async function logout() {
        await supabase.auth.signOut();
        window.location.href = "/";
    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#030303] text-white overflow-x-hidden"
        >
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-indigo-600/20 blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-purple-600/20 blur-[120px]" />
            </div>

            <div className="relative z-10 px-5 py-6">

                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    className="flex items-center justify-between"
                >
                    <div>
                        <p className="text-zinc-500 text-sm">
                            Welcome back
                        </p>

                        <h1 className="text-3xl font-black mt-1">
                            {user?.email?.split("@")[0]}
                        </h1>
                    </div>

                    <button
                        onClick={logout}
                        className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
                    >
                        →
                    </button>
                </motion.div>

                {/* Remaining Checks */}
                <motion.div
                    variants={fadeUp}
                    className="mt-8 rounded-[30px] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-2xl"
                >
                    <p className="text-white/70 text-sm">
                        Remaining Today
                    </p>

                    <div className="flex items-end gap-2 mt-2">
                        <h2 className="text-6xl font-black">
                            {availableChecks}
                        </h2>

                        <span className="text-white/70 mb-2">
                            / {DAILY_LIMIT}
                        </span>
                    </div>

                    <div className="mt-5 h-3 rounded-full bg-white/20 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{
                                width: `${availableChecks / DAILY_LIMIT * 100}%`,
                            }}
                            transition={{ duration: 1 }}
                            className="h-full rounded-full bg-white"
                        />
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-5">

                    <motion.div
                        variants={fadeUp}
                        className="rounded-3xl bg-white/5 border border-white/10 p-5"
                    >
                        <p className="text-zinc-500 text-sm">
                            Total Analyses
                        </p>

                        <h3 className="text-4xl font-black mt-2">
                            {totalScans}
                        </h3>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        className="rounded-3xl bg-white/5 border border-white/10 p-5"
                    >
                        <p className="text-zinc-500 text-sm">
                            Free Plan
                        </p>

                        <h3 className="text-3xl font-black mt-2">
                            Active
                        </h3>
                    </motion.div>

                </div>

                {/* Analyze Button */}

                <motion.div
                    variants={fadeUp}
                    whileTap={{ scale: .97 }}
                    className="mt-6"
                >
                    <Link
                        href="/analyze"
                        className="h-16 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-xl font-bold shadow-xl"
                    >
                        Analyze Image →
                    </Link>
                </motion.div>
                {/* Recent Activity */}

                <motion.div
                    variants={fadeUp}
                    className="mt-8"
                >
                    <h2 className="text-xl font-bold mb-4">
                        Recent Analyses
                    </h2>

                    {recentAnalyses.length === 0 ? (
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
                            <p className="text-zinc-500">
                                No analyses yet.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">

                            {recentAnalyses.map((item, index) => (

                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.08,
                                    }}
                                    className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
                                >

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <p className="text-zinc-400 text-sm">
                                                {new Date(
                                                    item.created_at
                                                ).toLocaleDateString()}
                                            </p>

                                            <h3 className="text-lg font-bold mt-1">
                                                AI {item.ai_probability}%
                                            </h3>

                                        </div>

                                        <div
                                            className={`px-4 py-2 rounded-2xl font-bold ${item.ai_probability > 50
                                                ? "bg-red-500/20 text-red-400"
                                                : "bg-emerald-500/20 text-emerald-400"
                                                }`}
                                        >
                                            {item.ai_probability > 50
                                                ? "AI"
                                                : "Human"}
                                        </div>

                                    </div>

                                    <div className="mt-5">

                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Confidence</span>
                                            <span>
                                                {Math.max(
                                                    item.ai_probability,
                                                    item.human_probability
                                                )}
                                                %
                                            </span>
                                        </div>

                                        <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">

                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: `${Math.max(
                                                        item.ai_probability,
                                                        item.human_probability
                                                    )}%`,
                                                }}
                                                transition={{
                                                    duration: 1,
                                                }}
                                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                            />

                                        </div>

                                    </div>

                                </motion.div>

                            ))}

                        </div>
                    )}
                </motion.div>

            </div>

        </motion.main>
    );
}