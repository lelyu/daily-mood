import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
export default function NavBar() {
  return (
    <>
      <footer className="bottom-0 bg-amber-400 w-full p-4 flex justify-between items-center">
        <div>
          <div className="block md:hidden text-gray-800 text-sm md:text-lg">
            Author @ Lok Lyu
          </div>
          <div className="hidden md:block text-gray-800 text-sm md:text-lg">
            Designed and Implemented by Lok Lyu
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          {" "}
          <a
            href="https://github.com/lelyu/tip-calculator"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="text-gray-800 hover:text-blue-700 transition-colors"
          >
            <span className="text-2xl">
              <FaGithub />
            </span>
          </a>
          <a
            href="YOUR_LINKEDIN_PROFILE_URL"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="text-gray-800 hover:text-blue-700 transition-colors"
          >
            <span className="text-2xl">
              <FaLinkedin />
            </span>
          </a>
          <a
            href="YOUR_TWITTER_PROFILE_URL"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter Profile"
            className="text-gray-800 hover:text-blue-700 transition-colors"
          >
            <span className="text-2xl">
              <FaTwitter />
            </span>
          </a>
        </div>
        <div>
          <div className="text-gray-800 text-sm md:text-lg">
            Daily Mood @ {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </>
  );
}
