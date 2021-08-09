import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Confirmation = () => {
  const location = useLocation();
  const shippingInfo = location.state;

  useEffect(() => axios.get("/api/cart/clear"), []);

  return (
    <main>
      <div className="shipping-progress-indicator-container d-lg-block">
        <div className="d-flex mt-4 ps-4 pe-4 justify-content-around justify-content-lg-center">
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
              1
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
              Toimituskulut
            </span>
          </div>
          <div
            className="d-none d-md-inline-block me-3"
            style={{ height: "24px", lineHeight: "24px" }}
          >
            <img src="/img/line.png" alt="" />
          </div>
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
              2
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
              Tilausvahvistus
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-white" style={{ paddingBottom: "250px" }}>
        <div className="w-100 text-center fs-3 p-4">
          Kiitos tilauksestasi! Tilauksesi lähetetään osoitteeseen:
        </div>

        <div style={{ marginLeft: "50%" }}>
          {shippingInfo.company ? <div>{shippingInfo.company}</div> : null}

          <div>
            {shippingInfo.firstName} {shippingInfo.lastName}
          </div>
          <div>{shippingInfo.streetAddress1}</div>

          {shippingInfo.streetAddress2 ? (
            <div>{shippingInfo.streetAddress2}</div>
          ) : null}

          <div>{shippingInfo.zipCode}</div>
          <div>{shippingInfo.city}</div>
          <div>{shippingInfo.telephone}</div>
          <div>{shippingInfo.email}</div>
        </div>
      </div>
    </main>
  );
};

export default Confirmation;
