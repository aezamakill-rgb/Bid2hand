import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
