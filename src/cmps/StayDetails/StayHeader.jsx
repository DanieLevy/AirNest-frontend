import ImageGallery from "react-image-gallery"
import { DetailsImages } from "./DetailsImages"
import { BiHeart } from "react-icons/bi"
import { useState } from "react"
import { useEffect } from "react"
import React from "react"

import { GoShare } from "react-icons/go"
import { PiUploadSimpleLight } from "react-icons/pi"
import { PiHeartLight } from "react-icons/pi"
import { PiArrowLeftLight } from "react-icons/pi"
import { useNavigate } from "react-router"

export function StayHeader({
  name,
  imgUrls,
  // reviews,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <React.Fragment>
      {!isMobile && (
        <div className="stay-header">
          <div className="stay-header-top flex">
            <h1 className="name-title">{name}</h1>
            <div className="details-action-buttons flex">
              <div>
                <button className="share-btn flex align-center">
                  <GoShare /> Share
                </button>
              </div>
              <div>
                <button className="save-btn flex align-center">
                  <BiHeart /> Save
                </button>
              </div>
            </div>
          </div>
          <DetailsImages urls={imgUrls} />
        </div>
      )}
      {isMobile && (
        <div className="stay-header-mobile">
          <ImageGallery
            items={imgUrls.map((url) => ({ original: url, thumbnail: url }))}
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={false}
            showNav={true}
            autoPlay={false}
            slideDuration={500}
            slideInterval={3000}
          />
          <div className="stay-header-buttons">
            <button className="back-btn flex align-center"
              onClick={() => navigate(-1)}
            >
              <PiArrowLeftLight />
            </button>
            <div className="action-btns flex">
              <button className="share-btn flex align-center">
                <PiHeartLight />
              </button>
              <button className="save-btn flex align-center">
                <PiUploadSimpleLight />
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

{
  /* <div className="details-action-buttons flex">
<div>
  <button className="share-btn flex align-center">
    <GoShare /> Share
  </button>
</div>
<div>
  <button className="save-btn flex align-center">
    <BiHeart /> Save
  </button>
</div>
</div> */
}
