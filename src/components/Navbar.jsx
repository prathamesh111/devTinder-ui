import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeConnection } from "../utils/connectionsSlice";
import { removeFeed } from "../utils/feedSlice";
import { emptyReqUsers } from "../utils/requestsSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const closeMenu = () => {
    if (dropdownRef.current) {
      dropdownRef.current.open = false;
    }
  };

  const handleLogout = async () => {
    closeMenu();

    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUser());
      dispatch(removeConnection());
      dispatch(removeFeed());
      dispatch(emptyReqUsers());
      navigate("/login");
    } catch {
      navigate("/error");
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      <div className="flex gap-2">
        <details ref={dropdownRef} className="dropdown dropdown-end mx-5">
          {user && (
            <summary className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </summary>
          )}
          <ul
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link
                to="/feed"
                className="justify-between"
                onClick={closeMenu}
              >
                Feed
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="justify-between"
                onClick={closeMenu}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link to="/connections" onClick={closeMenu}>
                Connections
              </Link>
            </li>
            <li>
              <Link to="/requests" onClick={closeMenu}>
                Requests
              </Link>
            </li>
            <li>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default Navbar;
