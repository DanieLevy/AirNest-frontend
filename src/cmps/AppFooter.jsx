import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { CgSearch } from "react-icons/cg";
import { PiHeartThin } from "react-icons/pi";
import { PiUserCircleLight } from "react-icons/pi";
import { loadStay } from "../store/actions/stay.actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { store } from "../store/store";

export function AppFooter() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isVisible, setIsVisible] = useState(true);
  const [stay, setStay] = useState(null);
  const isStayPage = location.pathname.startsWith("/stay");
  const stayId = location.pathname.split("/stay/")[1];
  const loginModal = useSelector((storeState) => storeState.userModule.loginModal);
  const dispatch = useDispatch();

  useEffect(() => {
    getStay();

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

  function getStay() {
    loadStay(stayId).then((stay) => {
      setStay(stay);
    });
  }

  function handleLoginModal() {
    console.log("loginModal", loginModal);
    store.dispatch({
      type: "SET_LOGIN_MODAL",
      loginModal: true,
    });
  }

  return (
    <React.Fragment>
      {isMobile && !isStayPage && (
        <footer className={`app-footer-mobile ${isVisible ? "" : "hidden"}`}>
          <div className="footer-container flex">
            <div className="footer-explore">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                className="explore-svg"
              >
                <path
                  fill="none"
                  d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                ></path>
              </svg>
              <Link to="/">Explore</Link>
            </div>
            <div className="footer-wishlist">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                className="wishlist-svg"
              >
                <path
                  fill="none"
                  d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"
                ></path>
              </svg>{" "}
              <Link to="/wishlist">Wishlist</Link>
            </div>
            <div className="footer-login"
            onClick={handleLoginModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 8a5 5 0 0 0-2 9.58v2.1l-.15.03a11 11 0 0 0-6.94 4.59C9.26 27.59 12.46 29 16 29s6.74-1.41 9.09-3.7a11 11 0 0 0-6.93-4.59l-.16-.03v-2.1a5 5 0 0 0 3-4.35V14a5 5 0 0 0-5-5zm0-6A13 13 0 0 0 5.56 23.75a13.02 13.02 0 0 1 5.54-4.3l.35-.13-.02-.02A7 7 0 0 1 9 14.27L9 14a7 7 0 1 1 11.78 5.12l-.23.2.04.02c2.33.88 4.36 2.41 5.85 4.4A13 13 0 0 0 16 3z"></path>
              </svg>
              Login
            </div>
          </div>
        </footer>
      )}
    </React.Fragment>
  );
}
