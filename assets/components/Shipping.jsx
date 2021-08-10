import React from "react";
import ShippingForm from "./ShippingForm";
import TotalAndTaxTable from "./TotalAndTaxTable";
import Loading from "./Loading"
import { toggleExpandedTotalAndTaxTable, toggleShippingAccordion } from "../app";

const Shipping = ({cart, loading}) => {

  return loading ? <Loading /> : (
    <main>
      <div className="shipping-progress-indicator-container d-lg-block">
        <div className="d-flex mt-4 ps-4 pe-4 justify-content-around justify-content-lg-center">
          <div style={{ position: "relative" }} className="me-auto me-lg-1">
            <svg
              style={{ color: "#5f5f5f" }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-circle-fill"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>
            <span
              style={{
                color: "white",
                position: "absolute",
                left: "8px",
                top: "4px",
                fontSize: "12px",
              }}
            >
              1
            </span>
            <span
              style={{
                fontSize: "13px",
                color: "#5f5f5f",
                height: "24px",
                lineHeight: "24px",
              }}
              className="ms-3 me-3 fw-bold"
            >
              Toimituskulut
            </span>
          </div>

          <div
            className="d-none d-md-inline-block me-3"
            style={{ height: "24px", lineHeight: "24px" }}
          >
            <img src="/img/line.png" alt="" />
          </div>
          <div style={{ position: "relative" }} className="ms-auto ms-lg-1">
            <svg
              style={{ color: "#5f5f5f" }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            </svg>
            <span
              style={{
                color: "#5f5f5f",
                position: "absolute",
                left: "8px",
                top: "4px",
                fontSize: "12px",
              }}
            >
              2
            </span>
            <span
              style={{
                fontSize: "13px",
                color: "#5f5f5f",
                height: "24px",
                lineHeight: "24px",
              }}
              className="ms-3 me-3"
            >
              Vilausvahvistus
            </span>
          </div>
        </div>
      </div>
      <div
        className="shipping-main-content-container d-flex m-lg-4 mt-4"
        style={{ color: "#5f5f5f" }}
      >
        <div className="shipping-form-container d-lg-inline-block bg-white p-4 me-lg-4 flex-grow-1">
          <div
            className="fw-bold fs-6 w-100 pb-4 mb-4"
            style={{ borderBottom: "1px solid lightgray" }}
          >
            Toimitusosoite
          </div>
          <ShippingForm cart={cart} />
        </div>
        <div
          style={{ height: "fit-content" }}
          className="total-and-tax-table-container mb-2 p-4 bg-white d-none d-lg-inline-block d-flex"
        >
          <div className="d-inline-block">
            <h6 className="fw-bold text-left">TILAUKSESI</h6>
          </div>
          <hr />

          <TotalAndTaxTable
            classList={"total-and-tax-table w-100"}
            cart={cart}
          />

          <div className="d-none d-lg-inline-block">
            <button
              style={{
                fontSize: "12px",
                backgroundColor: "white",
                color: "#5f5f5f",
                borderTop: "1px solid lightgray",
                borderLeft: "1px solid lightgray",
                borderRight: "1px solid lightgray",
              }}
              className="accordion_button d-flex align-items-center"
              onClick={toggleShippingAccordion}
            >
              <b>{cart.items.length} TUOTE OSTOSKORISSA</b>
              <div className="plus-icon gray-plus-icon"></div>
            </button>
            <div
              style={{
                borderLeft: "1px solid lightgray",
                borderRight: "1px solid lightgray",
                borderBottom: "1px solid lightgray",
                backgroundColor: "white",
                color: "#5f5f5f",
              }}
              className="shipping-accordion-panel panel"
            >
              {cart.items.map((item, index) => (
                <div key={index} className="pt-3 pr-3 pb-3 d-flex">
                  <div className="d-inline-block">
                    <img
                      style={{ height: "75px" }}
                      src={item.product.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="inline-block">
                    <div style={{ fontSize: "12px" }} className="fw-bold">
                      {item.product.title}
                    </div>
                    <div style={{ fontSize: "12px" }}>
                      Kpl/tn: {item.quantity}
                    </div>
                    <div style={{ fontSize: "10px" }}>
                      Verollinen: {item.total.toFixed(2)} &euro;
                    </div>
                    <div style={{ fontSize: "10px" }}>
                      Veroton:{" "}
                      {(item.total * (1 - item.product.vat)).toFixed(2)} &euro;
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="expanded-total-and-tax-table-container bg-white p-4 d-none d-lg-none w-100 h-100">
          <div style={{ height: "fit-content" }} className="">
            <div className="w-100 d-block">
              <div className="d-inline-block">
                <h6 className="fw-bold text-left">TILAUKSESI</h6>
              </div>
              <div
                className="d-flex d-inline-block"
                onClick={toggleExpandedTotalAndTaxTable}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-lg ms-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                </svg>
              </div>
            </div>
            <hr />
            <TotalAndTaxTable
              classList={"d-block total-and-tax-table w-100"}
              cart={cart}
            />

            <div>
              <div
                style={{
                  fontSize: "12px",
                  backgroundColor: "white",
                  color: "#5f5f5f",
                  borderTop: "1px solid lightgray",
                  borderLeft: "1px solid lightgray",
                  borderRight: "1px solid lightgray",
                }}
                className="accordion_button d-flex align-items-center"
                onClick={toggleShippingAccordion}
              >
                <b>{cart.items.length} TUOTE OSTOSKORISSA</b>
                <div className="plus-icon gray-plus-icon"></div>
              </div>
              <div
                style={{
                  borderLeft: "1px solid lightgray",
                  borderRight: "1px solid lightgray",
                  borderBottom: "1px solid lightgray",
                  backgroundColor: "white",
                  color: "#5f5f5f",
                }}
                className="shipping-accordion-panel panel"
              >
                {cart.items.map((item, index) => (
                  <div key={index} className="pt-3 pr-3 pb-3 d-flex">
                    <div className="d-inline-block">
                      <img
                        style={{ height: "75px" }}
                        src={item.product.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="inline-block">
                      <div style={{ fontSize: "12px" }} className="fw-bold">
                        {item.product.title}
                      </div>
                      <div style={{ fontSize: "12px" }}>
                        Kpl/tn: {item.quantity}
                      </div>
                      <div style={{ fontSize: "10px" }}>
                        Verollinen: {item.total.toFixed(2)} &euro;
                      </div>
                      <div style={{ fontSize: "10px" }}>
                        Veroton:{" "}
                        {(item.total * (1 - item.product.vat)).toFixed(2)}{" "}
                        &euro;
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shipping;
