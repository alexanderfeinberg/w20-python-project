import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { loadFollowings } from "../../../store/user";
import { ModalContext } from "../../../context/Modal";
import { followThunk } from "../../../store/user";

const UserInfo = ({ user }) => {
  const followings = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();
  const [isLoaded, setisLoaded] = useState(false);
  const { setModalType } = useContext(ModalContext);

  console.log("FOLLOWINGS ", followings);

  useEffect(() => {
    dispatch(loadFollowings(user.id, "1", "5")).then(() => setisLoaded(true));
  }, [user.id]);

  const showFollowerModal = () => {
    setModalType("Followers");
  };

  const handleFollow = () => {
    dispatch(followThunk(user.id)).then(() => {
      return;
    });
  };

  if (isLoaded) {
    return (
      <div>
        <div>
          <img src={user.profile_picture} />
        </div>
        <div>
          <button onClick={showFollowerModal}>
            {user.followerCount} Followers
          </button>
        </div>
        <div>{user.bio}</div>
        <div>
          <button onClick={handleFollow}>Follow</button>
        </div>
        <div>
          <h3>Following</h3>
          <div>
            <ul>
              {Object.values(followings).map((following, idx) => {
                return (
                  <li key={idx}>
                    {following.firstName} {following.lastName}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <a>See all ({user.followingCount})</a>
          </div>
        </div>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};

export default UserInfo;
