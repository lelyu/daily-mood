"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const activeClass = "text-white font-semibold";
  const inactiveClass = "text-gray-300 hover:text-white";

  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-amber-400 text-lg">Daily Mood</div>
        <div className="flex space-x-4">
          <Link
            href="/"
            className={pathname === "/" ? activeClass : inactiveClass}
          >
            Home
          </Link>

          <Link
            href="/vis"
            className={`hidden md:block ${
              pathname === "/vis" ? activeClass : inactiveClass
            }`}
          >
            Visualization
          </Link>

          <Link
            href="/view"
            className={pathname === "/view" ? activeClass : inactiveClass}
          >
            View Journal
          </Link>

          <Link
            href="/create"
            className={`hidden md:block ${
              pathname === "/create" ? activeClass : inactiveClass
            }`}
          >
            Create Journal
          </Link>
        </div>
        <div className="text-white text-md">Login</div>
      </nav>
    </>
  );
}
