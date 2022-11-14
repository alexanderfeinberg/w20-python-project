import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserfollowers } from "../../../store/user";

const FollowersModal = () => {
  dispatch = useDispatch();
  followers = useSelector((state) => state.user.userList);
  user = useSelector((state) => state.user.singleUser);
  [page, setPage] = useState(1);
  [isLoaded, setIsLoaded] = useState(false);

  useEffect((getUserfollowers) => {
    dispatch(getUserfollowers(user.id, `${page}`, `10`)).then(() =>
      setIsLoaded(true)
    );
  }, []);

  const handlePagination = () => {
    dispatch(getUserfollowers(user.id, `${page + 1}`, "10")).then(() =>
      setPage(page + 1)
    );
  };

  return (
    <div>
      {user.followerCount} Followers
      <ul>
        {followers.map((follower, idx) => {
          return (
            <div>
              <li key={idx}>
                <div>
                  {follower.firstName} {follower.lastName}
                </div>
                <div>{follower.bio}</div>
                <div>
                  <button>Follow</button>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
      <div>
        <button onClick={handlePagination}>Show more</button>
      </div>
    </div>
  );
};
