import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    if (requests) return;
    try {
      const res = await axios.get(BASE_URL + "/users/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch {
      setError("Could not load requests. Please try again.");
    }
  };

  const reviewRequests = async (status, requestId) => {
    setError(null);

    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );

      dispatch(
        addRequests(requests.filter((request) => request._id !== requestId)),
      );
    } catch {
      setError("Could not review the request. Please try again.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (error) return <div role="alert">{error}</div>;
  if (requests === null) return <div>Loading requests...</div>;
  if (requests.length === 0) return <div>No requests found</div>;

  return (
    <div className="my-10 flex flex-col items-center gap-6 px-4">
      <h1 className="text-bold text-2xl">Requests</h1>
      <ul className="grid w-full max-w-6xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => {
          return (
            <UserCard
              key={request._id}
              requestId={request._id}
              user={request.fromUserId}
              reviewRequests={reviewRequests}
              cardType="requests"
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
