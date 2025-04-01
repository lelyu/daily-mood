import Image from "next/image";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <div>
        <h1>Hello World</h1>
      </div>
      <Footer />
    </>
  );
}
