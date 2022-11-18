import "./UserCard.css";
import { useState, useEffect } from "react";
import { getUser } from "../../../store/user";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FollowButton from "../FollowButton";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="card-header">
        <a href="javascript:;">
          <Link href={`/users/${user.id}`}>
            <h2>
              {user.firstName} {user.lastName}
            </h2>
          </Link>
        </a>
      </div>
      <div className="card-content">{user.bio}</div>
      <div className="card-footer">
        <div className="card-follower-count">
          {user.followerCount} Followers
        </div>
        <div className="btn">
          <FollowButton userId={user.id} key={null} />
          {/* <button>Follow</button> */}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
