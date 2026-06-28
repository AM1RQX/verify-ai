"use client";

import DesktopDashboard from "../components/DesktopDashboard";
import MobileDashboard from "../components/MobileDashboard";

export default function DashboardPage() {
    return (
        <>
            <div className="hidden lg:block">
                <DesktopDashboard />
            </div>

            <div className="block lg:hidden">
                <MobileDashboard />
            </div>
        </>
    );
}