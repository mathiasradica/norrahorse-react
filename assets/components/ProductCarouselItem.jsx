import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ProductCarouselItem = ({ product }) => {
  
  let history = useHistory()

  useEffect( () => $('.card-btn, .card-title, .img-fluid').click(event => {
    let _product = JSON.parse(event.target.id)
    history.push({pathname: _product.url, state: _product})
  }), [])
  
  return (
    <div className="carousel-item" style={{ cursor: "pointer" }}>
      <div className="col">
        <div className="card">
          <div className="card-img d-flex justify-content-center">
            <img
              style={{ height: "150px" }}
              src={product.imageUrl}
              className="img-fluid"
              id={JSON.stringify(product)}
            />
          </div>
          <div className="card-body d-flex flex-column">
            <h5 id={JSON.stringify(product)} style={{ color: "#5f5f5f" }} className="card-title text-center">
              {product.title}
            </h5>
            <div className="price-box d-flex justify-content-between align-items-center">
              <span
                style={{ color: "#5f5f5f" }}
                className={`fs-5 price ${product.url}`}
              ></span>
              <span
                style={{ fontSize: "x-small" }}
                className={`text-muted vat ${product.url}`}
              ></span>
            </div>
              <div className="btn-box d-flex align-items-end">
                <span id={JSON.stringify(product)} style={{ textDecoration: "none" }} className="card-btn">
                    Lue lisää
                </span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCarouselItem;
