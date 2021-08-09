import React, { useEffect, useRef } from "react";
import ProductCarouselItem from "./ProductCarouselItem";
import { handleNextLink, myFunction } from "../app";
import {loadProducts} from '../app'

const ProductCarousel = ({products}) => {

  const nextLink = useRef(null)
  const previousLink = useRef(null)

  function handlePreviousClick(){

    nextLink.current.classList.remove("disabled")
    previousLink.current.blur()
  }

  function handleNextClick(){

    handleNextLink(nextLink.current)
    nextLink.current.blur()
  }

  useEffect(() => {

      loadProducts(products)
      myFunction()
  }, [])
  
  return (
    <div className="row mx-auto my-auto justify-content-center mt-5">
      <div
        id="productCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="false"
        data-bs-wrap="false"
      >
        <div className="carousel-inner">
          {(() => {
            
            if (products) {
              
              return products.map((product, index) => <ProductCarouselItem product={product} key={index} />)
            }
          })()}
        </div>

        <a
          href="#productCarousel"
          className="carousel-control-prev bg-transparent"
          data-bs-slide="prev"
          role="button"
          onClick={handlePreviousClick}
          tabIndex={-1}
          ref={previousLink}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </a>
        <div>
          <a
            href="#productCarousel"
            className="carousel-control-next bg-transparent"
            data-bs-slide="next"
            role="button"
            onClick={handleNextClick}
            tabIndex={-1}
            ref={nextLink}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default ProductCarousel;
