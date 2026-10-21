import React from "react";

const UserCard = ({user} ) => {
    const { firstName, lastName, photoUrl, skills, about } = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt={firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName}</h2>
        {about && <p>{about}</p>}
        <div className="card-actions justify-center my-4">
            <button className="btn btn-secondary">Ignore Request</button>
          <button className="btn btn-primary">Send Request</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
