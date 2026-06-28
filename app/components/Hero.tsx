"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Hero() {
    const [rotation, setRotation] = useState({
        x: -15,
        y: 0,
    });
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function getUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUser(user);
        }

        getUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x =
                (e.clientX / window.innerWidth - 0.5) * 50;

            const y =
                (e.clientY / window.innerHeight - 0.5) * 50;

            setRotation({
                x: -y,
                y: x,
            });
        };

        window.addEventListener(
            "mousemove",
            handleMouseMove
        );

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );
        };
    }, []);

    return (
        <section
            id="hero"
            className="max-w-7xl mx-auto px-6 py-24"
        >
            <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* LEFT */}
                <div>

                    <div className="flex flex-wrap gap-3 mb-6">

                        <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-500/20">
                            #1 AI Detection Platform
                        </span>

                        <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-300 text-sm border border-yellow-500/20">
                            Demo Version • 15 analyses/day
                        </span>

                    </div>

                    <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                        Can You Tell
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                            What's Real?
                        </span>
                    </h1>

                    <p className="mt-8 text-xl text-white/70 max-w-xl">
                        Detect AI-generated images in seconds.
                        Upload content, run analysis, and receive instant results with confidence scores.
                    </p>

                    <div className="grid grid-cols-4 gap-6 mt-10 text-center">

                        <div>
                            <div className="text-2xl font-bold text-purple-400">
                                98.2%
                            </div>
                            <div className="text-xs text-white/50 mt-1">
                                Accuracy
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-purple-400">
                                &lt;3s
                            </div>
                            <div className="text-xs text-white/50 mt-1">
                                Analysis
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-purple-400">
                                10
                            </div>
                            <div className="text-xs text-white/50 mt-1">
                                Daily
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-purple-400">
                                12K+
                            </div>
                            <div className="text-xs text-white/50 mt-1">
                                Users
                            </div>
                        </div>

                    </div>

                    <div className="flex gap-4 mt-10">

                        {user ? (
                            <Link
                                href="/analyze"
                                className="
            px-7
            py-4
            rounded-xl
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            hover:scale-105
            transition
            "
                            >
                                Analyze AI Image
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/analyze"
                                    className="
    px-7
    py-4
    rounded-xl
    bg-gradient-to-r
    from-blue-500
    to-purple-600
    hover:scale-105
    transition
    "
                                >
                                    Analyze Now
                                </Link>
                            </>
                        )}

                    </div>

                </div>

                {/* RIGHT */}
                <div
                    className="
                    relative
                    h-[500px]
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[60px]
                    "
                >

                    <div className="absolute w-[650px] h-[650px] bg-purple-500/10 blur-[220px] rounded-full" />

                    <div className="absolute w-[420px] h-[420px] rounded-full border border-purple-500/5 animate-pulse" />
                    <div className="absolute w-[340px] h-[340px] rounded-full border border-blue-500/5" />
                    <div className="absolute w-[260px] h-[260px] rounded-full border border-purple-500/10" />

                    <div className="hero-cube-container">

                        <div
                            className="hero-cube"
                            style={{
                                transform: `
                                    rotateX(${rotation.x}deg)
                                    rotateY(${rotation.y}deg)
                                `,
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

            </div>
        </section>
    );
}