import { useState } from "react";
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
  const [showSuccess, setShowSuccess] = useState(false);
  // const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, about, photoUrl },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data.response);
    }
  };
  return (
    <section className="mx-auto my-8 grid w-full max-w-5xl grid-cols-1 items-start gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8">
      <div className="card w-full border border-base-300 bg-base-100 shadow-md">
        <div className="card-body gap-4 p-5 sm:p-8">
          <h2 className="card-title justify-center text-2xl">Edit Profile</h2>
          <fieldset className="fieldset w-full gap-1">
              <label className="label" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                className="input w-full"
                onChange={(e) => setfirstName(e.target.value)}
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
          <fieldset className="fieldset w-full gap-1">
              <label className="label" htmlFor="age">
                Age
              </label>
              <input
                type="text"
                id="age"
                value={age}
                className="input w-full"
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
              />
          </fieldset>
          <fieldset className="fieldset w-full gap-1">
              <label className="label" htmlFor="photoUrl">
                Photo URL
              </label>
              <input
                type="text"
                id="photoUrl"
                value={photoUrl}
                className="input w-full"
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Enter your photo URL"
              />
          </fieldset>

          {/* <div>
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
          </div> */}

          <fieldset className="fieldset w-full gap-1">
              <label className="label" htmlFor="about">
                About
              </label>
              <textarea
                id="about"
                value={about}
                className="textarea min-h-28 w-full"
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell people a little about yourself"
              />
          </fieldset>

          {error && <div className="text-sm text-error" role="alert">{error}</div>}
          {showSuccess && (
            <div className="alert alert-success py-2" role="status">
              <span>Your changes were saved successfully</span>
            </div>
          )}
          <div className="card-actions mt-2">
            <button className="btn btn-primary w-full" onClick={saveProfile}>
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-md lg:sticky lg:top-6">
        <h2 className="mb-3 text-center text-lg font-semibold">Profile Preview</h2>
        <UserCard user={{ firstName, lastName, photoUrl, age, about }} />
      </div>
    </section>
  );
};

export default ProfileForm;
