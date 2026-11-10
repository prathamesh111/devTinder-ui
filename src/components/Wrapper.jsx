import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Wrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);

  useEffect(() => {
    if (userData) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login", { replace: true });
          return;
        }

        console.error("Failed to fetch the logged-in user:", err);
      }
    };

    fetchUser();
  }, [dispatch, navigate, userData]);

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Wrapper;
