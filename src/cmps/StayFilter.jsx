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
  const [inputBoxShadow1, setInputBoxShadow1] = useState(
    "inset 0 0 0 1px #b0b0b0"
  );
  const [inputBoxShadow2, setInputBoxShadow2] = useState(
    "inset 0 0 0 1px #b0b0b0"
  );

  const [selectedBedrooms, setSelectedBedrooms] = useState("Any");
  const [selectedBeds, setSelectedBeds] = useState("Any");
  const [selectedBathrooms, setSelectedBathrooms] = useState("Any");

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

      <section
        className="filter-modal-container"
        style={
          filterModal
            ? { transform: "translateY(0)", backgroundColor: "rgba(0,0,0,0.5)" }
            : {
                transform: "translateY(100%)",
                backgroundColor: "rgba(0,0,0,0)",
              }
        }
      >
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
                <div
                  className="price-range-input"
                  style={{ boxShadow: inputBoxShadow1 }}
                >
                  <label htmlFor="min">Minimum</label>
                  <div className="input-container flex align-center">
                    <span>$</span>
                    <input
                      type="text"
                      placeholder="Min"
                      id="min"
                      value={rangeValues[0]}
                      onFocus={() => {
                        setInputBoxShadow1("inset 0 0 0 2px #222");
                      }}
                      onBlur={() => {
                        setInputBoxShadow1("inset 0 0 0 1px #b0b0b0");
                      }}
                    />
                  </div>
                </div>
                <div className="price-range-divider"></div>
                <div
                  className="price-range-input"
                  style={{ boxShadow: inputBoxShadow2 }}
                >
                  <label htmlFor="max">Maximum</label>
                  <div className="input-container flex align-center">
                    <span>$</span>
                    <input
                      type="text"
                      placeholder="Max"
                      id="max"
                      value={rangeValues[1]}
                      onFocus={() => {
                        setInputBoxShadow2("inset 0 0 0 2px #222");
                      }}
                      onBlur={() => {
                        setInputBoxShadow2("inset 0 0 0 1px #b0b0b0");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
              <div className="stay-details">
                <div className="stay-details-title">Rooms and beds</div>
                <div className="details-title">Bedrooms</div>
                <div className="details-inputs">
                  {["Any", "1", "2", "3", "4", "5", "6", "7", "8+"].map(
                    (label) => (
                      <div className="details-input" key={label}>
                        <button
                          className={`details-btn ${
                            selectedBedrooms === label ? "selected" : ""
                          }`}
                          onClick={() => {
                            console.log(label);
                            setSelectedBedrooms(label);
                          }}
                        >
                          <span>{label}</span>
                        </button>
                      </div>
                    )
                  )}
                </div>

                <div className="details-title">Beds</div>
                <div className="details-inputs">
                  {["Any", "1", "2", "3", "4", "5", "6", "7", "8+"].map(
                    (label) => (
                      <div className="details-input" key={label}>
                        <button
                          className={`details-btn ${
                            selectedBeds === label ? "selected" : ""
                          }`}
                          onClick={() => {
                            console.log(label);
                            setSelectedBeds(label);
                          }}
                        >
                          <span>{label}</span>
                        </button>
                      </div>
                    )
                  )}
                </div>

                <div className="details-title">Bathrooms</div>
                <div className="details-inputs">
                  {["Any", "1", "2", "3", "4", "5", "6", "7", "8+"].map(
                    (label) => (
                      <div className="details-input" key={label}>
                        <button
                          className={`details-btn ${
                            selectedBathrooms === label ? "selected" : ""
                          }`}
                          onClick={() => {
                            console.log(label);
                            setSelectedBathrooms(label);
                          }}
                        >
                          <span>{label}</span>
                        </button>
                      </div>
                    )
                  )}
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
    </React.Fragment>
  );
}
