"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Brain, Sparkles } from "lucide-react";

export default function MobileAnalyze() {
    const [image, setImage] = useState<string | null>(null);
    const [base64, setBase64] = useState("");

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("");

    const [confidence, setConfidence] = useState<number | null>(null);
    const [aiProbability, setAiProbability] = useState<number | null>(null);
    const [humanProbability, setHumanProbability] = useState<number | null>(null);
    const DAILY_LIMIT = 15;

    const [usedToday, setUsedToday] = useState(0);
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];

        const savedDate = localStorage.getItem("verifyai-date");
        const savedCount = Number(localStorage.getItem("verifyai-count") || "0");

        if (savedDate === today) {
            setUsedToday(savedCount);
        } else {
            localStorage.setItem("verifyai-date", today);
            localStorage.setItem("verifyai-count", "0");
            setUsedToday(0);
        }
    }, []);

    function processFile(file: File) {
        const reader = new FileReader();

        reader.onload = (event) => {
            const result = event.target?.result as string;

            if (!result) return;

            setImage(result);
            setBase64(result);
        };

        reader.onerror = () => {
            console.error("Unable to read image.");
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

            setProgress(15);
            setStatus("Uploading image...");

            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: base64,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.error || "Analysis failed");
                return;
            }

            const result = await response.json();

            setProgress(75);
            setStatus("Running AI model...");

            let ai = 0;
            let human = 0;

            if (Array.isArray(result)) {
                const aiItem = result.find(
                    (item: any) =>
                        (item.label || "")
                            .toLowerCase()
                            .includes("artificial") ||
                        (item.label || "")
                            .toLowerCase()
                            .includes("ai") ||
                        (item.label || "")
                            .toLowerCase()
                            .includes("fake")
                );

                const humanItem = result.find(
                    (item: any) =>
                        (item.label || "")
                            .toLowerCase()
                            .includes("human") ||
                        (item.label || "")
                            .toLowerCase()
                            .includes("real")
                );

                ai = Math.round((aiItem?.score || 0) * 100);
                human = Math.round((humanItem?.score || 0) * 100);
            }

            setAiProbability(ai);
            setHumanProbability(human);
            setConfidence(Math.max(ai, human));
            setUsedToday((prev) => {
                const newCount = prev + 1;
                localStorage.setItem("verifyai-count", String(newCount));
                return newCount;
            });
            setProgress(100);
            setStatus("Completed");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);

            setTimeout(() => {
                setProgress(0);
                setStatus("");
            }, 1500);
        }
    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
            }}
            className="min-h-screen bg-[#030303] text-white relative overflow-hidden"
        >

            {/* Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/15 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-600/15 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 px-5 py-6">


                <Link
                    href="/"
                    className="flex items-center gap-3 mb-10"
                >

                    <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,.45)]">

                        <Brain className="w-7 h-7 text-white" />

                    </div>

                    <div>

                        <div className="flex items-center gap-2">

                            <h2 className="text-2xl font-black tracking-tight">
                                VerifyAI
                            </h2>

                            <Sparkles className="w-4 h-4 text-yellow-400" />

                        </div>

                        <p className="text-zinc-500 text-sm">
                            AI Image Detection
                        </p>

                    </div>

                </Link>

                <h1 className="text-5xl font-black leading-tight tracking-tight">
                    Analyze
                    <br />
                    AI Images
                </h1>

                <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
                    Remaining today: {DAILY_LIMIT - usedToday} / {DAILY_LIMIT}
                </div>

                <p className="text-zinc-400 text-lg mt-4 mb-10 leading-7">
                    Upload an image and our AI will estimate whether it was generated by artificial intelligence.
                </p>

                <input
                    id="upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />

                <motion.label
                    htmlFor="upload"
                    className="block cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.6,
                    }}
                    whileTap={{
                        scale: 0.985,
                    }}
                >
                    <motion.div
                        whileHover={{
                            scale: 1.015,
                            boxShadow: "0 0 70px rgba(99,102,241,.18)",
                        }}
                        whileTap={{
                            scale: 0.985,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 22,
                        }}
                        className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl h-[340px] overflow-hidden flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,.08)]"
                    >

                        {image ? (
                            <motion.img
                                key={image}
                                src={image}
                                alt="Preview"
                                initial={{
                                    opacity: 0,
                                    scale: 0.92,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    duration: 0.45,
                                    ease: "easeOut",
                                }}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="text-center">

                                <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6">

                                    <svg
                                        className="w-10 h-10 text-indigo-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                        />
                                    </svg>

                                </div>

                                <h3 className="text-2xl font-bold">
                                    Upload Image
                                </h3>

                                <p className="text-zinc-500 mt-2">
                                    PNG • JPG • JPEG • WEBP
                                </p>

                            </div>
                        )}

                    </motion.div>
                </motion.label>

                <motion.button
                    whileHover={{
                        scale: 1.02,
                    }}
                    whileTap={{
                        scale: 0.97,
                    }}
                    whileFocus={{
                        scale: 1.01,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                    onClick={handleAnalyze}
                    disabled={!base64 || loading || usedToday >= DAILY_LIMIT}
                    className="mt-6 w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 font-semibold text-lg shadow-[0_0_35px_rgba(99,102,241,.35)] disabled:opacity-50"
                >
                    {loading ? "Analyzing..." : "Run Analysis"}
                </motion.button>
                {
                    (loading || progress > 0) && (
                        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">

                            <div className="flex justify-between text-sm mb-3">
                                <span className="text-zinc-400">
                                    {status}
                                </span>

                                <span className="font-semibold">
                                    {progress}%
                                </span>
                            </div>

                            <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">

                                <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                    animate={{
                                        width: `${progress}%`,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                    }}
                                />

                            </div>

                        </div>
                    )
                }

                <section className="mt-8">

                    <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-zinc-500 uppercase text-xs tracking-[3px]">
                                    Confidence
                                </p>

                                <h2 className="text-6xl font-black mt-3">
                                    {confidence ?? 0}%
                                </h2>

                            </div>

                            <div
                                className={`px-4 py-3 rounded-2xl text-center ${aiProbability === null
                                    ? "bg-zinc-800 text-zinc-400"
                                    : aiProbability >= 50
                                        ? "bg-red-500/20 text-red-400"
                                        : "bg-green-500/20 text-green-400"
                                    }`}
                            >
                                <p className="text-xs uppercase opacity-70">
                                    Verdict
                                </p>

                                <p className="font-bold text-lg">
                                    {aiProbability === null
                                        ? "Waiting..."
                                        : aiProbability >= 50
                                            ? "Likely AI"
                                            : "Likely Human"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 h-4 rounded-full bg-zinc-800 overflow-hidden">

                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700"
                                style={{
                                    width: `${confidence ?? 0}%`,
                                }}
                            />

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-5">

                        <div className="rounded-3xl border border-red-500/10 bg-red-500/5 p-5">

                            <p className="text-red-300 text-sm mb-2">
                                AI Probability
                            </p>

                            <div className="text-5xl font-black text-red-400">
                                {aiProbability ?? 0}%
                            </div>

                        </div>

                        <div className="rounded-3xl border border-emerald-500/10 bg-emerald-500/5 p-5">

                            <p className="text-emerald-300 text-sm mb-2">
                                Human Probability
                            </p>

                            <div className="text-5xl font-black text-emerald-400">
                                {humanProbability ?? 0}%
                            </div>

                        </div>

                    </div>

                </section>

            </div >

        </motion.main >
    );
}