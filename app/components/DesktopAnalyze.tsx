"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type AnalysisItem = {
    created_at: string;
    ai_probability: number;
    human_probability: number;
};

export default function DesktopAnalyze() {
    /*const [user, setUser] = useState<any>(null);*/
    const [image, setImage] = useState<string | null>(null);
    const [base64, setBase64] = useState("");
    const [loading, setLoading] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("");

    const [confidence, setConfidence] = useState<number | null>(null);
    const [aiProbability, setAiProbability] = useState<number | null>(null);
    const [humanProbability, setHumanProbability] = useState<number | null>(null);

    const [history, setHistory] = useState<AnalysisItem[]>([]);
    const DAILY_LIMIT = 15;
    const [usedToday, setUsedToday] = useState(0);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];

        const savedDate = localStorage.getItem("verifyai_date");
        const savedCount = localStorage.getItem("verifyai_used");

        if (savedDate === today) {
            setUsedToday(Number(savedCount || 0));
        } else {
            localStorage.setItem("verifyai_date", today);
            localStorage.setItem("verifyai_used", "0");
            setUsedToday(0);
        }
    }, []);



    function processFile(file: File) {
        const imageUrl = URL.createObjectURL(file);

        setImage(imageUrl);

        const reader = new FileReader();

        reader.onload = () => {
            setBase64(reader.result as string);
        };

        reader.readAsDataURL(file);
    }
    function handleImageUpload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];

        if (!file) return;

        processFile(file);
    }
    function handleDrop(
        e: React.DragEvent<HTMLLabelElement>
    ) {
        e.preventDefault();

        setDragging(false);

        const file = e.dataTransfer.files?.[0];

        if (!file) return;

        processFile(file);
    }

    async function handleAnalyze() {
        if (!base64) {
            alert("Upload image first.");
            return;
        }
        if (usedToday >= DAILY_LIMIT) {
            alert("Daily limit reached (15 analyses per day)");
            return;
        }



        try {
            setLoading(true);
            setProgress(10);
            setStatus("Uploading image...");

            setProgress(50);
            setStatus("Running AI model...");

            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    image: base64,
                }),
            });


            const text = await response.text();
            if (!response.ok) {
                const err = JSON.parse(text);
                alert(err.error);
                return;
            }

            console.log("API RAW:", text);

            let result;

            try {
                result = JSON.parse(text);
                setProgress(80);
                setStatus("Calculating verdict...");
            } catch {
                throw new Error(text);
            }

            let ai = 0;
            let human = 0;

            if (Array.isArray(result)) {
                const aiItem = result.find((item: any) =>
                    (item.label || "").toLowerCase().includes("artificial") ||
                    (item.label || "").toLowerCase().includes("ai") ||
                    (item.label || "").toLowerCase().includes("fake")
                );

                const humanItem = result.find((item: any) =>
                    (item.label || "").toLowerCase().includes("human") ||
                    (item.label || "").toLowerCase().includes("real")
                );

                ai = Math.round((aiItem?.score || 0) * 100);
                human = Math.round((humanItem?.score || 0) * 100);
            }
            setProgress(100);
            setStatus("Analysis complete");
            setAiProbability(ai);
            setHumanProbability(human);
            setConfidence(Math.max(ai, human));
            const newCount = usedToday + 1;

            setUsedToday(newCount);

            localStorage.setItem("usage_count", newCount.toString());

        } catch (error: any) {
            console.error("ANALYZE ERROR:", error);
            alert(error?.message || "An error occurred during analysis");
        } finally {
            setLoading(false);

            setTimeout(() => {
                setProgress(0);
                setStatus("");
            }, 1500);
        }
    }

    return (
        <main className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-indigo-500/30">
            {/* Background Aesthetic Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] left-[20%] w-[70%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            {/* Navigation Header */}
            <nav className="relative z-20 border-b border-white/5 bg-black/20 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            V
                        </div>
                        <span className="font-semibold tracking-tight text-lg">VerifyAI</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400">
                            {15 - usedToday} / 15 scans left
                        </div>
                    </div>
                </div>
            </nav>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                {/* Hero Title Section */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                        Analysis Engine
                    </h1>
                    <p className="mt-3 text-lg text-zinc-400 max-w-2xl">
                        Results can be incorrect, should not be considered definitive proof.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column: Upload & Controls */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="group relative rounded-3xl border border-white/10 bg-zinc-900/50 p-2 backdrop-blur-xl transition-all hover:border-indigo-500/30">
                            <label
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragging(true);
                                }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                                className={`relative flex flex-col items-center justify-center min-h-[400px] rounded-[22px] border border-dashed transition-all cursor-pointer group ${dragging
                                    ? "border-indigo-500 bg-indigo-500/10"
                                    : "border-white/10 bg-zinc-900/30"
                                    }`}
                            >
                                {image ? (
                                    <img
                                        src={image}
                                        alt="Upload preview"
                                        className="absolute inset-0 w-full h-full object-contain p-4 rounded-3xl"
                                    />
                                ) : (
                                    <div className="text-center p-8">
                                        <div className="mx-auto w-16 h-16 mb-6 rounded-2xl bg-zinc-800 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                                            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-zinc-200">Drop your image here</h3>
                                        <p className="text-zinc-500 text-sm">Supports PNG, JPG and WebP up to 10MB</p>
                                    </div>
                                )}
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !image}
                            className="w-full relative group overflow-hidden py-4 rounded-2xl bg-indigo-600 font-semibold text-white shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 active:scale-[0.98]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>Run Analysis</>
                                )}
                            </span>
                        </button>
                        {loading && (
                            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-4">
                                <div className="flex justify-between mb-2 text-sm">
                                    <span>{status}</span>
                                    <span>{progress}%</span>
                                </div>

                                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Statistics & Real-time Results */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-xl">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-8">Live Result</h2>

                            <div className="space-y-8">
                                {/* Confidence Gauge */}
                                <div>
                                    <div className="flex items-end justify-between mb-4">
                                        <div>
                                            <p className="text-sm text-zinc-500 font-medium">Confidence Score</p>
                                            <h3 className="text-5xl font-bold tracking-tighter">
                                                {confidence !== null ? `${confidence}%` : "0%"}
                                            </h3>
                                        </div>
                                        <div className="text-right">
                                            <span
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${(aiProbability ?? 0) > 50
                                                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                                                    : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                    }`}
                                            >
                                                {(aiProbability ?? 0) > 50
                                                    ? "Likely AI Generated"
                                                    : confidence !== null
                                                        ? "Likely Human Made"
                                                        : "Waiting"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden border border-white/5 p-0.5">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${confidence || 0}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Probability Breakdown */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <p className="text-xs text-zinc-500 font-medium mb-1">AI Probability</p>
                                        <p className="text-2xl font-bold text-rose-400">{aiProbability !== null ? `${aiProbability}%` : "--"}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <p className="text-xs text-zinc-500 font-medium mb-1">Human Probability</p>
                                        <p className="text-2xl font-bold text-emerald-400">{humanProbability !== null ? `${humanProbability}%` : "--"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Feed */}
                        <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-xl">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Recent Activity</h2>
                            <div className="space-y-4">
                                {history.length === 0 ? (
                                    <div className="py-12 text-center border border-dashed border-white/5 rounded-2xl bg-white/[0.02]">
                                        <p className="text-sm text-zinc-500">No recent scans available</p>
                                    </div>
                                ) : (
                                    history.slice(0, 5).map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-2 h-2 rounded-full ${item.ai_probability > 50 ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'}`} />
                                                <div>
                                                    <p className="text-sm font-medium">AI: {item.ai_probability}% / Human: {item.human_probability}%</p>
                                                    <p className="text-[10px] text-zinc-500 uppercase tracking-tight">
                                                        {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(item.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-zinc-600 group-hover:text-zinc-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            {history.length > 0 && (
                                <Link href="/dashboard" className="mt-6 block text-center text-xs font-semibold text-zinc-400 hover:text-white transition-colors">
                                    View Full History →
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}