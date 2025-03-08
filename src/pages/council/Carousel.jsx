import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CarouselComponent.css"; // For custom styles

const CarouselComponent = ({media}) => {
  return (
    <Carousel
      infiniteLoop
      useKeyboardArrows
      showThumbs={false}
      showIndicators={true}
      showStatus={false}
      autoPlay
      interval={5000}
    //   dynamicHeight
    >
      {media.map((item, index) => (
        <div key={index} className="carousel-item">
          {item.type === "image" ? (
            <img src={item.src} alt={item.alt} />
          ) : (
            <video controls>
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
