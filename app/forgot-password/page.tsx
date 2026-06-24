"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function handleReset() {
        setLoading(true);
        setErrorMsg("");
        setSuccess(false);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "https://verify-ai-silk.vercel.app/reset-password",
        });

        setLoading(false);

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccess(true);
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
                {success && (
                    <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400">
                        Password reset email sent. Check your inbox.
                    </div>
                )}
                <button
                    onClick={handleReset}
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
                {success && (
                    <p className="mt-4 text-green-400 text-sm text-center">
                        Check your email. Password reset link has been sent.
                    </p>
                )}
            </div>
        </main>
    );
}