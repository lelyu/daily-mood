import { FaGithub } from "react-icons/fa";

export default function NavBar() {
  return (
    <>
      <footer className="fixed bottom-0 bg-amber-400 w-full p-4 flex justify-between items-center">
        <div className="block md:hidden text-gray-800 text-sm md:text-lg">
          Author @ Lok Lyu
        </div>
        <div className="hidden md:block text-gray-800 text-sm md:text-lg">
          Designed and Implemented by Lok Lyu
        </div>
        <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <a href="https://github.com/lelyu/tip-calculator">
            <span className="text-2xl">
              <FaGithub />
            </span>
          </a>
        </div>
        <div className="text-gray-800 text-sm md:text-lg">
          Daily Mood @ 2025
        </div>
      </footer>
    </>
  );
}
