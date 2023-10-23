import React from "react"
import { LabelsCarousel } from "./LabelsCarousel"
import { useState } from "react"
import { useEffect } from "react"
import { set } from "date-fns"
import { is } from "date-fns/locale"

export function StayFilter() {
  const [paddingTop, setPaddingTop] = useState(15)
  const [paddingBottom, setPaddingBottom] = useState(15)
  const [boxShadow, setBoxShadow] = useState("none")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener("scroll", handleScroll)


    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener("scroll", handleScroll)

    };
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setPaddingTop(10)
      setPaddingBottom(10)
      setBoxShadow("rgb(0 0 0 / 16%) 0 0 6px")
    } else {
      setPaddingTop(15)
      setBoxShadow("none")
    }
  }

  function onLabelClick(label) {
    console.log(label)
  }

  return (
    <React.Fragment>
      <section className="filter-by">
        <section
          className="main-layout header-content"
          style={{
            paddingTop: `${paddingTop}px`,
            boxShadow: `${boxShadow}`,
            paddingBottom: `${paddingBottom}px`,
          }}
        >
          <LabelsCarousel onLabelClick={onLabelClick} />
          {!isMobile && (
          <button className="filters-btn">
            <div className="flex align-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg">
                <path d="M5 8a3 3 0 0 1 2.83 2H14v2H7.83A3 3 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.83 4H2V4h6.17A3 3 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
              </svg>
              <span>Filters</span>
            </div>
          </button>
          )}
        </section>
      </section>
    </React.Fragment>
  )
}
