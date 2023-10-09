import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

export function LabelsCarousel({ onLabelClick }) {
  const labels = [
    {
      img: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
      name: "OMG!",
    },
    {
      img: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
      name: "Farms",
    },
    {
      img: "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
      name: "Luxe",
    },
    {
      img: "https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg",
      name: "Caves",
    },
    {
      img: "https://a0.muscache.com/pictures/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg",
      name: "Skiing",
    },
    {
      img: "https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg",
      name: "Play",
    },
    {
      img: "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
      name: "Trending",
    },
    {
      img: "https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg",
      name: "New",
    },
    {
      img: "https://a0.muscache.com/pictures/a6dd2bae-5fd0-4b28-b123-206783b5de1d.jpg",
      name: "Desert",
    },
    {
      img: "https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
      name: "Surfing",
    },
    {
      img: "https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg",
      name: "Camping",
    },
    {
      img: "https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
      name: "Artic",
    },
    {
      img: "https://a0.muscache.com/pictures/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg",
      name: "Campers",
    },
    {
      img: "https://a0.muscache.com/pictures/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg",
      name: `Chef's kitchens`,
    },
    {
      img: "https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg",
      name: "Lake",
    },
    {
      img: "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
      name: "Amazing Pools",
    },
    {
      img: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
      name: "Amazing Views",
    },
    {
      img: "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
      name: "National Parks",
    },
  ]

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },   
        items: 8
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 8
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 8
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 8
    }
  }

  const item = (label) => {
    return (
      <div
        className="label"
        key={label}
        onClick={() => onLabelClick(label.name)}
      >
        <img src={label.img} alt={label.name} />
        <p>{label.name}</p>
      </div>
    )
  }

  return (
    <Carousel
    //   swipeable={true}
      draggable={false}
      transitionDuration={1}
      containerClass="carousel-container"
      responsive={responsive}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item"
      className="labels-carousel"
    //   rewindWithAnimation={true}
      centerMode={true}
    >
      {labels.map((label) => item(label))}
      {labels.map((label) => item(label))}
      {labels.map((label) => item(label))}
    </Carousel>
  )
}
