import { useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import { loadStays } from "../store/actions/stay.actions.js";
import { useSearchParams } from "react-router-dom";
import { StayList } from "../cmps/StayList";
import { Link } from "react-router-dom";
import { BrandedBtn } from "../cmps/BrandedBtn.jsx";

export function Wishlist() {
  const [searchParams] = useSearchParams();

  const isWishListPage = window.location.pathname.includes("wishlist");
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const user = useSelector((storeState) => storeState.userModule.user);
  const loginModal = useSelector(
    (storeState) => storeState.userModule.loginModal
  );

  useEffect(() => {
    loadStays(searchParams);
  }, [searchParams]);

  const userLikedStays = stays.filter((stay) =>
    stay.likedByUsers.some((likedUser) => likedUser._id === user._id)
  );

  function handleLoginModal() {
    store.dispatch({
      type: "SET_LOGIN_MODAL",
      loginModal: true,
    });
  }

  if (!userLikedStays.length) {
    return (
      <div className="no-stays">
        <img src="https://i.ibb.co/LvDMwQQ/ok.jpg" alt="no-stays" border="0" />
        <h1>No Stays Found..</h1>
        {isWishListPage ? (
          <h3>Try to add some stays to your wishlist</h3>
        ) : (
          <h3>Try to change your search</h3>
        )}
      </div>
    );
  }

  return (
    <section className="main-layout wishlist-container">
      <div className="wishlist-header">
        <h1>Wishlist</h1>
      </div>
      {user ? (
        <StayList stays={userLikedStays} />
      ) : (
        <div className="wishlist-not-logged-in">
          <h2 className="wishlist-not-logged-in-header">
            Login to view your wishlist
          </h2>
          <p
            className="wishlist-not-logged-in-subtitle"
            onClick={handleLoginModal}
          >
            You can create, view, or edit wishlists once you are logged in.
          </p>
          <div
            onClick={handleLoginModal}
            className="wishlist-not-logged-in-button"
          >
            <BrandedBtn txt="Login" width={100} />
          </div>
        </div>
      )}
    </section>
  );
}
