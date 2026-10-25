import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";
import UserCard from "./UserCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
      console.log(res.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections === null) return <div>Loading connections...</div>;
  if (connections.length === 0) return <div>No connections found</div>;

  return (
    <div className="my-10 flex flex-col items-center gap-6 px-4">
      <h1 className="text-bold text-2xl">Connections</h1>
      <ul className="grid w-full max-w-6xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {connections.map((connection) => {
          return <UserCard key={connection._id} user={connection} cardType = "connections" />;
        })}
      </ul>
    </div>
  );
};

export default Connections;
