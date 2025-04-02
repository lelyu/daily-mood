import Image from "next/image";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to Daily Mood</h1>
        <p className="text-lg mb-8">
          A simple and elegant mood tracker application.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Get Started
          </button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded">
            Learn More
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
