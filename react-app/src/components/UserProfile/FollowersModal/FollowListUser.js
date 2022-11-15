import { followThunk, followsUser, unfollowThunk } from "../../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const FollowListUser = ({ user, idx }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    followsUser(user.id).then((res) => setIsFollowing(res));
  }, []);

  const handleFollow = () => {
    dispatch(followThunk(user.id))
      .then(() => followsUser(user.id))
      .then((res) => setIsFollowing(res));
  };

  const handleUnfollow = () => {
    dispatch(unfollowThunk(user.id))
      .then(() => followsUser(user.id))
      .then((res) => setIsFollowing(res));
  };

  return (
    <div key={`main-${idx}`} className="follow-user">
      <li key={idx}>
        <div className="follow-right-container">
          <div>{user.id}</div>
          <div className="follow-info">
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div key={idx}>{user.bio}</div>
          </div>
        </div>
        <div className="action-btns">
          {isFollowing && user.id != currentUser.id && (
            <button className="unfollow" key={idx} onClick={handleUnfollow}>
              Unfollow
            </button>
          )}
          {!isFollowing && user.id != currentUser.id && (
            <button className="follow-btn" onClick={handleFollow} key={idx}>
              Follow
            </button>
          )}
        </div>
      </li>
    </div>
  );
};

export default FollowListUser;
