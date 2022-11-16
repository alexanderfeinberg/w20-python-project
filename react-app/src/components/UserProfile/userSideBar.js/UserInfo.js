import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { loadFollowings } from "../../../store/user";
import { ModalContext } from "../../../context/Modal";
import {
  getUser,
  getUserfollowers,
  followsUser,
  followThunk,
  unfollowThunk,
} from "../../../store/user";

import "./UserInfo.css";

const UserInfo = ({ userId }) => {
  let user = useSelector((state) => state.user.singleUser);
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [isLoaded, setisLoaded] = useState(false);
  const [isFollowingUser, setFollowsUser] = useState(false);
  const { setModalType } = useContext(ModalContext);

  console.log("IS FOLLOWING USER", isFollowingUser);

  useEffect(() => {
    dispatch(getUser(userId))
      .then(() =>
        currentUser
          ? followsUser(userId).then((res) => setFollowsUser(res))
          : setFollowsUser(false)
      )
      .then(() => setisLoaded(true));
  }, [userId]);

  useEffect(() => {
    if (currentUser) {
      const res = followsUser(user.id).then((res) => res);
      setFollowsUser(res);
    }
  }, [user.followerCount]);

  const showFollowerModal = () => {
    setModalType("Followers");
  };

  const handleFollow = () => {
    if (!currentUser) {
      setModalType("Login");
      return;
    }
    user = dispatch(followThunk(userId)).then(() =>
      dispatch(getUser(userId)).then((res) => res)
    );
  };

  const handleUnfollow = () => {
    user = dispatch(unfollowThunk(userId))
      .then(() => dispatch(getUser(userId)))
      .then(() => followsUser(userId))
      .then((res) => setFollowsUser(res));
  };

  if (isLoaded) {
    return (
      <div className="container-content">
        <div className="profile-picture">
          <img src={user.profile_picture} />
        </div>
        <div className="profile-header">
          <div className="main-header">
            {user.firstName} {user.lastName}
          </div>
          <div className="follow-count textBtn">
            <button onClick={showFollowerModal}>
              {user.followerCount} Followers
            </button>
          </div>
        </div>
        <div className="bio">{user.bio}</div>
        <div className="action-btns">
          {isFollowingUser && user.id != currentUser.id && (
            <button className="unfollow" onClick={handleUnfollow}>
              Unfollow
            </button>
          )}

          {currentUser ? (
            !isFollowingUser &&
            user.id != currentUser.id && (
              <button className="follow-btn" onClick={handleFollow}>
                Follow
              </button>
            )
          ) : (
            <button className="follow-btn" onClick={handleFollow}>
              Follow
            </button>
          )}
        </div>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};

export default UserInfo;
