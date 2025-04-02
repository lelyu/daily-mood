import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="flex justify-items-start min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">View Journals</h1>
      </div>

      <Footer />
    </>
  );
}
