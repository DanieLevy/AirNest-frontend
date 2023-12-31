import React, { useRef } from "react";
import { LabelsCarousel } from "./LabelsCarousel";
import { useState } from "react";
import { useEffect } from "react";
import { min, set } from "date-fns";
import { is } from "date-fns/locale";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useSearchParams } from "react-router-dom";
import { QUERY_KEYS } from "../services/util.service";
import { useSelector } from "react-redux";
import { filterStays, getResultLength } from "../store/actions/stay.actions";
import { IoMdCheckmark } from "react-icons/io";
import { PropertyFilter } from "./PropertyFilter";
import { store } from "../store/store";

export function StayFilter() {
  const [paddingTop, setPaddingTop] = useState(5);
  // const [paddingBottom, setPaddingBottom] = useState(15);
  const [boxShadow, setBoxShadow] = useState("none");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const filterModal = useSelector(
    (storeState) => storeState.userModule.filterModal
  );
  const [inputBoxShadow1, setInputBoxShadow1] = useState(
    "inset 0 0 0 1px #b0b0b0"
  );
  const [inputBoxShadow2, setInputBoxShadow2] = useState(
    "inset 0 0 0 1px #b0b0b0"
  );

  const stays = useSelector((storeState) => storeState.stayModule.stays);

  const [searchParams, setSearchParams] = useSearchParams();
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [selectedBedrooms, setSelectedBedrooms] = useState("Any");
  const [selectedBeds, setSelectedBeds] = useState("Any");
  const [selectedBathrooms, setSelectedBathrooms] = useState("Any");
  const [selectedAmmenties, setSelectedAmmenties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [resultLength, setResultLength] = useState(stays.length);
  const backdropRef = useRef(null);

  const amenities = [
    {
      title: "wifi",
      txt: "Wifi",
    },
    {
      title: "washer",
      txt: "Washer",
    },
    {
      title: "air-conditioning",
      txt: "Air conditioning",
    },
    {
      title: "dedicated-workspace",
      txt: "Dedicated workspace",
    },
    {
      title: "hair-dryer",
      txt: "Hair dryer",
    },
    {
      title: "kitchen",
      txt: "Kitchen",
    },
    {
      title: "dryer",
      txt: "Dryer",
    },
    {
      title: "heating",
      txt: "Heating",
    },
    {
      title: "tv",
      txt: "TV",
    },
    {
      title: "iron",
      txt: "Iron",
    },
  ];

  useEffect(() => {
    showResultLength();
  }, [stays.length]);

  useEffect(() => {
    const minPrice = +(searchParams.get(QUERY_KEYS.minPrice) || 0);
    const maxPrice = +(searchParams.get(QUERY_KEYS.maxPrice) || 1500);
    const bedrooms = +searchParams.get(QUERY_KEYS.bedrooms) || "Any";
    const beds = +searchParams.get(QUERY_KEYS.beds) || "Any";
    const bathrooms = +searchParams.get(QUERY_KEYS.bathrooms) || "Any";
    const properties = searchParams.get(QUERY_KEYS.properties)
      ? searchParams.get(QUERY_KEYS.properties).split(",")
      : [];
    const amenities = searchParams.get(QUERY_KEYS.amenities)
      ? searchParams.get(QUERY_KEYS.amenities).split(",")
      : [];

    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setSelectedBedrooms(bedrooms);
    setSelectedBeds(beds);
    setSelectedBathrooms(bathrooms);
    setSelectedAmmenties(amenities);
    setSelectedProperties(properties);

    filterStays(stays, searchParams);
  }, [searchParams, stays.length]);

  function handleFilterModal(action = "close") {
    store.dispatch({
      type: "SET_FILTER_MODAL",
      filterModal: action === "open" ? true : false,
    });
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleBackdropClick = (event) => {
      if (event.target === backdropRef.current) {
        handleFilterModal("close");
      }
    };
    document.addEventListener("click", handleBackdropClick);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        handleFilterModal("close");
      }
    });

    return () => {
      document.removeEventListener("click", handleBackdropClick);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
          handleFilterModal("close");
        }
      });
    };
  }, []);

  useEffect(() => {
    if (minPrice !== 0 || maxPrice !== 1500) {
      setAppliedFilters((prevAppliedFilters) => {
        if (prevAppliedFilters.includes("Price")) {
          return prevAppliedFilters;
        } else {
          return [...prevAppliedFilters, "Price"];
        }
      });
    } else {
      setAppliedFilters((prevAppliedFilters) => {
        return prevAppliedFilters.filter((filter) => filter !== "Price");
      });
    }

    if (selectedBedrooms !== "Any") {
      setAppliedFilters((prevAppliedFilters) => {
        if (prevAppliedFilters.includes("Bedrooms")) {
          return prevAppliedFilters;
        } else {
          return [...prevAppliedFilters, "Bedrooms"];
        }
      });
    } else {
      setAppliedFilters((prevAppliedFilters) => {
        return prevAppliedFilters.filter((filter) => filter !== "Bedrooms");
      });
    }

    if (selectedBeds !== "Any") {
      setAppliedFilters((prevAppliedFilters) => {
        if (prevAppliedFilters.includes("Beds")) {
          return prevAppliedFilters;
        } else {
          return [...prevAppliedFilters, "Beds"];
        }
      });
    } else {
      setAppliedFilters((prevAppliedFilters) => {
        return prevAppliedFilters.filter((filter) => filter !== "Beds");
      });
    }

    if (selectedBathrooms !== "Any") {
      setAppliedFilters((prevAppliedFilters) => {
        if (prevAppliedFilters.includes("Bathrooms")) {
          return prevAppliedFilters;
        } else {
          return [...prevAppliedFilters, "Bathrooms"];
        }
      });
    } else {
      setAppliedFilters((prevAppliedFilters) => {
        return prevAppliedFilters.filter((filter) => filter !== "Bathrooms");
      });
    }
    if (selectedProperties.length > 0) {
      setAppliedFilters((prevAppliedFilters) => {
        if (prevAppliedFilters.includes("Properties")) {
          return prevAppliedFilters;
        } else {
          return [...prevAppliedFilters, "Properties"];
        }
      });
    } else {
      setAppliedFilters((prevAppliedFilters) => {
        return prevAppliedFilters.filter((filter) => filter !== "Properties");
      });
    }
    if (selectedAmmenties.length > 0) {
      setAppliedFilters((prevAppliedFilters) => {
        if (prevAppliedFilters.includes("Ammenities")) {
          return prevAppliedFilters;
        } else {
          return [...prevAppliedFilters, "Ammenities"];
        }
      });
    } else {
      setAppliedFilters((prevAppliedFilters) => {
        return prevAppliedFilters.filter((filter) => filter !== "Ammenities");
      });
    }
    showResultLength();
  }, [
    minPrice,
    maxPrice,
    selectedBedrooms,
    selectedBeds,
    selectedBathrooms,
    selectedAmmenties,
    selectedProperties,
  ]);

  const handleScroll = () => {
    if (window.scrollY > 78) {
      setPaddingTop(0);
      setBoxShadow("rgb(228, 228, 228) 0px 0.5px 1px 0px");
    }
    if (window.scrollY <= 0) {
      setPaddingTop(5);
      setBoxShadow("none");
    }
  };

  function onLabelClick(label) {
    console.log(label);
  }

  function onSliderChange(value) {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);

    // renderBars();
  }

  async function showResultLength() {
    const filterBy = {};
    filterBy.minPrice = minPrice;
    filterBy.maxPrice = maxPrice;
    filterBy.bedrooms = selectedBedrooms;
    filterBy.beds = selectedBeds;
    filterBy.bathrooms = selectedBathrooms;
    filterBy.amenities = selectedAmmenties;
    filterBy.properties = selectedProperties;

    const resultLength = getResultLength(filterBy, stays);
    setResultLength(resultLength);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    searchParams.set(QUERY_KEYS.minPrice, minPrice);
    searchParams.set(QUERY_KEYS.maxPrice, maxPrice);
    if (selectedBedrooms)
      searchParams.set(QUERY_KEYS.bedrooms, selectedBedrooms);
    if (selectedBeds) searchParams.set(QUERY_KEYS.beds, selectedBeds);
    if (selectedBathrooms)
      searchParams.set(QUERY_KEYS.bathrooms, selectedBathrooms);
    if (selectedProperties)
      searchParams.set(QUERY_KEYS.properties, selectedProperties);
    if (selectedAmmenties)
      searchParams.set(QUERY_KEYS.amenities, selectedAmmenties);

    if (searchParams.has(QUERY_KEYS.amenities) && !selectedAmmenties.length)
      searchParams.delete(QUERY_KEYS.amenities);
    if (searchParams.has(QUERY_KEYS.bedrooms) && selectedBedrooms === "Any")
      searchParams.delete(QUERY_KEYS.bedrooms);
    if (searchParams.has(QUERY_KEYS.beds) && selectedBeds === "Any")
      searchParams.delete(QUERY_KEYS.beds);
    if (searchParams.has(QUERY_KEYS.bathrooms) && selectedBathrooms === "Any")
      searchParams.delete(QUERY_KEYS.bathrooms);
    if (searchParams.has(QUERY_KEYS.properties) && !selectedProperties.length)
      searchParams.delete(QUERY_KEYS.properties);

    setSearchParams(searchParams);
  }

  function handleCheckboxChange(ev) {
    const { name, checked } = ev.target;
    setSelectedAmmenties((prevSelectedAmmenties) => {
      if (checked) {
        return [...prevSelectedAmmenties, name];
      } else {
        return prevSelectedAmmenties.filter((ammenty) => ammenty !== name);
      }
    });
  }

  const numBars = 50;
  const priceBucketSize = (1500 - 0) / numBars;
  const barHeightPerStay = 500 / stays.length;
  const staysCopy = [...stays];
  const staysPrices = staysCopy.map((stay) => stay.price);

  function renderBars() {
    const bars = [];

    for (let i = 0; i < numBars; i++) {
      const min = i * priceBucketSize;
      const max = (i + 1) * priceBucketSize;
      const inRange = min >= minPrice && max <= maxPrice;
      if (!staysPrices.some((price) => price >= min && price <= max)) {
        bars.push(
          <div
            key={i}
            className={`bar ${inRange ? "in-range" : "out-of-range"}`}
            style={{ height: `${6}px` }}
          ></div>
        );
        continue;
      }

      const height =
        barHeightPerStay *
        staysPrices.filter((price) => price >= min && price <= max).length;
      const barHeight = Math.min(height, 108);

      bars.push(
        <div
          key={i}
          className={`bar ${inRange ? "in-range" : "out-of-range"}`}
          style={{ height: `${barHeight}px` }}
        ></div>
      );
    }

    return bars;
  }

  return (
    <React.Fragment>
      <section className="filter-by">
        <section
          className="main-layout header-content"
          style={{
            // paddingTop: `${paddingTop}px`,
            boxShadow: `${boxShadow}`,
            // paddingBottom: `${paddingBottom}px`,
          }}
        >
          <LabelsCarousel onLabelClick={onLabelClick} />
          {!isMobile && (
            <button
              className="filters-btn"
              style={
                appliedFilters.length > 0
                  ? { border: "2px solid #222222" }
                  : { border: "1px solid #b0b0b0" }
              }
              onClick={() => {
                handleFilterModal(!filterModal ? "open" : "close");
              }}
            >
              <div className="flex align-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path
                    fill="none"
                    d="M7 16H3m26 0H15M29 6h-4m-8 0H3m26 20h-4M7 16a4 4 0 1 0 8 0 4 4 0 0 0-8 0zM17 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 20a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 0H3"
                  ></path>
                </svg>
                <span>Filters</span>
              </div>
              {appliedFilters.length > 0 && (
                <div className="filters-count">
                  <span>{appliedFilters.length}</span>
                </div>
              )}
            </button>
          )}
        </section>
      </section>

      <section
        className="filter-modal-container"
        ref={backdropRef}
        style={
          filterModal
            ? {
                transform: "translateY(-46px)",
                backgroundColor: "rgba(0,0,0,0.5)",
                bottom: `47px!important`
              }
            : {
                transform: "translateY(150%)",
                backgroundColor: "rgba(0,0,0,0)",
                bottom: `-100%!important`
              }
        }
      >
        <form className="filter-by-form" onSubmit={handleSubmit}>
          <div className="filter-modal">
            <div className="filter-modal-header">
              <div
                className="close-btn"
                onClick={() => {
                  handleFilterModal("close");
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
                  <div className="price-range-bars">{renderBars()}</div>
                  <Slider
                    range
                    className="price-range-slider"
                    min={0}
                    max={1500}
                    defaultValue={[minPrice, maxPrice]}
                    value={[minPrice, maxPrice]}
                    trackStyle={{ backgroundColor: "#222222", height: "3px" }}
                    handleStyle={{
                      cursor: "pointer",
                      border: "none",
                      backgroundColor: "#fff",
                      opacity: "1",
                      outline: "rgb(219 219 219) solid 1px",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 0px 20px 2px",
                      width: "32px",
                      height: "32px",
                      marginTop: "-16px",
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
                        value={minPrice}
                        onChange={(ev) => {
                          setMinPrice(ev.target.value);
                        }}
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
                        value={maxPrice}
                        onChange={(ev) => {
                          setMaxPrice(ev.target.value);
                        }}
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
                  {["Any", "1", "2", "3", "4", "5", "6", "7", "8"].map(
                    (label) => (
                      <div className="details-input" key={label}>
                        <button
                          type="button"
                          className={`details-btn ${
                            selectedBedrooms.toString() === label
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            if (label === "Any") {
                              setSelectedBedrooms("Any");
                            } else {
                              setSelectedBedrooms(parseInt(label));
                            }
                          }}
                        >
                          <span>{label === "8" ? "8+" : label}</span>
                        </button>
                      </div>
                    )
                  )}
                </div>

                <div className="details-title">Beds</div>
                <div className="details-inputs">
                  {["Any", "1", "2", "3", "4", "5", "6", "7", "8"].map(
                    (label) => (
                      <div className="details-input" key={label}>
                        <button
                          type="button"
                          className={`details-btn ${
                            selectedBeds.toString() === label ? "selected" : ""
                          }`}
                          onClick={() => {
                            if (label === "Any") {
                              setSelectedBeds("Any");
                            } else {
                              setSelectedBeds(parseInt(label));
                            }
                          }}
                        >
                          <span>{label === "8" ? "8+" : label}</span>
                        </button>
                      </div>
                    )
                  )}
                </div>

                <div className="details-title">Bathrooms</div>
                <div className="details-inputs">
                  {["Any", "1", "2", "3", "4", "5", "6", "7", "8"].map(
                    (label) => (
                      <div className="details-input" key={label}>
                        <button
                          type="button"
                          className={`details-btn ${
                            selectedBathrooms.toString() === label
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            if (label === "Any") {
                              setSelectedBathrooms("Any");
                            } else {
                              setSelectedBathrooms(parseInt(label));
                            }
                          }}
                        >
                          <span>{label === "8" ? "8+" : label}</span>
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="stay-property">
                <div className="stay-property-title">Property Type</div>
                <PropertyFilter
                  selectedProperty={selectedProperties}
                  onPropertyChange={setSelectedProperties}
                />
              </div>

              <div className="stay-ammenities">
                <div className="stay-ammenities-title">Amenities</div>
                {/* <div className="ammenities-section-title">
                  <span>Essentials</span>
                </div> */}
                <div className="ammenities-section">
                  {amenities.map((amenity) => (
                    <div className="ammenities-input" key={amenity.title}>
                      <label htmlFor={amenity.title} className="flex">
                        <input
                          type="checkbox"
                          id={amenity.title}
                          name={amenity.title}
                          onChange={handleCheckboxChange}
                          checked={selectedAmmenties.includes(amenity.title)}
                        />
                        <div className="input-container">
                          <span
                            className={`input-icon ${
                              selectedAmmenties.includes(amenity.title)
                                ? "selected"
                                : ""
                            }`}
                          >
                            <IoMdCheckmark />
                            {selectedAmmenties.includes(amenity.title)
                              ? ""
                              : ""}
                          </span>
                          <span className="input-title">{amenity.txt}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="filter-modal-footer">
              <div
                className="clear-btn"
                onClick={() => {
                  setMinPrice(0);
                  setMaxPrice(1500);
                  setSelectedBedrooms("Any");
                  setSelectedBeds("Any");
                  setSelectedBathrooms("Any");
                  setSelectedAmmenties([]);
                  setAppliedFilters([]);
                  setSelectedProperties([]);
                }}
              >
                Clear all
              </div>
              <div className="search-btn">
                <button
                  type="submit"
                  className="filter-modal-btn"
                  onClick={() => {
                    handleFilterModal("close");
                    console.log("btn submit clicked ");
                  }}
                  disabled={!resultLength}
                >
                  {resultLength ? `Show ${resultLength} places` : "No places"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
}
