import { followsUser, followThunk, unfollowThunk } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { ModalContext } from "../../context/Modal";

const FollowButton = ({ userId, idx }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const { setModalType } = useContext(ModalContext);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    followsUser(userId).then((res) => setIsFollowing(res));
  }, []);

  const handleFollow = () => {
    if (!currentUser) {
      setModalType("Login");
      return;
    }
    dispatch(followThunk(userId))
      .then(() => followsUser(userId))
      .then((res) => setIsFollowing(res));
  };

  const handleUnfollow = () => {
    dispatch(unfollowThunk(userId))
      .then(() => followsUser(userId))
      .then((res) => setIsFollowing(res));
  };

  return (
    <div className="action-btns">
      {isFollowing && currentUser && userId != currentUser.id && (
        <button className="unfollow" key={idx} onClick={handleUnfollow}>
          Unfollow
        </button>
      )}
      {!isFollowing && currentUser && userId != currentUser.id && (
        <button className="follow-btn" onClick={handleFollow} key={idx}>
          Follow
        </button>
      )}
      {!currentUser && (
        <button className="follow-btn" onClick={handleFollow} key={idx}>
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowButton;
