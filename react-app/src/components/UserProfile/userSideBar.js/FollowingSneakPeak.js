import { ModalContext } from "../../../context/Modal";
import { loadFollowings, getUser } from "../../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";
import "./FollowingSneakPeak.css";

const FollowingSneakPeak = ({ userId }) => {
  const dispatch = useDispatch();
  const { modalType, setModalType } = useContext(ModalContext);
  let user = useSelector((state) => state.user.singleUser);
  const followings = useSelector((state) => state.user.userList.Followings);
  const [isLoaded, setIsLoaded] = useState(false);

  const showFollowingModal = () => {
    setModalType("Following");
  };

  useEffect(() => {
    console.log("DISPATCHING LAOD FOLLOWINGS");
    dispatch(loadFollowings(userId, "1", "5"))
      .then(() => console.log("RESPONSE FOLLOWINGS"))
      .then(() => dispatch(getUser(userId)).then((res) => setIsLoaded(true)));
  }, [modalType]);
  if (isLoaded) {
    return (
      <div className="following-peak">
        <h4>Following</h4>
        <div className="following-list">
          {followings.map((following, idx) => {
            return (
              <li key={idx}>
                <a href={`/users/${following.id}`} key={`a-${idx}`}>
                  {following.firstName} {following.lastName}
                </a>
              </li>
            );
          })}
        </div>
        <div className="expand-following textBtn">
          <button onClick={showFollowingModal}>
            See all ({user.followingCount})
          </button>
        </div>
      </div>
    );
  } else {
    return <h1>Loading....</h1>;
  }
};

export default FollowingSneakPeak;
