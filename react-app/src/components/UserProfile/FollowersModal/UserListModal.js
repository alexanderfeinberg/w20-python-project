import "./UserListModal.css";

const UserListModal = ({ followers, following }) => {
  const followData = followers ? followers : following;
  const title = followers ? "Followers" : "Following";
  return (
    <div className="follow-data-content">
      <div id="follow-data-title">
        {followData.length} {title}
      </div>
      <ul id="follow-data">
        {followData.map((user, idx) => {
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
                  <button key={idx}>Follow</button>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default UserListModal;
