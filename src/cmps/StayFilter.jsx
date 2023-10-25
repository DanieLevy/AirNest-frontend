import React from "react";
import { LabelsCarousel } from "./LabelsCarousel";
import { useState } from "react";
import { useEffect } from "react";
import { min, set } from "date-fns";
import { is } from "date-fns/locale";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useSearchParams } from "react-router-dom";
import { QUERY_KEYS } from "../services/util.service";

export function StayFilter() {
  const [paddingTop, setPaddingTop] = useState(15);
  const [paddingBottom, setPaddingBottom] = useState(15);
  const [boxShadow, setBoxShadow] = useState("none");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filterModal, setFilterModal] = useState(false);
  const [inputBoxShadow1, setInputBoxShadow1] = useState(
    "inset 0 0 0 1px #b0b0b0"
  );
  const [inputBoxShadow2, setInputBoxShadow2] = useState(
    "inset 0 0 0 1px #b0b0b0"
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [selectedBedrooms, setSelectedBedrooms] = useState("Any");
  const [selectedBeds, setSelectedBeds] = useState("Any");
  const [selectedBathrooms, setSelectedBathrooms] = useState("Any");
  const [selectedAmmenties, setSelectedAmmenties] = useState([]);


  useEffect(() => {
    const minPrice = +(searchParams.get(QUERY_KEYS.minPrice) || 0)
    const maxPrice = +(searchParams.get(QUERY_KEYS.maxPrice) || 1500)
    const bedrooms = (+searchParams.get(QUERY_KEYS.bedrooms) || 'Any')
    const beds = (+searchParams.get(QUERY_KEYS.beds) || 'Any')
    const bathrooms = (+searchParams.get(QUERY_KEYS.bathrooms) || 'Any')
    const amenities = ([searchParams.get(QUERY_KEYS.amenities)] || selectedAmmenties)

    setMinPrice(minPrice)
    setMaxPrice(maxPrice)
    setSelectedBedrooms(bedrooms)
    setSelectedBeds(beds)
    setSelectedBathrooms(bathrooms)
    setSelectedAmmenties(amenities)
  }, [searchParams])

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


  }, [
    minPrice,
    maxPrice,
    selectedBedrooms,
    selectedBeds,
    selectedBathrooms,
    selectedAmmenties,
  ]);

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
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    searchParams.set(QUERY_KEYS.minPrice, minPrice)
    if (maxPrice) searchParams.set(QUERY_KEYS.maxPrice, maxPrice)
    if (selectedBedrooms) searchParams.set(QUERY_KEYS.bedrooms, selectedBedrooms)
    if (selectedBeds) searchParams.set(QUERY_KEYS.beds, selectedBeds)
    if (selectedBathrooms) searchParams.set(QUERY_KEYS.bathrooms, selectedBathrooms)
    if (selectedAmmenties.length) searchParams.set(QUERY_KEYS.amenities, selectedAmmenties)

    if (searchParams.has(QUERY_KEYS.bedrooms) && selectedBedrooms === 'Any') searchParams.delete(QUERY_KEYS.bedrooms)
    if (searchParams.has(QUERY_KEYS.beds) && selectedBeds === 'Any') searchParams.delete(QUERY_KEYS.beds)
    if (searchParams.has(QUERY_KEYS.bathrooms) && selectedBathrooms === 'Any') searchParams.delete(QUERY_KEYS.bathrooms)

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
              style={
                appliedFilters.length > 0
                  ? { border: "2px solid #222222" }
                  : { border: "1px solid #b0b0b0" }
              }
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
        style={
          filterModal
            ? { transform: "translateY(0)", backgroundColor: "rgba(0,0,0,0.5)" }
            : {
              transform: "translateY(100%)",
              backgroundColor: "rgba(0,0,0,0)",
            }
        }
      >
        <form className="filter-by-form" onSubmit={handleSubmit}>
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
                    defaultValue={[minPrice, maxPrice]}
                    value={[minPrice, maxPrice]}
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
                          className={`details-btn ${selectedBedrooms.toString() === label ? "selected" : ""
                            }`}
                          onClick={() => {
                            if (label === "Any") {
                              setSelectedBedrooms("Any");
                            } else {
                              setSelectedBedrooms(parseInt(label));
                            }
                          }}
                        >
                          <span>{label === '8' ? '8+' : label}</span>
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
                          className={`details-btn ${selectedBeds.toString() === label ? "selected" : ""
                            }`}
                          onClick={() => {
                            if (label === "Any") {
                              setSelectedBeds("Any");
                            } else {
                              setSelectedBeds(parseInt(label));
                            }
                          }}
                        >
                          <span>{label === '8' ? '8+' : label}</span>
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
                          className={`details-btn ${selectedBathrooms.toString() === label
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
                          <span>{label === '8' ? '8+' : label}</span>
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="stay-ammenities">
                <div className="stay-ammenities-title">Amenities</div>
                <div className="ammenities-section-title">
                  <span>Essentials</span>
                </div>
                <div className="ammenities-section">
                  <div className="ammenities-input">
                    <input
                      type="checkbox"
                      id="wifi"
                      name="wifi"
                      onChange={handleCheckboxChange}
                      checked={selectedAmmenties.includes("wifi")}
                    />
                    <label htmlFor="wifi">Wifi</label>
                  </div>
                  <div className="ammenities-input">
                    <input
                      type="checkbox"
                      id="washer"
                      name="washer"
                      onChange={handleCheckboxChange}
                      checked={selectedAmmenties.includes("washer")}
                    />
                    <label htmlFor="washer">Washer</label>
                  </div>
                  <div className="ammenities-input">
                    <input
                      type="checkbox"
                      id="air-conditioning"
                      name="air-conditioning"
                      onChange={handleCheckboxChange}
                      checked={selectedAmmenties.includes("air-conditioning")}
                    />
                    <label htmlFor="air-conditioning">Air conditioning</label>
                  </div>
                  <div className="ammenities-input">
                    <input
                      type="checkbox"
                      id="dedicated-workspace"
                      name="dedicated-workspace"
                      onChange={handleCheckboxChange}
                      checked={selectedAmmenties.includes(
                        "dedicated-workspace"
                      )}
                    />
                    <label htmlFor="dedicated-workspace">
                      Dedicated workspace
                    </label>
                  </div>
                  <div className="ammenities-input">
                    <input
                      type="checkbox"
                      id="hair-dryer"
                      name="hair-dryer"
                      onChange={handleCheckboxChange}
                      checked={selectedAmmenties.includes("hair-dryer")}
                    />
                    <label htmlFor="hair-dryer">Hair dryer</label>
                  </div>
                  <div className="ammenities-input">
                    <input
                      type="checkbox"
                      id="kitchen"
                      name="kitchen"
                      onChange={handleCheckboxChange}
                      checked={selectedAmmenties.includes("kitchen")}
                    />
                    <label htmlFor="kitchen">Kitchen</label>
                  </div>
                  <div className="ammenities-input">
                    <input
                      type="checkbox"
                      id="dryer"
                      name="dryer"
                      onChange={handleCheckboxChange}
                      checked={selectedAmmenties.includes("dryer")}
                    />
                    <label htmlFor="dryer">Dryer</label>
                  </div>
                  <div className="ammenities-input">
                    <input
                      type="checkbox"
                      id="heating"
                      name="heating"
                      onChange={handleCheckboxChange}
                      checked={selectedAmmenties.includes("heating")}
                    />
                    <label htmlFor="heating">Heating</label>
                  </div>
                  <div className="ammenities-input">
                    <input
                      type="checkbox"
                      id="tv"
                      name="tv"
                      onChange={handleCheckboxChange}
                      checked={selectedAmmenties.includes("tv")}
                    />
                    <label htmlFor="tv">TV</label>
                  </div>
                  <div className="ammenities-input">
                    <input
                      type="checkbox"
                      id="iron"
                      name="iron"
                      onChange={handleCheckboxChange}
                      checked={selectedAmmenties.includes("iron")}
                    />
                    <label htmlFor="iron">Iron</label>
                  </div>
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
                }}
              >
                Clear all
              </div>
              <div className="search-btn">
                <button
                  type="submit"
                  className="filter-modal-btn"
                  onClick={() => {
                    setFilterModal(false);
                    console.log('btn submit clicked ');
                  }}
                >
                  Show 2 places
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
}
