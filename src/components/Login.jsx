import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("prathamesh@gmail.com");
  const [password, setPassword] = useState("Backend@2026");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    const reqBody = {
      email,
      password,
    };
    try {
      const res = await axios.post(`${BASE_URL}/login`, reqBody, {withCredentials: true});
      dispatch(addUser(res.data));
     
      return navigate("/")
    } catch (err) {
       setError(err?.response?.data || "Something Went Wrong");

    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card w-96 bg-base-100 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <label className="label " htmlFor="email">
                Email Id
              </label>
              <input
                type="text"
                id="email"
                value={email}
                className="input"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please Enter Your Email"
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset">
              <label className="label " htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Please Enter Your password"
              />
            </fieldset>
          </div>
          <div className="text-red-500">{error}</div>
          <div className="justify-end card-actions">
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
