import React, { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
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
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
