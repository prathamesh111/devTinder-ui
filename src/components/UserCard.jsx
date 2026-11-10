  import { Link } from "react-router";

const UserCard = ({ user, cardType, reviewRequests, requestId, handleSendRequest}) => {
  const { firstName, lastName, photoUrl, about, gender, _id } = user;
  const isFeedCard = cardType === "feed";

  const aboutWords = about?.trim().split(/\s+/) ?? [];
  const feedAbout =
    aboutWords.length > 150
      ? `${aboutWords.slice(0, 150).join(" ")}…`
      : about;

  return (
    <li className={`w-full ${isFeedCard ? "max-w-md" : ""}`}>
      <div
        className={`card h-full w-full overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl ${
          isFeedCard ? "" : "transition-shadow hover:shadow-lg"
        }`}
      >
        <figure className={isFeedCard ? "px-4 pt-4" : "pt-6"}>
          <img
            className={
              isFeedCard
                ? "aspect-[4/3] w-full rounded-2xl object-cover"
                : "h-24 w-24 rounded-full object-cover ring-4 ring-primary/10"
            }
            src={photoUrl}
            alt={firstName}
          />
        </figure>
        <div className={`card-body gap-2 p-5 ${isFeedCard ? "sm:p-6" : ""}`}>
          <h2 className="card-title justify-center text-center">
            {firstName + " " + lastName}
          </h2>
          {gender && (
            <p className="text-center text-sm capitalize text-base-content/60">
              {gender}
            </p>
          )}
          {about && (
            <section className="space-y-1">
              {cardType === "feed" && (
                <h3 className="text-sm font-semibold">About</h3>
              )}
              <p
                className={
                  cardType === "feed"
                    ? "text-sm leading-relaxed text-base-content/75"
                    : "line-clamp-3 text-sm leading-relaxed text-base-content/75"
                }
              >
                {cardType === "feed" ? feedAbout : about}
              </p>
            </section>
          )}
          {cardType === "feed" && (
            <div className="card-actions mt-auto flex-nowrap justify-center pt-3">
              <button onClick={() => handleSendRequest("ignored", _id)} className="btn btn-outline btn-secondary min-w-0 flex-1 rounded-full">Ignore</button>
              <button onClick={() => handleSendRequest("interested", _id)} className="btn btn-primary min-w-0 flex-1 rounded-full">Interested</button>
            </div>
          )}
          {cardType === "requests" && (
            <div className="card-actions mt-auto justify-center pt-3">
              <button onClick={() => reviewRequests("rejected",requestId )} className="btn btn-secondary">Reject</button>
              <button onClick={() => reviewRequests("accepted",requestId )} className="btn btn-primary">Accept</button>
            </div>
          )}
          {cardType === "connections" && (
            <div className="card-actions mt-auto justify-center pt-3">
              <Link to={`/chat/${_id}`} className="btn btn-primary">
                Chat
              </Link>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default UserCard;
