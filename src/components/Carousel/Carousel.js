import React, { useState } from "react";
import "./Carousel.css";
import img1 from "../../assets/medisure-logo.jpg";
import img2 from "../../assets/product1.jpeg";
import img3 from "../../assets/product2.jpeg";
import img4 from "../../assets/product3.jpeg";
import img5 from "../../assets/product7.jpg";
import img6 from "../../assets/product9.jpg"
import logomedisure from '../../assets/medisure-logo.jpg'
import Test from "../Home/Test";
import Test2 from "../Home/Test2";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? 2 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === 5 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-interval="2000"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className={`carousel-item ${activeIndex === 0 ? "active" : ""}`}>
          <img
            src={img1}
            className="d-block w-75 mx-auto img-style  img-container"
            alt="logo1"
          />
          <div className="para-style ">
            <h1><Test2 /></h1>

            <h3><Test /></h3>
          </div>
          
        </div>
        <div className={`carousel-item ${activeIndex === 1 ? "active" : ""}`}>
          <img
            src={img2}
            className="d-block w-75 mx-auto img-style  img-container"
            alt="first-img"
          />
          <div className="merketed d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
            <div>
            <img src={logomedisure} alt="medisure logo" className="logo-carousel2" />
            </div>
            <div>
            <h4 className="fw-bold">Marketed by: MEDISURE PHARMA</h4>
            </div>
          </div>
          
        </div>

        <div className={`carousel-item ${activeIndex === 2 ? "active" : ""}`}>
          <img
            src={img3}
            className="d-block w-75 mx-auto img-style  img-container"
            alt="second-img"
          />
          <div className="merketed d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
            <div>
            <img src={logomedisure} alt="medisure logo" className="logo-carousel2" />
            </div>
            <div>
            <h4  className="fw-bold">Marketed by: MEDISURE PHARMA</h4 >
            </div>
          </div>
          
        </div>
        
        <div className={`carousel-item ${activeIndex === 3 ? "active" : ""}`}>
          <img
            src={img4}
            className="d-block w-75 mx-auto img-style  img-container"
            alt="third-img"
          />
          <div className="merketed d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
            <div>
            <img src={logomedisure} alt="medisure logo" className="logo-carousel2" />
            </div>
            <div>
            <h4  className="fw-bold">Marketed by: MEDISURE PHARMA</h4 >
            </div>
          </div>
          
        </div>
        

        <div className={`carousel-item ${activeIndex === 4 ? "active" : ""}`}>
          <img
            src={img5}
            className="d-block w-75 mt-2 mx-auto img-style  img-container"
            alt="fourth-img"
          />
          <div className="merketed-fourth d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
            <div>
            <img src={logomedisure} alt="medisure logo" className="logo-carousel2" />
            </div>
            <div>
            <h4  className="fw-bold">Marketed by: MEDISURE PHARMA</h4 >
            </div>
          </div>
        </div>
        

        <div className={`carousel-item ${activeIndex === 5 ? "active" : ""}`}>
          <img
            src={img6}
            className="d-block w-75 mt-2 mx-auto img-style  img-container"
            alt="fifth-img"
          />
          <div className="merketed-fifth d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
            <div>
            <img src={logomedisure} alt="medisure logo" className="logo-carousel2 border" />
            </div>
            <div>
            <h4  className="fw-bold">Marketed by: MEDISURE PHARMA</h4 >
            </div>
          </div>
          
        </div>


      </div>
      <button
        className="carousel-control-prev "
        type="button"
        onClick={handlePrev}
      >
        <span
          className="carousel-control-prev-icon carousel-button"
          aria-hidden="true"
        />
        <span className="visually-hidden ">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={handleNext}
      >
        <span
          className="carousel-control-next-icon carousel-button"
          aria-hidden="true"
        />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
