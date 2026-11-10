import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";
import UserCard from "./UserCard";
import Loader from "./loader";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (connections) return;

    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addConnection(res.data.data));
      } catch (err) {
        console.error("Failed to load connections:", err);
        setError("Could not load connections. Please try again.");
      }
    };

    fetchConnections();
  }, [connections, dispatch]);

  if (error) return <div className="my-10 text-center" role="alert">{error}</div>;
  if (connections === null) return <Loader />;
  if (connections.length === 0) return <div>No Requests found</div>;

  return (
    <section className="mx-auto my-10 w-full max-w-6xl px-4 sm:px-6">
      <h1 className="mb-6 text-center text-2xl font-bold">Connections</h1>
      <ul className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {connections.map((connection) => {
          return <UserCard key={connection._id} user={connection} cardType = "connections" />;
        })}
      </ul>
    </section>
  );
};

export default Connections;
