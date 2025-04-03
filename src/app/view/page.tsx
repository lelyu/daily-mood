import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Link from "next/link";
import moodData from "../../../lib/mockData.json"; // Adjust the path as needed

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-items-start min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 dark:text-gray-600">
          View Journals
        </h1>
        <Link
          href="/vis"
          className="block md:hidden text-lg font-bold mb-4 dark:text-gray-600"
        >
          View Visualization
        </Link>
        <Link
          href="/create"
          className="block md:hidden text-lg font-bold mb-4 dark:text-gray-600"
        >
          Add Mood
        </Link>

        <div className="flex flex-col md:flex-row justify-center bg-gray-100 flex-wrap gap-2">
          {moodData.map((mood) => (
            <div
              key={mood.id}
              className="bg-white shadow-md rounded-lg mb-4 md:basis-1/5 md:box-border md:size-64 p-4 overflow-auto"
            >
              <h2 className="text-2xl font-semibold text-gray-700">
                {mood.date}
              </h2>
              <p className="text-gray-700">Mood: {mood.mood}</p>
              <p className="text-gray-700">Intensity: {mood.intensity}</p>
              <p className="text-gray-700">Note: {mood.note}</p>
              <Link
                href={`/view/${mood.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
