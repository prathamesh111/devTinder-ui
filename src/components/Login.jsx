import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const reqBody = {
      email,
      password,
    };
    try {
      const res = await axios.post(`${BASE_URL}/login`, reqBody, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));

      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
    }
  };

  const handleSignup = async() => {
    const reqBody = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      const res = await axios.post(`${BASE_URL}/signup`, reqBody, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
    }
  };


  return (
    <div className="flex justify-center my-10">
      <div className="card w-96 bg-base-100 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          {!isLoginForm && (
            <>
              <div>
                <fieldset className="fieldset">
                  <label className="label " htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    className="input"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Please Enter Your First Name"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <label className="label " htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    className="input"
                    onChange={(e) => setlastName(e.target.value)}
                    placeholder="Please Enter Your Last Name"
                  />
                </fieldset>
              </div>
            </>
          )}
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
            <button onClick={isLoginForm? handleLogin : handleSignup} className="btn btn-primary">
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>
          <div
            onClick={() => setIsLoginForm((value) => !value)}
            className="link text-center"
          >
            {isLoginForm
              ? "New User? Click here to Sign Up"
              : "Existing user - Login now"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
