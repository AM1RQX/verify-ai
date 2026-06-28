"use client";

import Link from "next/link";

export default function MobileNavbar() {
    return (
        <div className="flex items-center justify-between px-6 py-5">
            <div className="text-xl font-black text-white">
                Verify<span className="text-purple-500">AI</span>
            </div>

            <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
            >
                My Dashboard
            </Link>
        </div>
    );
}