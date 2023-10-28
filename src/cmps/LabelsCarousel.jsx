import { useEffect , useState} from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { stayService } from "../services/stay.service.local.js"

export function LabelsCarousel({ onLabelClick }) {
  const [isActive, setIsActive] = useState("Countryside")
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768)
  const labels = stayService.getCarouselLabels()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])
  const itemCount = Math.max(10, labels.length);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 18,

    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 18,

    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: itemCount,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: itemCount,
    },
  }

  // const item = (label) => {
  //   return (
  //     <div
  //       className={`label ${isActive === label.name ? "active" : ""}`}
  //       key={label}
  //       onClick={() => handleClick(label)}
  //     >
  //       <img src={label.img} alt={label.name} />
  //       <p>{label.name}</p>
  //     </div>
  //   )
  // }

  function handleClick(label) {
    console.log("label:", label)
    setIsActive(label.name)
  }

  return (
    <Carousel
      swipeable={isMobile ? true : false}
      draggable={isMobile ? true : false}
      // transitionDuration={1}
      containerClass="carousel-container"
      responsive={responsive}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item"
      className="labels-carousel"
      centerMode={true}
      slidesToSlide={7}
      // infinite={true}
      arrows={isMobile ? false : true}
      rewind={false}
      
    >
{labels.map(label => (
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
  )
}
