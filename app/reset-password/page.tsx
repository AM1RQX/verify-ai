"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Supabase кидает пользователя сюда через token из email
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();

            if (!data.session) {
                // нет токена → редирект на login
                router.push("/signin");
            } else {
                setReady(true);
            }
        };

        checkSession();
    }, [router]);

    async function updatePassword() {
        if (!password) return;

        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password,
        });

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        // 🔥 после смены пароля:
        await supabase.auth.signOut();

        router.push("/signin");
    }

    if (!ready) {
        return (
            <div className="min-h-screen flex items-center justify-center text-zinc-400">
                Loading...
            </div>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#030303] text-white">
            <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-zinc-900/50">
                <h1 className="text-3xl font-bold mb-2">
                    Set new password
                </h1>

                <p className="text-zinc-400 mb-6">
                    Enter your new password
                </p>

                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 mb-4 outline-none focus:border-indigo-500"
                />

                <button
                    onClick={updatePassword}
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Update password"}
                </button>
            </div>
        </main>
    );
}