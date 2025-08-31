import React, { useState, useEffect } from "react";
import "./CarouselHandle.css";
import data from "../../data";
import {  faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CarouselHandle = () => {
  const [people] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section overflow-hidden">
      <div className="title">
        <h3 className=" fw-bold"><span className="header-1">OUR CLIENTS</span></h3>
        <h1 className="">See our happy customers </h1>
      </div>
      <div className="section-center overflow-hidden">
        {people.map((item, indexPeople) => {
          const { id, image, name, quote } = item;
          let position = "nextSlide";
          if (indexPeople === index) {
            position = "activeSlide";
          }
          if (
            indexPeople === index - 1 ||
            (index === 0 && indexPeople === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <div>
              
              <article className={position}  key={id}>
              <img src={image} alt={name} className="person-img " />
              <h3>{name}</h3>
            </article>

            </div>
          );
        })}
        {/* <button className="prev" onClick={() => setIndex(index - 1)}>
        <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="next " onClick={() => setIndex(index + 1)}>
          <i className="fas fa-arrow-right" />
          <FontAwesomeIcon icon={faChevronRight} />
        </button> */}
      </div>
    </section>
  );
};

export default CarouselHandle;
