import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  const stayId = location.pathname.split("/stay/")[1];
  const loginModal = useSelector(
    (storeState) => storeState.userModule.loginModal
  );

  useEffect(() => {
    if (location.pathname === "/wishlist") {
      setSelected("wishlist");
    } else if (location.pathname === "/") {
      setSelected("explore");
    } else if (location.pathname === "/order") {
      setSelected("trips");
    } else if (location.pathname === `/inbox/:${user._id}`) {
      setSelected("inbox");
    } else if (location.pathname === `/profile/${user._id}`) {
      setSelected("profile");
    }

    console.log("location.pathname", location.pathname);
  }, [location.pathname]);

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
    console.log("loginModal", loginModal);
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
    </React.Fragment>
  );
}
