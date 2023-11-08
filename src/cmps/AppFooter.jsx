import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { store } from "../store/store";
import { set } from "date-fns";

export function AppFooter() {
  const [selected, setSelected] = useState("explore");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const user = useSelector((storeState) => storeState.userModule.user);
  const isStayPage = location.pathname.startsWith("/stay");
  const isIndexPage = location.pathname === "/";
  const loginModal = useSelector(
    (storeState) => storeState.userModule.loginModal
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/wishlist") {
      setSelected("wishlist");
    } else if (location.pathname === "/") {
      setSelected("explore");
    } else if (location.pathname === "/order") {
      setSelected("trips");
    }
    if (user) {
      if (location.pathname === `/inbox/:${user._id}`) {
        setSelected("inbox");
      } else if (location.pathname === `/profile/${user._id}`) {
        setSelected("profile");
      }
    }
  }, [location.pathname, selected, user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    let prevScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      currentScrollY > prevScrollY ? setIsVisible(false) : setIsVisible(true);
      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleLoginModal(value = true) {
    store.dispatch({
      type: "SET_LOGIN_MODAL",
      loginModal: value,
    });
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  return (
    <React.Fragment>
      {isMobile && !isStayPage && (
        <footer className={`app-footer-mobile ${isVisible ? "" : "hidden"}`}>
          <div className="footer-container flex">
            <div
              className={`footer-explore ${
                selected === "explore" ? "selected" : ""
              }`}
              onClick={() => {
                scrollToTop();
                setSelected("explore");
                navigate("/");
                handleLoginModal(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                className={`"explore-svg" ${
                  selected === "explore" ? "selected" : ""
                }`}
              >
                <path
                  fill="none"
                  d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                ></path>
              </svg>
              <Link to="/">Explore</Link>
            </div>
            <div
              className={`footer-wishlist ${
                selected === "wishlist" ? "selected" : ""
              }`}
              onClick={() => {
                scrollToTop();
                setSelected("wishlist");
                navigate("/wishlist");
                handleLoginModal(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                className={`"wishlist-svg" ${
                  selected === "wishlist" ? "selected" : ""
                }`}
              >
                <path
                  fill="none"
                  d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"
                ></path>
              </svg>{" "}
              <Link to="/wishlist">Wishlist</Link>
            </div>
            {!user && (
              <div
                className={`footer-login ${
                  selected === "login" && loginModal ? "selected" : ""
                }`}
                onClick={() => {
                  setSelected("login");
                  handleLoginModal();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  className={`login-svg ${
                    selected === "login" && loginModal ? "selected" : ""
                  }`}
                >
                  <g fill="none">
                    <circle cx="16" cy="16" r="14"></circle>
                    <path d="M14.02 19.66a6 6 0 1 1 3.96 0M17.35 19.67H18c3.69.61 6.8 2.91 8.54 6.08m-20.92-.27A12.01 12.01 0 0 1 14 19.67h.62"></path>
                  </g>
                </svg>
                Log in
              </div>
            )}

            {user && (
              <React.Fragment>
                <div
                  className={`footer-trips ${
                    selected === "trips" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelected("trips");
                    navigate("/order");
                    scrollToTop();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    className={`trips-svg ${
                      selected === "trips" ? "selected" : ""
                    }`}
                  >
                    <g fill="none">
                      <path d="M16.67 24.94c-2.35 3.15-4.7 4.73-7.07 4.73-3.62 0-5.17-2.38-5.53-4.21-.32-1.63.5-3.82.8-4.54l1.75-3.85A205.3 205.3 0 0 1 11.7 6.6L12.6 5l.23-.41c.4-.68 1.5-2.25 3.84-2.25a4.16 4.16 0 0 1 3.78 2.16l.29.5.76 1.37.4.73c1.22 2.3 2.75 5.52 4.02 8.25l2.51 5.5c.27.61 1.16 2.92.83 4.62-.36 1.83-1.9 4.2-5.53 4.2-2.42 0-4.77-1.57-7.06-4.72z"></path>
                      <path d="M16.67 24.94c2.1-2.8 3.34-5.09 3.7-6.84.52-2.63-1.06-4.83-3.7-4.83s-4.23 2.2-3.7 4.83c.35 1.75 1.59 4.03 3.7 6.84z"></path>
                    </g>
                  </svg>
                  <Link to="/order">Trips</Link>
                </div>

                <div
                  className={`footer-inbox ${
                    selected === "inbox" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelected("inbox");
                    navigate(`/inbox/:${user._id}`);
                    scrollToTop();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    className={`inbox-svg ${
                      selected === "inbox" ? "selected" : ""
                    }`}
                  >
                    <path
                      fill="none"
                      d="M26 3a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-6.32L16 29.5 12.32 25H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"
                    ></path>
                  </svg>
                  <Link to={`/inbox/:${user._id}`}>Inbox</Link>
                </div>

                <div
                  className={`footer-profile ${
                    selected === "profile" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelected("profile");
                    navigate(`/profile/${user._id}`);
                    scrollToTop();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    className={`profile-svg ${
                      selected === "profile" ? "selected" : ""
                    }`}
                  >
                    <g fill="none">
                      <circle cx="16" cy="16" r="14"></circle>
                      <path d="M14.02 19.66a6 6 0 1 1 3.96 0M17.35 19.67H18c3.69.61 6.8 2.91 8.54 6.08m-20.92-.27A12.01 12.01 0 0 1 14 19.67h.62"></path>
                    </g>
                  </svg>
                  <Link to={`/profile/${user._id}`}>Profile</Link>
                </div>
              </React.Fragment>
            )}
          </div>
        </footer>
      )}

      {!isMobile && isIndexPage && (
        <footer className="app-footer main-layout">
          <section className="footer-container flex">
            <div className="footer-left">
              <div className="footer-copyrigth">
                <div className="footer-copyrigth-text">
                  <p>© 2023 AirNest, Inc.</p>
                  <p className="dot">·</p>
                  <p>Terms</p>
                  <p className="dot">·</p>
                  <p>Sitemap</p>
                  <p className="dot">·</p>
                  <p>Privacy</p>
                  <p className="dot">·</p>
                  <p>Your Privacy Choices</p>
                </div>
                <div className="footer-privacy-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                    <rect
                      x="0.5"
                      y="0.5"
                      width="25"
                      height="11"
                      rx="5.5"
                      fill="#fff"
                    ></rect>
                    <path d="M14 1h7a5 5 0 010 10H11l3-10z" fill="#06F"></path>
                    <path
                      d="M4.5 6.5l1.774 1.774a.25.25 0 00.39-.049L9.5 3.5"
                      stroke="#06F"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M16.5 3.5L19 6m0 0l2.5 2.5M19 6l2.5-2.5M19 6l-2.5 2.5"
                      stroke="#fff"
                      strokeLinecap="round"
                    ></path>
                    <rect
                      x="0.5"
                      y="0.5"
                      width="25"
                      height="11"
                      rx="5.5"
                      stroke="#06F"
                    ></rect>
                  </svg>
                </div>
              </div>
            </div>
            <div className="footer-right">
              <div className="footer-curr-lang">
                <div className="footer-lang">
                  <div className="footer-lang-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z"></path>
                    </svg>
                  </div>
                  <div className="footer-lang-text">English (US)</div>
                </div>
                <div className="footer-curr">
                  <div className="footer-curr-icon">$</div>
                  <div className="footer-curr-text">USD</div>
                </div>
              </div>
              <div className="footer-support">
                <div className="footer-support-text">
                  <div className="support-text-title">Support & resources</div>
                  <div className="support-text-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path
                        fill="none"
                        d="M4 20 15.3 8.7a1 1 0 0 1 1.4 0L28 20"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </footer>
      )}
    </React.Fragment>
  );
}
