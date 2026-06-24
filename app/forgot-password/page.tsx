"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleReset() {
        setLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "https://verify-ai-silk.vercel.app/signin",
        });

        setLoading(false);

        if (error) {
            alert(error.message);
        } else {
            alert("Password reset email sent. Check your inbox.");
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#030303] text-white">
            <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-zinc-900/50">
                <h1 className="text-3xl font-bold mb-2">
                    Reset Password
                </h1>

                <p className="text-zinc-400 mb-6">
                    Enter your email and we'll send you a reset link.
                </p>

                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 mb-4"
                />

                <button
                    onClick={handleReset}
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </div>
        </main>
    );
}