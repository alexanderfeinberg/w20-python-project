const UserListModal = ({ followers, following }) => {
  const followData = followers ? followers : following;
  const title = followers ? "Followers" : "Following";
  return (
    <div>
      {followData.length} {title}
      <ul>
        {followData.map((user, idx) => {
          return (
            <div key={`main-${idx}`}>
              <li key={idx}>
                <div>{user.id}</div>
                <div>
                  {user.firstName} {user.lastName}
                </div>
                <div key={idx}>{user.bio}</div>
                <div>
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
