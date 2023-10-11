import { DetailsImages } from "./DetailsImages"
import { GoShare } from "react-icons/go"
import { BiHeart } from "react-icons/bi"

export function StayHeader({
  name,
  imgUrls,
  // reviews,
}) {
  return (
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
  )
}
