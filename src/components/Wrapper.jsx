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

  const fetchUser = async () => {
    if(userData) return ;
    try {
      const res = await axios.get(BASE_URL+"/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status=== 401){
        return navigate("/login");
      }
      
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);

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
