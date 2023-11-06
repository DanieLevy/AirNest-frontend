import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export function UserProfile() {
  const { userId } = useParams();
  const user = useSelector((storeState) => storeState.userModule.user);
  const isUser = user._id === userId;

  if (!isUser) return <div>Not your profile</div>;

  return (
    <section className="user-profile">
      <div className="user-profile-container">
        <div className="user-profile-header">Profile</div>
        <div className="user-profile-info">
          <div className="user-profile-info-container">
            <div className="user-profile-info-image">
              <img src={user.imgUrl} alt="" />
            </div>
            <div className="profile-info-container">
              <div className="user-profile-info-name">{user.fullname}</div>
              <div className="user-profile-info-lasttime">
                Last visit: Today
              </div>
            </div>
          </div>
        </div>

        <div className="user-profile-links">
          <div className="user-profile-links-container">
            <div className="user-profile-link">
              <Link to={`/wishlist`}>Wishlist</Link>
            </div>
            <div className="user-profile-link">
              <Link to={`/dashboard/${user._id}`}>Dashboard</Link>
            </div>
            <div className="user-profile-link">
              <Link to={`/order`}>Trips</Link>
            </div>
          </div>
        </div>
        <div className="user-profile-link logout-btn">
          <Link to={`/`}>Logout</Link>
        </div>
      </div>
    </section>
  );
}
