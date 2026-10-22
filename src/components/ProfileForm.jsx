import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const ProfileForm = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, about, photoUrl },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data))
      console.log(res.data.data);
    } catch (err) {
      setError(err.responses);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card w-96 bg-base-100 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
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
                onChange={(e) => setfirstName(e.target.value)}
                placeholder="Please Enter Your First Name"
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset">
              <label className="label " htmlFor="lastName">
                First Name
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

          <div>
            <fieldset className="fieldset">
              <label className="label " htmlFor="age">
                Age
              </label>
              <input
                type="text"
                id="age"
                value={age}
                className="input"
                onChange={(e) => setAge(e.target.value)}
                placeholder="Please Enter Your Age"
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset">
              <label className="label " htmlFor="photoUrl">
                photoUrl
              </label>
              <input
                type="text"
                id="photoUrl"
                value={photoUrl}
                className="input"
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Please Enter Your Photo URL"
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset">
              <label className="label " htmlFor="gender">
                Gender
              </label>
              <input
                type="text"
                id="gender"
                value={gender}
                className="input"
                onChange={(e) => setGender(e.target.value)}
                placeholder="Please Enter Your Gender"
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset">
              <label className="label " htmlFor="about">
                About
              </label>
              <input
                type="text"
                id="about"
                value={about}
                className="input"
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Please Enter Your About"
              />
            </fieldset>
          </div>

          <div className="text-red-500">{error}</div>
          <div className="justify-end card-actions">
            <button className="btn btn-primary" onClick={saveProfile}>
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, about }} />
    </div>
  );
};

export default ProfileForm;
