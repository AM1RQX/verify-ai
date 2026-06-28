"use client";

import DesktopHome from "./components/DesktopHome";
import MobileHome from "./components/MobileHome";

export default function Home() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopHome />
      </div>

      <div className="block lg:hidden">
        <MobileHome />
      </div>
    </>
  );
}