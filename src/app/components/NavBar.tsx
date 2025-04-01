"use client";

export default function NavBar() {
  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-white text-lg font-bold">Daily Mood</div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">
            Home
          </a>
          <a
            href="#"
            className="hidden md:block text-gray-300 hover:text-white"
          >
            Visualization
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            View Journal
          </a>
          <a
            href="#"
            className="hidden md:block text-gray-300 hover:text-white"
          >
            Create Journal
          </a>
        </div>
        <div className="text-white text-md">Login</div>
      </nav>
    </>
  );
}
