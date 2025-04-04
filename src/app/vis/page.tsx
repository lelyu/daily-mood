import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
export default function Page() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col min-h-screen bg-gray-100 p-4">
        <h1 className="w-fit text-4xl font-bold mb-4 dark:text-gray-600 border rounded-md p-2">
          Visualizations
        </h1>
        <form action=""></form>
      </div>
      <Footer />
    </>
  );
}
