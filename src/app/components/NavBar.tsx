"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-white text-lg font-bold">Daily Mood</div>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link
            href="vis"
            className="hidden md:block text-gray-300 hover:text-white"
          >
            Visualization
          </Link>
          <Link href="/view" className="text-gray-300 hover:text-white">
            View Journal
          </Link>
          <Link
            href="create"
            className="hidden md:block text-gray-300 hover:text-white"
          >
            Create Journal
          </Link>
        </div>
        <div className="text-white text-md">Login</div>
      </nav>
    </>
  );
}
