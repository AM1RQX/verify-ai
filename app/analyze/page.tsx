"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type AnalysisItem = {
    date: string;
    ai: number;
    human: number;
};

export default function AnalyzePage() {
    const [image, setImage] = useState<string | null>(null);
    const [base64, setBase64] = useState("");
    const [loading, setLoading] = useState(false);

    const [confidence, setConfidence] = useState<number | null>(null);
    const [aiProbability, setAiProbability] = useState<number | null>(null);
    const [humanProbability, setHumanProbability] = useState<number | null>(null);

    const [history, setHistory] = useState<AnalysisItem[]>([]);
    const [analysesToday, setAnalysesToday] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem("analysis-history");

        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch {
                localStorage.removeItem("analysis-history");
            }
        }

        const today = new Date().toDateString();

        const savedCount =
            localStorage.getItem("analysis-count");

        const savedDate =
            localStorage.getItem("analysis-date");

        if (savedDate === today) {
            setAnalysesToday(
                Number(savedCount || 0)
            );
        } else {
            localStorage.setItem(
                "analysis-date",
                today
            );

            localStorage.setItem(
                "analysis-count",
                "0"
            );

            setAnalysesToday(0);
        }

    }, []);

    function handleImageUpload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];

        console.log("FILE:", file);

        if (!file) {
            alert("Файл не найден");
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        console.log("IMAGE URL:", imageUrl);

        setImage(imageUrl);

        const reader = new FileReader();

        reader.onload = () => {
            console.log("BASE64 READY");

            setBase64(reader.result as string);
        };

        reader.onerror = () => {
            console.log("FILE READER ERROR");
        };

        reader.readAsDataURL(file);
    }

    async function handleAnalyze() {
        if (analysesToday >= 10) {
            alert("You reached the daily limit (10 analyses)");
            return;
        }
        if (!base64) {
            alert("Сначала загрузите изображение");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: base64,
                }),
            });

            const result = await response.json();

            console.log("HF RESULT:", result);

            let ai = 0;
            let human = 0;

            if (Array.isArray(result)) {
                ai = Math.round(
                    (result.find(
                        (item: any) =>
                            item.label === "artificial"
                    )?.score || 0) * 100
                );

                human = Math.round(
                    (result.find(
                        (item: any) =>
                            item.label === "human"
                    )?.score || 0) * 100
                );
            } else {
                const score =
                    result?.[0]?.score ||
                    result?.score ||
                    0.5;

                ai = Math.round(score * 100);
                human = 100 - ai;
            }

            setAiProbability(ai);
            setHumanProbability(human);
            setConfidence(Math.max(ai, human));

            const newAnalysis: AnalysisItem = {
                date: new Date().toLocaleString(),
                ai,
                human,
            };

            const updatedHistory = [
                newAnalysis,
                ...history,
            ].slice(0, 10);

            setHistory(updatedHistory);
            const newCount = analysesToday + 1;

            setAnalysesToday(newCount);

            localStorage.setItem(
                "analysis-count",
                String(newCount)
            );

            localStorage.setItem(
                "analysis-history",
                JSON.stringify(updatedHistory)
            );

        } catch (error) {
            console.error(error);
            alert("Ошибка анализа");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#04050b] text-white">
            <Link
                href="/"
                className="
    fixed
    top-8
    left-8
    z-50
    text-6xl
    font-bold
    text-purple-500
    hover:scale-110
    transition
    "
            >
                V
            </Link>
            <div className="absolute inset-0">
                <div className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-purple-600/20 blur-[180px] animate-pulse" />

                <div className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full bg-blue-600/20 blur-[180px] animate-pulse" />

                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[140px] -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto p-8">


                <div className="mb-10">
                    <h1 className="text-6xl font-bold">
                        Analyze Image
                    </h1>

                    <p className="mt-3 text-white/50">
                        Upload an image and detect AI-generated content instantly.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            Upload Image
                        </h2>

                        <label className="flex flex-col items-center justify-center h-[350px] rounded-3xl border-2 border-dashed border-purple-500/30 bg-white/[0.02] cursor-pointer hover:border-purple-500 transition">

                            <span className="text-6xl mb-4">
                                📤
                            </span>

                            <span className="text-xl">
                                Drag & Drop Image
                            </span>

                            <span className="text-white/50 mt-2">
                                PNG, JPG, WEBP
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>

                        <button
                            onClick={handleAnalyze}
                            disabled={loading || analysesToday >= 10}
                            className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-semibold hover:scale-[1.02] transition disabled:opacity-50"
                        >
                            {loading
                                ? "Analyzing..."
                                : analysesToday >= 10
                                    ? "Daily Limit Reached"
                                    : "Analyze Image"}
                        </button>
                        <p className="mt-3 text-center text-white/60">
                            {analysesToday}/10 analyses used today
                        </p>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            Preview
                        </h2>

                        {image ? (
                            <img
                                src={image}
                                alt="Preview"
                                className="w-full h-[350px] object-contain rounded-3xl"
                            />
                        ) : (
                            <div className="h-[350px] rounded-3xl bg-white/[0.03] flex items-center justify-center text-white/40">
                                No image selected
                            </div>
                        )}

                    </div>

                </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-6 mt-8">

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <div className="text-green-400 text-5xl font-bold">
                        {confidence !== null
                            ? `${confidence}%`
                            : "--"}
                    </div>

                    <div className="text-white/50 mt-2">
                        Confidence Score
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <div className="text-pink-400 text-5xl font-bold">
                        {aiProbability !== null
                            ? `${aiProbability}%`
                            : "--"}
                    </div>

                    <div className="text-white/50 mt-2">
                        AI Probability
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <div className="text-blue-400 text-5xl font-bold">
                        {humanProbability !== null
                            ? `${humanProbability}%`
                            : "--"}
                    </div>

                    <div className="text-white/50 mt-2">
                        Human Probability
                    </div>
                </div>

            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8">

                <h2 className="text-3xl font-bold mb-6">
                    Recent Analyses
                </h2>

                {history.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        No analyses yet.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {history.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                            >
                                <div className="font-semibold">
                                    AI: {item.ai}%
                                </div>

                                <div className="text-white/60">
                                    Human: {item.human}%
                                </div>

                                <div className="text-white/40 text-sm mt-2">
                                    {item.date}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </main >
    );
}