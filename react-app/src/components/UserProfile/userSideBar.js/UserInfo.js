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
      .then(() => followsUser(userId).then((res) => setFollowsUser(res)))
      .then(() => setisLoaded(true));
  }, [userId]);

  useEffect(() => {
    const res = followsUser(user.id);
    setFollowsUser(res);
  }, [user.followerCount]);

  const showFollowerModal = () => {
    setModalType("Followers");
  };

  const handleFollow = () => {
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

          {!isFollowingUser && user.id != currentUser.id && (
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
