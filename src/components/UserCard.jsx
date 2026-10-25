const UserCard = ({ user, cardType, reviewRequests, requestId}) => {
  const { firstName, lastName, photoUrl, about, gender } = user;
  return (
    <li>
      <div className="card bg-base-100 w-full max-w-96 shadow-sm">
        <figure className="pt-6">
          <img
            className="h-24 w-24 rounded-full object-cover"
            src={photoUrl}
            alt={firstName}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <h3>{gender}</h3>
          {about && <p>{about}</p>}
          {cardType === "feed" && (
            <div className="card-actions justify-center my-4">
              <button className="btn btn-secondary">Ignore Request</button>
              <button className="btn btn-primary">Send Request</button>
            </div>
          )}
          {cardType === "requests" && (
            <div className="card-actions justify-center my-4">
              <button onClick={() => reviewRequests("rejected",requestId )} className="btn btn-secondary">Reject</button>
              <button onClick={() => reviewRequests("accepted",requestId )} className="btn btn-primary">Accept</button>
            </div>
          )}

        </div>
      </div>
    </li>
  );
};

export default UserCard;
