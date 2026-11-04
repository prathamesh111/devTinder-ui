import axios from "axios";
import { useState } from "react";
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

      return navigate("/feed");
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
    <div className="flex w-full items-center justify-center px-4 py-10">
      <div className="card h-[34rem] w-full max-w-md border border-base-300 bg-base-100 shadow-lg">
        <div className="card-body h-full justify-between gap-3 p-6 sm:p-8">
          <h2 className="card-title justify-center text-2xl">
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          <div className="space-y-3">
            {!isLoginForm && (
              <>
                <fieldset className="fieldset w-full gap-1">
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    className="input w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                  />
                </fieldset>
                <fieldset className="fieldset w-full gap-1">
                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    className="input w-full"
                    onChange={(e) => setlastName(e.target.value)}
                    placeholder="Enter your last name"
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset w-full gap-1">
              <label className="label" htmlFor="email">
                Email Id
              </label>
              <input
                type="email"
                id="email"
                value={email}
                className="input w-full"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </fieldset>
            <fieldset className="fieldset w-full gap-1">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full"
                placeholder="Enter your password"
                autoComplete={isLoginForm ? "current-password" : "new-password"}
              />
            </fieldset>
          </div>
          <div
            className="min-h-10 line-clamp-2 text-sm text-error"
            role={error ? "alert" : undefined}
          >
            {error}
          </div>
          <div className="card-actions justify-end">
            <button
              type="button"
              onClick={isLoginForm ? handleLogin : handleSignup}
              className="btn btn-primary w-full"
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setError("");
              setIsLoginForm((value) => !value);
            }}
            className="link self-center text-center text-sm"
          >
            {isLoginForm
              ? "New User? Click here to Sign Up"
              : "Existing user - Login now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
