"use client";

import DesktopAnalyze from "../components/DesktopAnalyze";
import MobileAnalyze from "../components/MobileAnalyze";

export default function AnalyzePage() {
    return (
        <>
            <div className="hidden lg:block">
                <DesktopAnalyze />
            </div>

            <div className="block lg:hidden">
                <MobileAnalyze />
            </div>
        </>
    );
}