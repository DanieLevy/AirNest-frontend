import React, { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { login, logout, signup } from "../store/actions/user.actions.js";
import { LoginSignup } from "./LoginSignup.jsx";
import { ExploreBar } from "./ExploreBar";
import { UserMsg } from "./UserMsg";
import { useState } from "react";

import { FaAirbnb } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { is } from "date-fns/locale";
import { store } from "../store/store.js";

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [userModal, setUserModal] = useState(false);
  const loginModal = useSelector(
    (storeState) => storeState.userModule.loginModal
  );
  const isExploreExpanded = useSelector(
    (storeState) => storeState.userModule.isExploreExpanded
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const [signupModal, setSignupModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const isStayPage = location.pathname.startsWith("/stay");
  const isOrderPage = location.pathname.startsWith("/order");
  const isWishlistPage = path === "/wishlist";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function onLogin(credentials) {
    try {
      const user = await login(credentials);
      showSuccessMsg(`Welcome back ${user.fullname}`);
      closeModal();
    } catch (err) {
      showErrorMsg("Cannot login");
    }
  }
  async function onSignup(credentials) {
    try {
      const user = await signup(credentials);
      showSuccessMsg(`Welcome ${user.fullname}`);
      closeModal();
    } catch (err) {
      showErrorMsg("Cannot signup");
    }
  }
  async function onLogout() {
    try {
      await logout();
      showSuccessMsg(`Goodbye ${user.fullname}`);
    } catch (err) {
      showErrorMsg("Cannot logout");
    }
  }

  function closeModal() {
    store.dispatch({ type: "SET_LOGIN_MODAL", loginModal: false });
    setUserModal(false);
  }

  function onLabelClick(label) {
    console.log(label);
  }

  function onToggleLogin() {
    store.dispatch({ type: "SET_LOGIN_MODAL", loginModal: !loginModal });
  }

  return (
    <React.Fragment>
      {!isMobile ? (
        <React.Fragment>
          <section
            className={`header-container main-layout ${
              isStayPage ? "stayDetails relative" : ""
            }
          ${isOrderPage ? "medium relative" : ""}
          `}
          >
            {!isMobile && (
              <header className="main-header flex">
                <Link
                  to="/"
                  className="logo flex"
                  onClick={window.scrollTo({ top: 0 })}
                >
                  <FaAirbnb />
                  <h1>AirNest</h1>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="63"
                    height="17"
                    viewBox="0 0 63 17"
                    className="logo-txt"
                  >
                    <path
                      d="M6.16 16.61a4.76 4.76 0 01-3.72-1.7 6.14 6.14 0 01-1.5-4.21A6.52 6.52 0 012.5 6.4a5.03 5.03 0 013.84-1.74 4.07 4.07 0 013.49 1.8L9.92 5h2.76v11.32H9.92l-.1-1.65a4.25 4.25 0 01-3.66 1.95zm.72-2.7a2.8 2.8 0 001.47-.42c.42-.3.75-.7 1.02-1.17.25-.48.37-1.05.37-1.68 0-.63-.12-1.2-.37-1.69-.24-.48-.6-.87-1.02-1.17a2.8 2.8 0 00-2.94 0c-.42.3-.75.7-1.02 1.17a3.75 3.75 0 00-.36 1.69 3.21 3.21 0 001.38 2.85c.45.27.93.42 1.47.42zM17.4 1.93c0 .33-.06.63-.2.87a1.73 1.73 0 01-1.5.8c-.3 0-.6-.05-.88-.2a1.73 1.73 0 01-.63-.6 1.7 1.7 0 01-.21-.87c0-.33.06-.63.21-.87.15-.27.36-.45.63-.6.27-.15.57-.21.87-.21.3 0 .6.06.87.2.27.16.48.37.63.6.12.25.21.52.21.88zm-3.21 14.35V4.96h3v11.32h-3zM25.2 7.93v.03c-.15-.06-.33-.09-.48-.12-.18-.03-.33-.03-.51-.03-.84 0-1.47.24-1.9.75-.44.51-.65 1.24-.65 2.17v5.55h-3V4.96h2.76l.09 1.71c.3-.6.66-1.05 1.17-1.38a2.94 2.94 0 011.71-.48c.21 0 .42.03.6.06.1.03.15.03.21.06v3zm1.2 8.35V.31h3v6.10c.43-.55.9-.97 1.5-1.30a4.76 4.76 0 015.74 1.23 6.13 6.13 0 011.5 4.20 6.52 6.52 0 01-1.56 4.30c-.48.54-1.05 1-1.7 1.3-.67.3-1.36.44-2.14.44a4.07 4.07 0 01-3.49-1.8l-.09 1.47-2.76.03zm5.8-2.37a2.8 2.8 0 001.47-.42c.42-.3.75-.7 1.02-1.17.24-.48.36-1.05.36-1.68 0-.63-.12-1.2-.36-1.69-.27-.48-.6-.87-1.02-1.17a2.8 2.8 0 00-2.94 0c-.42.3-.75.7-1.02 1.17a3.75 3.75 0 00-.37 1.69c0 .63.13 1.2.37 1.68s.6.87 1.02 1.17c.45.27.93.42 1.47.42zm7.08 2.37V4.96h2.77l.09 1.47a3.72 3.72 0 013.33-1.77 3.77 3.77 0 013.6 2.28c.34.72.52 1.6.52 2.59v6.78h-3v-6.4c0-.78-.19-1.4-.55-1.86-.36-.45-.84-.69-1.47-.69-.45 0-.84.10-1.2.30-.33.21-.6.48-.81.87-.21.36-.30.82-.30 1.27v6.48h-2.98zm11.8 0V.31h3.01v6.10c.42-.55.9-.97 1.5-1.30a4.76 4.76 0 015.74 1.23 6.13 6.13 0 011.5 4.20 6.52 6.52 0 01-1.56 4.30 5.03 5.03 0 01-3.84 1.74 4.07 4.07 0 01-3.49-1.8l-.10 1.47-2.75.03zm5.83-2.37a2.8 2.8 0 001.47-.42c.42-.3.75-.7 1.02-1.17.25-.48.37-1.05.37-1.68 0-.63-.12-1.2-.37-1.69-.24-.48-.6-.87-1.02-1.17a2.8 2.8 0 00-2.94 0c-.42.3-.75.7-1.02 1.17a3.38 3.38 0 00-.36 1.69 3.21 3.21 0 001.38 2.85c.45.27.9.42 1.47.42z"
                      fill="currentcolor"
                    ></path>
                  </svg> */}
                </Link>
                {isOrderPage ? "" : <ExploreBar />}

                <div to="/edit" className="nav-text">
                  <button
                    // disabled={!user || user === null}
                    onClick={() => {
                      if (!user || user === null) {
                        store.dispatch({
                          type: "SET_LOGIN_MODAL",
                          loginModal: true,
                        });
                        setSignupModal(false);
                        showErrorMsg("Please login first");
                        return;
                      } else {
                        window.location.href = "/edit";
                      }
                    }}
                  >
                    AirNest your home
                  </button>
                </div>

                <div
                  className="user-nav flex"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setUserModal(!userModal);
                  }}
                >
                  <IoIosMenu />
                  {user && user.imgUrl ? (
                    <img src={user.imgUrl} alt="" />
                  ) : (
                    <FaCircleUser className="user-icon" />
                  )}
                </div>

                {userModal && (
                  <section className="user-modal">
                    <div
                      className="back-drop"
                      onClick={() => closeModal()}
                    ></div>
                    <ul className="user-modal-nav">
                      {!user ? (
                        <>
                          <li
                            onClick={(ev) => {
                              ev.stopPropagation();
                              setUserModal(false);
                              store.dispatch({
                                type: "SET_LOGIN_MODAL",
                                loginModal: true,
                              });
                              setSignupModal(false);
                            }}
                          >
                            Login
                          </li>
                          <li
                            onClick={(ev) => {
                              ev.stopPropagation();
                              setUserModal(false);
                              store.dispatch({
                                type: "SET_LOGIN_MODAL",
                                loginModal: true,
                              });
                              setSignupModal(true);
                            }}
                          >
                            Signup
                          </li>
                          <div className="divider"></div>
                          <Link
                            to="/edit"
                            style={{ textDecorationLine: "none" }}
                            onClick={() => setUserModal(false)}
                          >
                            <li>AirNest your home</li>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to={"/wishList"}
                            style={{ textDecorationLine: "none" }}
                            onClick={() => setUserModal(false)}
                          >
                            <li>Whislist</li>
                          </Link>
                          <Link
                            to="/order"
                            style={{ textDecorationLine: "none" }}
                            onClick={() => setUserModal(false)}
                          >
                            <li>Trip</li>
                          </Link>
                          <div className="divider"></div>
                          <Link
                            to={`/dashboard/${user._id}`}
                            style={{ textDecorationLine: "none" }}
                            onClick={() => setUserModal(false)}
                          >
                            <li>Dashboard</li>
                          </Link>
                          <Link
                            to={`/user/${user._id}`}
                            style={{ textDecorationLine: "none" }}
                            onClick={() => setUserModal(false)}
                          >
                            <li>Listings</li>
                          </Link>
                          <div className="divider"></div>
                          <li
                            onClick={() => {
                              onLogout();
                              setUserModal(false);
                            }}
                          >
                            Logout
                          </li>
                        </>
                      )}
                    </ul>
                  </section>
                )}
              </header>
            )}
            {loginModal && (
              <LoginSignup
                login={onLogin}
                signup={onSignup}
                onToggleLogin={onToggleLogin}
                closeModal={closeModal}
                isSignup={signupModal}
                setSignupModal={setSignupModal}
              />
            )}
          </section>
          <div
            className={`white-space ${isExploreExpanded ? "expanded" : ""}`}
          ></div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {isMobile && path === "/" && (
            <section className={`header-container main-layout`}>
              <ExploreBar />
            </section>
          )}
          {loginModal && (
            <LoginSignup
              login={onLogin}
              signup={onSignup}
              onToggleLogin={onToggleLogin}
              closeModal={closeModal}
              isSignup={signupModal}
              setSignupModal={setSignupModal}
            />
          )}
        </React.Fragment>
      )}

      {!isMobile && !isStayPage && !isOrderPage && !isExploreExpanded ? (
        <div
          className="divider"
          style={{
            position: "sticky",
            top: "80px",
            opacity: "1",
            zIndex: "10",
          }}
        ></div>
      ) : (
        <div
          className="divider"
          style={isMobile ? { display: "none" } : { display: "block" }}
        ></div>
      )}
    </React.Fragment>
  );
}
