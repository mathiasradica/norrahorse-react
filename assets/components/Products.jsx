import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import NotFound from "./NotFound";

const Products = ({products, loading}) => {

  return (
    <main>
      {loading ? (
        <Loading />
      ) : products ? (
        <>
          <div className="d-lg-none p-3 bg-white">
            <Link to="/">
              <i
                className="fas fa-chevron-left"
                style={{ color: "#5f5f5f" }}
              ></i>
            </Link>
            <span
              style={{ color: "#5f5f5f", fontSize: "16px", fontWeight: "bold" }}
            >
              TUOTTEET
            </span>
          </div>

          <div className="p-4">
            <div
              style={{
                width: "calc(100% - 6px)",
                marginLeft: "3px",
                marginRight: "-3px",
              }}
              className="navigation-links p-4 bg-white d-none d-lg-block mb-1"
            >
              <div>
                <Link
                  style={{
                    color: "#5f5f5f",
                    textDecoration: "none",
                    fontSize: "12px",
                  }}
                  to="/"
                >
                  Etusivu &nbsp; / &nbsp;
                </Link>

                <span style={{ color: "#5f5f5f", fontSize: "12px" }}>
                  TUOTTEET
                </span>
              </div>
              <div
                className="pt-3"
                style={{
                  color: "#5f5f5f",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                TUOTTEET
              </div>
            </div>
            <div className="row m-0">
              {products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </main>
  );
};

export default Products;
