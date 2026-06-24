"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function updatePassword() {
        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password,
        });

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        setSuccess(true);
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#030303] text-white">
            <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-zinc-900/50">
                <h1 className="text-3xl font-bold mb-2">
                    Set New Password
                </h1>

                <p className="text-zinc-400 mb-6">
                    Enter your new password.
                </p>

                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 mb-4"
                />

                {success && (
                    <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400">
                        Password updated successfully.
                    </div>
                )}

                <button
                    onClick={updatePassword}
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition"
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </div>
        </main>
    );
}