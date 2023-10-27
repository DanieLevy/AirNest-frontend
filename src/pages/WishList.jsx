import { useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import { loadStays } from "../store/actions/stay.actions.js"
import { useSearchParams } from "react-router-dom";
import { StayList } from "../cmps/StayList";


export function Wishlist() {
  const [searchParams] = useSearchParams();

  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const user = useSelector((storeState) => storeState.userModule.user);

  useEffect(() => {
    loadStays(searchParams);
  }, [searchParams]);

  const userLikedStays = stays.filter((stay) =>
    stay.likedByUsers.some((likedUser) => likedUser._id === user._id)
  );

  return (
    <section className="main-layout wishlist-container">
      <div className="wishlist-header">
        <h1>Wishlist</h1>
      </div>
      {user ? (
        <StayList stays={userLikedStays} />
      ) : (
        <p>
          <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to
          save your favorite stays
        </p>
      )}
    </section>
  );
}