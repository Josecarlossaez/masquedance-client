import React, { useState, useEffect } from "react";
import "../../css/track/carousel.css"
import rightArrow from "../../images/right-arrow.svg"
import leftArrow from "../../images/left-arrow.svg"

function Carousel({ track }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const interval = 30000;

  // Función para avanzar al siguiente índice
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === track.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para retroceder al índice anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? track.length - 1 : prevIndex - 1
    );
  };

  // Función para avanzar al siguiente índice después de un intervalo de tiempo
  useEffect(() => {
    const intervalId = setInterval(nextSlide, interval);
    return () => clearInterval(intervalId);
  }, [currentIndex, interval]);

  return (
    <div className="carousel" style={{ position: "relative", overflow: "hidden" }}>
      {track.map((item, index) => (
        <img
          key={index}
          src={item.picture}
          alt={`Slide ${index}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            left: index === currentIndex ? "0" : "-100%",
            zIndex: index === currentIndex ? 1 : 0,
            transition: "left 0.5s ease-in-out",
          }}
        />
      ))}
      <button onClick={prevSlide} style={{ position: "absolute", top: "50%", left: "10px", zIndex: "1" }}>
        <img src={leftArrow} alt="" />
      </button>
      <button onClick={nextSlide} style={{ position: "absolute", top: "50%", right: "10px", zIndex: "1" }}>
        <img src={rightArrow} alt="" />
      </button>
    </div>
  );
}

export default Carousel;
