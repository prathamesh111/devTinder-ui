import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Wrapper = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Wrapper;
