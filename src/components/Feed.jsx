import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeuserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [loadError, setLoadError] = useState(false);

  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeuserFromFeed(_id));
    } catch (err) {
      console.log("some error occured" + err);
    }
  };

  useEffect(() => {
    if (feed) return;

    const getFeed = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.data));
      } catch (err) {
        setLoadError(true);
        console.error("Failed to fetch the feed:", err);
      }
    };

    getFeed();
  }, [dispatch, feed]);

  if (loadError && !feed) {
    return (
      <div className="flex justify-center my-10" role="alert">
        Could not load the feed. Check the API connection, then refresh the page.
      </div>
    );
  }
  if (!feed)
    return <div className="flex justify-center my-10">Loading feed...</div>;
  if (feed.length <= 0)
    return (
      <>
        <div className="flex justify-center my-10">
          You Have Reached To End of the Feed !
        </div>
      </>
    );
  return (
    <>
      <ul className="mx-auto my-8 flex min-h-[calc(100vh-8rem)] w-full max-w-5xl items-center justify-center px-4">
        <UserCard
          user={feed[0]}
          cardType="feed"
          handleSendRequest={handleSendRequest}
        />
      </ul>
    </>
  );
};

export default Feed;
