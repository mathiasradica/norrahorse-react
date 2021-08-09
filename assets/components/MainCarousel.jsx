import React from "react";
import { Link } from "react-router-dom";

const MainCarousel = () => (
  <div
    id="mainCarousel"
    className="carousel slide ml-2 mr-2"
    data-bs-ride="carousel"
  >
    <div className="carousel-indicators">
      <button
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide-to="0"
        className="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
      <button
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide-to="3"
        aria-label="Slide 4"
      ></button>
      <button
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide-to="4"
        aria-label="Slide 5"
      ></button>
    </div>

    <div className="carousel-inner">
      <div
        style={{
          background: "url('img/norra-old.jpg')",
          height: "504px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="main-carousel-image carousel-item active"
      >
        <Link
          className="carousel-caption d-block"
          style={{ marginBottom: "30px" }}
          to="/"
        >
          <div className="carousel-caption d-block">
            <h1 style={{ marginBottom: "30px" }}>
              <span
                style={{ fontSize: "36px", color: "white", fontWeight: "bold" }}
              >
                RUOKI HEVOSESI HYVINVONTIA
              </span>
            </h1>
            <button className="carousel-btn">
              {" "}
              KOTIMAISET HEVOSREHUT POHJOISIIN OLOIHIN{" "}
            </button>
          </div>
        </Link>
      </div>
      <div
        style={{
          background: "url('img/norrslide2.jpg')",
          height: "504px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="main-carousel-image carousel-item"
      >
        <Link
          className="carousel-caption d-block"
          style={{ marginBottom: "30px" }}
          to="/"
        >
          <div className="carousel-caption d-block">
            <h1 style={{ marginBottom: "30px" }}>
            <span
                style={{ fontSize: "36px", color: "white", fontWeight: "bold" }}
              >
                RUOKI HEVOSESI HYVINVONTIA
              </span>
            </h1>
            <button className="carousel-btn">
              {" "}
              KOTIMAISET HEVOSREHUT POHJOISIIN OLOIHIN{" "}
            </button>
          </div>
        </Link>
      </div>
      <div
        style={{
          background:
            "url('img/norra_karusellikuva_nuoriso_3000x1100_fed485d3-f2e1-42d9-84c1-0afe9abac6f6_4472x.jpg')",
          height: "504px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="main-carousel-image carousel-item"
      >
        <Link
          className="carousel-caption d-block"
          style={{ marginBottom: "30px" }}
          to="/"
        >
          <div className="carousel-caption d-block">
            <h1 style={{ marginBottom: "30px" }}>
            <span
                style={{ fontSize: "36px", color: "white", fontWeight: "bold" }}
              >
                RUOKI HEVOSESI HYVINVONTIA
              </span>
            </h1>
            <button className="carousel-btn">
              {" "}
              KOTIMAISET HEVOSREHUT POHJOISIIN OLOIHIN{" "}
            </button>
          </div>
        </Link>
      </div>
      <div
        style={{
          background:
            "url('img/norra_menu_1920x704.jpg')",
          height: "504px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="main-carousel-image carousel-item"
      >
        <Link
          className="carousel-caption d-block"
          style={{ marginBottom: "30px" }}
          to="/"
        >
          <div className="carousel-caption d-block">
            <h1 style={{ marginBottom: "30px" }}>
            <span
                style={{ fontSize: "36px", color: "white", fontWeight: "bold" }}
              >
                RUOKI HEVOSESI HYVINVONTIA
              </span>
            </h1>
            <button className="carousel-btn">
              {" "}
              KOTIMAISET HEVOSREHUT POHJOISIIN OLOIHIN{" "}
            </button>
          </div>
        </Link>
      </div>
      <div
      style={{
        background:
          "url('img/black-horse.jpg')",
        height: "504px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
        className="main-carousel-image carousel-item"
      >
        <Link
          className="carousel-caption d-block"
          style={{ marginBottom: "30px" }}
          to="/"
        >
          <div className="carousel-caption d-block">
            <h1 style={{ marginBottom: "30px" }}>
            <span
                style={{ fontSize: "36px", color: "white", fontWeight: "bold" }}
              >
                RUOKI HEVOSESI HYVINVONTIA
              </span>
            </h1>
            <button className="carousel-btn">
              {" "}
              KOTIMAISET HEVOSREHUT POHJOISIIN OLOIHIN{" "}
            </button>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default MainCarousel;
