import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  validateReduceQuantity,
  validateIncreaseQuantity,
  validateQuantity,
  loadProduct,
  toggle,
  productFeaturesAccordionButtonClick,
  accordionButtonClick,
} from "../app";
import NotFound from "./NotFound.jsx";
import Loading from "./Loading.jsx";

const Product = ({ callback }) => {
  const location = useLocation();
  const _product = location.state;

  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (_product) {
      setProduct(_product);
      loadProduct(_product);
      setLoading(false);
    } else {
      axios
        .get(`api/product/${window.location.href.split("/").pop()}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        });
    }

    return () => {
      setProduct();
      setLoading();
    };
  }, []);

  if (loading) {
    return <Loading />;
  } else if (product) {
    return (
      <main className="main-container pb-4">
        <div className="d-none d-lg-block mb-2">
          <a
            className="align-top"
            style={{
              color: "#5f5f5f",
              textDecoration: "none",
              fontSize: "small",
            }}
            href="#"
          >
            Etusivu
          </a>
          &nbsp; / &nbsp;
          <span
            className="align-top"
            style={{
              color: "#5f5f5f",
              textDecoration: "none",
              fontSize: "small",
            }}
          >
            {product.title}
          </span>
        </div>
        <div
          className="add-cart-confirmed bg-white p-4 mb-1 d-flex justify-content-between d-none"
          style={{ fontSize: "12px", border: "1px solid green" }}
        >
          <div>
            <svg
              style={{ color: "lightgray", position: "absolute" }}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-circle-fill"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>
            <svg
              style={{ color: "green", position: "relative" }}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-check"
              viewBox="0 0 16 16"
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
            <span style={{ color: "green" }}>
              &nbsp;&nbsp;&nbsp; Lisäsit tuotteen {product.title}
            </span>
            <a
              style={{
                color: "#5f5f5f",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              href="checkout/cart"
            >
              ostoskoriisi.
            </a>
          </div>
          <Link
            to={{ pathname: product.url, state: product }}
            style={{ cursor: "pointer" }}
            onClick={() => {
              $(".add-cart-confirmed")[0].classList.add("d-none");
            }}
          >
            <svg
              style={{ color: "green" }}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </Link>
        </div>
        <div className="d-flex w-100 justify-content-between p-4 bg-white d-none d-lg-flex">
          <div style={{ paddingLeft: "100px", width: "55%" }}>
            <a href="">
              <img src={product.imageUrl} className="img-fluid w-100" />
            </a>
          </div>
          <div
            style={{ width: "45%", paddingRight: "40px" }}
            className="d-inline pt-2"
          >
            <div>
              <span style={{ color: "#5f5f5f", fontSize: "12px" }}>
                Tuotenumero &nbsp;
                {product.imageUrl.replace(".jpg", "").replace("/img/", "")}
              </span>
              <h4
                style={{ color: "#5f5f5f" }}
                className="product-title fw-bold"
              >
                {product.title.toUpperCase()}
              </h4>
            </div>
            <div className="price-box d-flex justify-content-between align-items-center">
              <span
                style={{ color: "#5f5f5f", height: "46px" }}
                className={`fs-2 fw-bold price ${product.url}`}
              ></span>
              <span
                style={{ fontSize: "x-small" }}
                className={`text-muted vat ${product.vat}`}
              ></span>
            </div>
            <hr style={{ marginTop: "6px", marginBottom: "48px" }} />
            <form
              style={{ height: "40px" }}
              className="d-flex invisible add-to-cart-form"
            >
              <input
                className="url-input"
                type="hidden"
                defaultValue={product.url}
              />
              <span
                className="quantity-change-btn text-center"
                style={{ marginRight: "10px" }}
                onClick={validateReduceQuantity}
              >
                -
              </span>
              <input
                type="number"
                defaultValue="1"
                className="quantity-input d-inline form-control text-center"
                style={{ fontSize: "12px" }}
              />
              <span
                className="quantity-change-btn text-center"
                style={{ marginLeft: "10px" }}
                onClick={validateIncreaseQuantity}
              >
                +
              </span>
              <div
                onClick={() => validateQuantity() ? callback(true):null}
                className="order-btn d-inline text-center w-100"
                style={{
                  marginLeft: "20px",
                  transition: "0.5s ease-in",
                }}
              >
                <span
                  style={{
                    lineHeight: "40px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  className={"d-flex justify-content-center"}
                >
                  Lisää ostokoriin
                  <div
                    className="order-btn-spinner-border d-none"
                    role="status"
                    style={{
                      color: "#e77110",
                      width: "20px",
                      height: "20px",
                      position: "absolute",
                    }}
                  >
                    <span className="sr-only"></span>
                  </div>
                </span>
              </div>
            </form>
            <div
              style={{ color: "green", fontSize: "12px", height: "18px" }}
              className="mt-3 in-store-box"
            >
              <i
                style={{ opacity: "0", transition: "0.5s ease-in" }}
                className="in-store-circle"
              ></i>
              <span
                style={{ opacity: "0", transition: "0.5s ease-in" }}
                className="in-store"
              ></span>
            </div>
            <div
              className="spinner-border product-details-wait-spinner-border"
              role="status"
              style={{ color: "#e77110", width: "20px", height: "20px" }}
            >
              <span className="sr-only"></span>
            </div>
            <p
              style={{ fontSize: "small", color: "#5f5f5f", marginTop: "16px" }}
            >
              {product.shortDescription}
            </p>
            <hr />

            {(() =>
              product.sellingPoints.map((sellingPoint, index) => (
                <div key={index}>
                  <div className="d-flex">
                    <div className="d-flex align-items-center">
                      <i
                        style={{ color: "#e77110", fontSize: "small" }}
                        className="fas fa-check"
                      ></i>
                    </div>
                    <div
                      style={{ fontSize: "small", color: "#5f5f5f" }}
                      className="d-inline p-1 fw-bold"
                    >
                      <span>{sellingPoint}</span>
                    </div>
                  </div>
                </div>
              )))()}

            <hr />
            <img
              style={{ width: "22px", height: "22px" }}
              className="d-inline me-1"
              src="img/facebook.jpg"
              alt=""
            />
            <img
              style={{ width: "22px", height: "22px" }}
              className="d-inline me-1"
              src="img/pinterest.jpg"
              alt=""
            />
            <img
              style={{ width: "22px", height: "22px" }}
              className="d-inline me-1"
              src="img/twitter.jpg"
              alt=""
            />
            <img
              style={{ width: "22px", height: "22px" }}
              className="d-inline"
              src="img/email.png"
              alt=""
            />
          </div>
        </div>
        <div className="md-product-container w-100 bg-white pb-4">
          <div className="pt-4 ps-3">
            <span style={{ color: "#5f5f5f", fontSize: "12px" }}>
              Tuotenumero &nbsp;
              {product.imageUrl.replace(".jpg", "").replace("/img/", "")}
            </span>
            <h4 style={{ color: "#5f5f5f" }} className="fw-bold">
              {product.title.toUpperCase()}
            </h4>
          </div>
          <div style={{ paddingLeft: "20%", paddingRight: "20%" }}>
            <a href="">
              <img src={product.imageUrl} className="img-fluid w-100" />
            </a>
          </div>
          <div style={{ paddingLeft: "20%", paddingRight: "20%" }}>
            <div
              style={{ height: "43px" }}
              className="price-box d-flex justify-content-between align-items-center"
            >
              <span
                style={{ color: "#5f5f5f" }}
                className={`fs-2 fw-bold price ${product.url}`}
              ></span>
              <span
                style={{ fontSize: "x-small" }}
                className={`text-muted vat ${product.vat}`}
              ></span>
            </div>
            <hr style={{ marginTop: "6px", marginBottom: "48px" }} />
            <form
              style={{ height: "40px" }}
              className="d-flex invisible add-to-cart-form"
            >
              <input
                className="url-input"
                type="hidden"
                defaultValue={product.url}
              />
              <span
                className="quantity-change-btn text-center"
                style={{ marginRight: "10px" }}
                onClick={(event) => validateReduceQuantity(event)}
              >
                -
              </span>
              <input
                type="number"
                defaultValue="1"
                className="quantity-input d-inline form-control text-center"
                style={{ fontSize: "12px" }}
              />
              <span
                className="quantity-change-btn text-center"
                style={{ marginLeft: "10px" }}
                onClick={(event) => validateIncreaseQuantity(event)}
              >
                +
              </span>
              <div
                onClick={() => validateQuantity() ? callback(true) : null}
                className="order-btn d-inline text-center w-100"
                style={{ marginLeft: "20px", transition: "0.5s ease-in" }}
              >
                <div
                  className="order-btn-spinner-border d-none"
                  role="status"
                  style={{ color: "#e77110", width: "20px", height: "20px" }}
                >
                  <span className="sr-only"></span>
                </div>
                <span style={{ lineHeight: "40px", cursor: "pointer" }}>
                  Lisää ostokoriin
                </span>
              </div>
            </form>
            <div
              style={{ color: "green", fontSize: "12px", height: "18px" }}
              className="mt-3 in-store-box"
            >
              <i
                style={{ opacity: "0", transition: "0.5s ease-in" }}
                className="in-store-circle"
              ></i>
              <span
                style={{ opacity: "0", transition: "0.5s ease-in" }}
                className="in-store"
              ></span>
            </div>
            <p
              style={{ fontSize: "small", color: "#5f5f5f", marginTop: "16px" }}
            >
              {product.shortDescription}
            </p>
            <hr />

            {(() =>
              product.sellingPoints.map((sellingPoint, index) => (
                <div key={index} className="d-flex">
                  <div className="d-flex align-items-center">
                    <i
                      style={{ color: "#e77110", fontSize: "small" }}
                      className="fas fa-solid fa-check"
                    ></i>
                  </div>
                  <div
                    style={{ fontSize: "small", color: "#5f5f5f" }}
                    className="d-inline p-1 fw-bold"
                  >
                    <span>{sellingPoint}</span>
                  </div>
                </div>
              )))()}

            <hr />
            <div>
              <img
                style={{ width: "22px", height: "22px" }}
                className="d-inline me-1"
                src="img/facebook.jpg"
                alt=""
              />
              <img
                style={{ width: "22px", height: "22px" }}
                className="d-inline me-1"
                src="img/pinterest.jpg"
                alt=""
              />
              <img
                style={{ width: "22px", height: "22px" }}
                className="d-inline me-1"
                src="img/twitter.jpg"
                alt=""
              />
              <img
                style={{ width: "22px", height: "22px" }}
                className="d-inline me-1"
                src="img/email.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          style={{ fontSize: "12px", color: "#5f5f5f" }}
          className="product-tab-list"
        >
          <div className="p-3 bg-white w-100 mt-2">
            <div id="tab-list" className="tab-long-description">
              <div
                style={{ marginRight: "40px", cursor: "pointer" }}
                className="d-inline fw-bold pt-3 pb-3"
                onClick={() => toggle("tab-long-description")}
              >
                TUOTEKUVAUS
              </div>
              <div
                style={{ marginRight: "40px", cursor: "pointer" }}
                className="d-inline fw-bold pt-3 pb-3"
                onClick={() => toggle("tab-contents")}
              >
                SISÄLTÖ
              </div>
              <div
                style={{ marginRight: "40px", cursor: "pointer" }}
                className="d-inline fw-bold pt-3 pb-3"
                onClick={() => toggle("tab-more-information")}
              >
                LISÄTIETOA
              </div>
              <div
                style={{ marginRight: "40px", cursor: "pointer" }}
                className="d-inline fw-bold pt-3 pb-3"
                onClick={() => toggle("tab-usage-rate")}
              >
                KÄYTTÖMÄÄRÄ
              </div>

              {(() => {
                if (product.features) {
                  return (
                    <div
                      style={{ cursor: "pointer" }}
                      className="d-inline fw-bold pt-3 pb-3"
                      onClick={() => toggle("tab-features")}
                    >
                      OMINAISUUDET
                    </div>
                  );
                }
              })()}
            </div>
          </div>
          <div className="p-3 bg-white">
            <div style={{ marginRight: "370px" }}>
              <p id="tab-long-description" className="tab">
                {product.longDescription}
              </p>
            </div>

            <div style={{ marginRight: "370px" }}>
              <table
                id="tab-contents"
                className="tab table table-striped table-borderless d-none"
              >
                <tbody>
                  {(() =>
                    Object.keys(product.contents).map((key, index) => (
                      <tr key={index}>
                        <td>{key}</td>
                        <td>{product.contents[key]}</td>
                      </tr>
                    )))()}
                </tbody>
              </table>
            </div>

            <div style={{ marginRight: "370px" }}>
              <table
                id="tab-more-information"
                className="table table-borderless tab d-none"
              >
                <tbody>
                  {(() =>
                    Object.keys(product.moreInformation).map((key, index) => (
                      <tr key={index}>
                        <td>{key}</td>
                        <td>{product.moreInformation[key]}</td>
                      </tr>
                    )))()}
                </tbody>
              </table>
            </div>

            <div style={{ marginRight: "370px" }}>
              <table
                id="tab-usage-rate"
                className="table table-striped table-borderless tab d-none"
              >
                <tbody>
                  {(() =>
                    Object.entries(product.usageRate).map((key, index) => (
                      <tr key={index}>
                        <td>{key}</td>
                        <td>{product.usageRate[key]}</td>
                      </tr>
                    )))()}
                </tbody>
              </table>
            </div>

            {(() => {
              if (product.features) {
                return (
                  <div id="tab-features" className="tab d-none">
                    <div>
                      <div
                        className="product_features_accordion_button d-flex align-items-center fw-bold pt-4"
                        onClick={(event) =>
                          productFeaturesAccordionButtonClick(event.target)
                        }
                      >
                        Tuoten ominaisuudet
                        <div className="product_features_plus_icon"></div>
                      </div>
                      <div className="product_features_panel">
                        <div
                          className="spinner-border product-features-spinner-border"
                          role="status"
                          style={{
                            color: "#e77110",
                            width: "20px",
                            height: "20px",
                          }}
                        >
                          <span className="sr-only"></span>
                        </div>
                        <table className="table table-striped table-borderless product-features-table"></table>
                      </div>
                    </div>
                  </div>
                );
              }
            })()}
          </div>
        </div>
        <div style={{ marginTop: "1px" }} className="product-accordion">
          <div
            id="product-accordion-button-long-description"
            className="product_accordion_button d-flex align-items-center"
            onClick={(event) => accordionButtonClick(event.target)}
          >
            Tuotekuvaus
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <div className="product_panel">
            <div className="pt-4 pr-4 pb-4">
              <p>{product.longDescription}</p>
            </div>
          </div>
          <div
            id="product-accordion-button-contents"
            className="product_accordion_button d-flex align-items-center"
            onClick={(event) => accordionButtonClick(event.target)}
          >
            <b>Sisältö</b>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <div className="product_panel">
            <div className="pt-4 pr-4 pb-4">
              <table className="table table-striped table-borderless">
                <tbody>
                  {(() =>
                    Object.keys(product.contents).map((key, index) => (
                      <tr key={index}>
                        <td>{key}</td>
                        <td>{product.contents[key]}</td>
                      </tr>
                    )))()}
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="product-accordion-button-more-information"
            className="product_accordion_button d-flex align-items-center"
            onClick={(event) => accordionButtonClick(event.target)}
          >
            <b>Lisätietoa</b>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <div className="product_panel">
            <div className="pt-4 pr-4 pb-4">
              <table
                id="accordion-more-information"
                className="table table-borderless"
                onClick={(event) => productAccordionButtonClick(event.target)}
              >
                <tbody>
                  {(() =>
                    Object.keys(product.moreInformation).map((key, index) => (
                      <tr key={index}>
                        <td>{key}</td>
                        <td>{product.moreInformation[key]}</td>
                      </tr>
                    )))()}
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="product-accordion-button-usage-rate"
            className="product_accordion_button d-flex align-items-center"
            onClick={(event) => accordionButtonClick(event.target)}
          >
            <b>Käyttömäärä</b>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <div className="product_panel">
            <div className="pt-4 pr-4 pb-4">
              <table className="table table-striped table-borderless">
                <tbody>
                  {(() =>
                    Object.keys(product.usageRate).map((key, index) => (
                      <tr key={index}>
                        <td>{key}</td>
                        <td>{product.usageRate[key]}</td>
                      </tr>
                    )))()}
                </tbody>
              </table>
            </div>
          </div>

          {(() => {
            if (product.features) {
              return (
                <>
                  <div
                    id="product-accordion-button-features"
                    className="product_accordion_button d-flex align-items-center"
                    onClick={(event) => accordionButtonClick(event.target)}
                  >
                    <b>Ominaisuudet</b>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>
                  <div className="product_panel">
                    <div className="pt-4 pr-4 pb-4">
                      <div
                        style={{ fontSize: "12px" }}
                        className="product_features_accordion_button d-flex align-items-center fw-bold pt-4"
                        onClick={(event) =>
                          productFeaturesAccordionButtonClick(event.target)
                        }
                      >
                        Tuoten ominaisuudet
                        <div className="product_features_plus_icon"></div>
                      </div>
                      <div className="product_features_panel">
                        <div
                          className="spinner-border product-features-spinner-border"
                          role="status"
                          style={{
                            color: "#e77110",
                            width: "20px",
                            height: "20px",
                          }}
                        >
                          <span className="sr-only"></span>
                        </div>
                        <table className="table table-striped table-borderless pb-2 product-features-table"></table>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          })()}
        </div>
      </main>
    );
  } else {
    return <NotFound />;
  }
};

export default Product;
