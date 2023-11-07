import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { stayService } from "../services/stay.service.js";
import { StayDescription } from "../cmps/StayDetails/StayDescription.jsx";
import { StayHeader } from "../cmps/StayDetails/StayHeader.jsx";
import { StayReviews } from "../cmps/StayDetails/StayReviews.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { useDispatch, useSelector } from "react-redux";
import { getActionStageOrder } from "../store/actions/order.actions.js";
import {
  LOADING_DONE,
  LOADING_START,
} from "../store/reducer/system.reducer.js";
import { StayMap } from "../cmps/StayDetails/StayMap.jsx";
import { StayLoader } from "../cmps/StayLoader.jsx";

import { is } from "date-fns/locale";
import { PropagateLoader } from "react-spinners";

export function StayDetails() {
  const { stayId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const isLoading = useSelector((state) => state.systemModule.isLoading);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currStay, setCurrStay] = useState(null);
  const stayGalleryRef = useRef(null);

  useEffect(() => {
    loadStay();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [stayId]);

  async function loadStay() {
    try {
      dispatch({ type: LOADING_START });
      const stay = await stayService.getById(stayId);
      setCurrStay(stay);
    } catch (err) {
      console.log("Had issues in stay details", err);
      showErrorMsg("Cannot load stay");
      navigate("/");
    } finally {
      dispatch({ type: LOADING_DONE });
    }
  }

  function handleCheckoutSubmit(formData) {
    const orderDetails = {
      ...formData,
      stay: {
        _id: currStay._id,
        name: currStay.name,
        price: currStay.price,
        imgUrls: currStay.imgUrls,
        reviews: currStay.reviews,
        type: currStay.roomType,
        summary: currStay.summary,
        nights: formData.nights,
      },
      hostId: currStay.host._id,
      hostName: currStay.host.fullname,
    };

    dispatch(getActionStageOrder(orderDetails));
    showSuccessMsg("Order details saved");
    navigate("/order/confirm");
  }

  if (isLoading) {
    return (
      // <StayLoader />
      <PropagateLoader
        color={"#ff385c"}
        className="loader"
        speedMultiplier={0.8}
      />
    );
  }

  if (!currStay) return <div className="main-layout">No stay found</div>;

  const {
    name,
    type,
    bedrooms,
    beds,
    bathrooms,
    roomType,
    imgUrls,
    price,
    summary,
    capacity,
    amenities,
    labels,
    host,
    loc,
    reviews,
    likedByUsers,
  } = currStay;

  return (
    <section
      className={
        isMobile ? "stay-details" : "main-layout stayDetails stay-details"
      }
    >
      <StayHeader
        name={name}
        imgUrls={imgUrls}
        loc={loc}
        host={host}
        reviews={reviews}
        stayGalleryRef={stayGalleryRef}
      />
      <div
        className={
          isMobile ? "main-layout small stay-details-desc" : "stay-details-desc"
        }
      >
        <StayDescription
          type={type}
          summary={summary}
          reviews={reviews}
          price={price}
          host={host}
          loc={loc}
          bedrooms={bedrooms}
          beds={beds}
          bathrooms={bathrooms}
          capacity={capacity}
          roomType={roomType}
          name={name}
          amenities={amenities}
          onSubmit={handleCheckoutSubmit}
          stayGalleryRef={stayGalleryRef}
        />
      </div>
      <StayReviews data={currStay.reviews} />
      <StayMap loc={loc} />
    </section>
  );
}
