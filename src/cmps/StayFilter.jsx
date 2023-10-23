import React from "react";
import { LabelsCarousel } from "./LabelsCarousel";
import { useState } from "react";
import { useEffect } from "react";
import { set } from "date-fns";
import { is } from "date-fns/locale";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export function StayFilter() {
  const [paddingTop, setPaddingTop] = useState(15);
  const [paddingBottom, setPaddingBottom] = useState(15);
  const [boxShadow, setBoxShadow] = useState("none");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filterModal, setFilterModal] = useState(false);
  const [rangeValues, setRangeValues] = useState([0, 100]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        setFilterModal(false);
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
          setFilterModal(false);
        }
      });
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setPaddingTop(10);
      setPaddingBottom(10);
      setBoxShadow("rgb(0 0 0 / 16%) 0 0 6px");
    } else {
      setPaddingTop(15);
      setBoxShadow("none");
    }
  };

  function onLabelClick(label) {
    console.log(label);
  }

  function onSliderChange(value) {
    console.log(value);
    setRangeValues(value);
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
            <button
              className="filters-btn"
              onClick={() => {
                setFilterModal(!filterModal);
              }}
            >
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
      {filterModal && (
        <section className="filter-modal-container">
          <div className="filter-modal">
            <div className="filter-modal-header">
              <div
                className="close-btn"
                onClick={() => {
                  setFilterModal(false);
                }}
              >
                &#10005;
              </div>
              <div className="filter-modal-title">Filters</div>
              <div></div>
            </div>
            <div className="filter-modal-body">
              <div className="price-range">
                <div className="price-range-title">Price range</div>
                <div className="price-range-slider-container">
                  <Slider
                    range
                    className="price-range-slider"
                    min={0}
                    max={1500}
                    defaultValue={[0, 1000]}
                    trackStyle={{ backgroundColor: "black", height: "2px" }}
                    handleStyle={{
                      backgroundColor: "white",
                      border: "none",
                      backgroundColor: "white",
                      opacity: "1",
                      outline: "none",
                      boxShadow: "0 0 6px rgb(0 0 0 / 16%)",
                      width: "20px",
                      height: "20px",
                      marginTop: "-9px",
                    }}
                    railStyle={{ backgroundColor: "#e4e4e4", height: "2px" }}
                    onChange={onSliderChange}
                  />
                </div>
                <div className="price-range-inputs">
                  <div className="price-range-input">
                    <label htmlFor="min">Minimum</label>
                    <div className="input-container flex align-center">
                      <span>$</span>
                      <input
                        type="text"
                        placeholder="Min"
                        id="min"
                        value={rangeValues[0]}
                      />
                    </div>
                  </div>
                  <div className="price-range-divider"></div>
                  <div className="price-range-input">
                    <label htmlFor="max">Maximum</label>
                    <div className="input-container flex align-center">
                      <span>$</span>
                      <input
                        type="text"
                        placeholder="Max"
                        id="max"
                        value={rangeValues[1]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-modal-footer">
              <div className="clear-btn">Clear all</div>
              <div className="search-btn">
                <button className="filter-modal-btn">Show 2 places</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
}
