import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { stayService } from "../services/stay.service.local.js";
import { useSearchParams } from "react-router-dom";
import { QUERY_KEYS } from "../services/util.service.js";

export function LabelsCarousel({ onLabelClick }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [labels, setLabels] = useState([]);
  const [isActive, setIsActive] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (searchParams.has(QUERY_KEYS.label)) {
      setIsActive(searchParams.get(QUERY_KEYS.label));
    } else if (labels.length) {
      setIsActive(labels[0].name);
    }
  }, [searchParams]);

  useEffect(() => {
    const labelsFromService = stayService.getCarouselLabels();
    setLabels(labelsFromService);
    if (labelsFromService.length > 0) {
      setIsActive(
        searchParams.get(QUERY_KEYS.label) || labelsFromService[0].name
      );
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getBreakpoint = () => {
    if (windowWidth >= 3000) return "superLargeDesktop";
    if (windowWidth >= 1024) return "desktop";
    if (windowWidth >= 464) return "tablet";
    return "mobile";
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 18 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 19 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 10 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 10 },
  };

  const currentBreakpoint = getBreakpoint();
  const visibleItems = responsive[currentBreakpoint].items;
  const remainingLabels = labels.length % visibleItems;

  const handleClick = (label) => {
    setIsActive(label.name);
    searchParams.set(QUERY_KEYS.label, label.name);
    setSearchParams(searchParams);
  };

  return (
    <Carousel
      swipeable={windowWidth < 768}
      draggable={windowWidth < 768}
      containerClass="carousel-container"
      responsive={responsive}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item"
      className="labels-carousel"
      // centerMode={true}
      slidesToSlide={remainingLabels > 0 ? remainingLabels : 7}
      arrows={windowWidth >= 768}
      rewind={false}
    >
      {labels.map((label) => (
        <div
          className={`label ${isActive === label.name ? "active" : ""}`}
          key={label.name}
          onClick={() => handleClick(label)}
        >
          <img src={label.img} alt={label.name} />
          <p>{label.name}</p>
        </div>
      ))}
    </Carousel>
  );
}
