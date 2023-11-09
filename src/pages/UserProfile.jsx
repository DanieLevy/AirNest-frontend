import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { login, logout, signup } from "../store/actions/user.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export function UserProfile() {
  const { userId } = useParams();
  const user = useSelector((storeState) => storeState.userModule.user);
  const isUser = user._id === userId;

  async function onLogout() {
    try {
      await logout();
      showSuccessMsg(`Goodbye ${user.fullname}`);
    } catch (err) {
      showErrorMsg("Cannot logout");
    }
  }

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
              <div className="user-profile-info-name">Alexis Hernandez'</div>
              <div className="user-profile-info-lasttime">
                Last visit: Today
              </div>
            </div>
          </div>
        </div>

        <div className="user-profile-block">
          <div className="block-content">
            <div className="block-content-title">Airbnb your place</div>
            <div className="block-content-text">
              It's simple to get set up and start earning.
            </div>
          </div>
          <div className="block-content-image">
            <img
              src="https://a0.muscache.com/pictures/b0021c55-05a2-4449-998a-5593567220f7.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="user-profile-links">
          <div className="user-profile-links-container">
            <div className="user-profile-link">
              <div className="link-img  wishlist">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M29 5a2 2 0 0 1 2 1.85V25a2 2 0 0 1-1.85 2H3a2 2 0 0 1-2-1.85V7a2 2 0 0 1 1.85-2H3zM13.59 17H3v8h12v-6.59l-4.3 4.3-1.4-1.42zM29 17H18.41l4.3 4.3-1.42 1.4L17 18.42V25h12zM15 7H3v8h4.54a4 4 0 0 1 6.28-4.84c.29.28.68.85 1.18 1.74zm6 4c-.53 0-.98.17-1.42.6-.21.2-.63.87-1.22 1.98l-.25.47-.5.95H21a2 2 0 0 0 1.98-1.7l.01-.15L23 13a2 2 0 0 0-2-2zm8-4H17v4.9c.47-.82.83-1.37 1.12-1.67l.06-.07A4 4 0 0 1 24.46 15H29zm-18 4a2 2 0 0 0-2 2v.15A2 2 0 0 0 11 15h3.38l-.49-.95-.36-.69c-.54-.98-.91-1.58-1.1-1.76-.45-.43-.9-.6-1.43-.6z"></path>
                </svg>
              </div>
              <div className="link-text">
                <Link to={`/wishlist`}>Wishlist</Link>
              </div>
            </div>
            <div className="user-profile-link">
              <div className="link-img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path
                    fill="none"
                    d="M19.38 27a4.14 4.14 0 0 1 3.05-2.54 4.06 4.06 0 0 1 3.17.71 1 1 0 0 0 1.47-.33l2.11-3.64a1 1 0 0 0-.46-1.44 4.1 4.1 0 0 1 0-7.48 1 1 0 0 0 .46-1.44l-2.11-3.66a1 1 0 0 0-1.47-.33 4.07 4.07 0 0 1-3.17.71A4.14 4.14 0 0 1 19.38 5a4 4 0 0 1-.27-1.87 1 1 0 0 0-1-1.15h-4.2a1 1 0 0 0-1 1.15 4.11 4.11 0 0 1-3.34 4.43 4.06 4.06 0 0 1-3.17-.71 1 1 0 0 0-1.47.33l-2.11 3.64a1 1 0 0 0 .46 1.44 4.1 4.1 0 0 1 0 7.48 1 1 0 0 0-.46 1.44l2.11 3.64a1 1 0 0 0 1.47.33 4.06 4.06 0 0 1 3.17-.71 4.1 4.1 0 0 1 3 2.53 4 4 0 0 1 .28 1.88 1 1 0 0 0 1 1.15h4.18a1 1 0 0 0 1-1.15 4 4 0 0 1 .35-1.85zM12 16a4 4 0 1 1 4 4 4 4 0 0 1-4-4z"
                  ></path>
                </svg>
              </div>
              <div className="link-text">
                <Link to={`/dashboard/${user._id}`}>Dashboard</Link>
              </div>
            </div>
            <div className="user-profile-link">
              <div className="link-img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <g fill="none">
                    <path d="M16.67 24.94c-2.35 3.15-4.7 4.73-7.07 4.73-3.62 0-5.17-2.38-5.53-4.21-.32-1.63.5-3.82.8-4.54l1.75-3.85A205.3 205.3 0 0 1 11.7 6.6L12.6 5l.23-.41c.4-.68 1.5-2.25 3.84-2.25a4.16 4.16 0 0 1 3.78 2.16l.29.5.76 1.37.4.73c1.22 2.3 2.75 5.52 4.02 8.25l2.51 5.5c.27.61 1.16 2.92.83 4.62-.36 1.83-1.9 4.2-5.53 4.2-2.42 0-4.77-1.57-7.06-4.72z"></path>
                    <path d="M16.67 24.94c2.1-2.8 3.34-5.09 3.7-6.84.52-2.63-1.06-4.83-3.7-4.83s-4.23 2.2-3.7 4.83c.35 1.75 1.59 4.03 3.7 6.84z"></path>
                  </g>
                </svg>
              </div>
              <div className="link-text">
                <Link to={`/order`}>Trips</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="user-profile-link logout-btn">
          <div className="link-img"></div>
          <div className="link-text">
            <Link onClick={onLogout} to={`/`}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
