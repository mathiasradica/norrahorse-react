import React from "react";
import MainCarousel from "./MainCarousel";
import ProductCarousel from "./ProductCarousel";
import Loading from "./Loading";

const Home = ({products, loading}) => {

  return (
    <main>
      <div
        style={{
          backgroundColor: "#e77110",
          color: "white",
          fontSize: "13px",
          fontWeight: "bold",
        }}
        className="banner text-center text-break"
      >
        <span>
          Rehut suoraan ovellesi - maksuton toimitus kaikkiin tilauksiin!
          Minimitilausmäärä 2 tuotetta.
        </span>
      </div>
      <main>
        {loading ? (
          <Loading />
        ) : (
          <>
            <MainCarousel />

            <ProductCarousel products={products} />

            <div
              style={{
                background:
                  "url('img/pikkusankari_norrahorse_banneri_1800x500_3f9936cd-b48f-4758-89be-42a69913fe26.jpg')",
                height: "300px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                position: "relative",
              }}
              className="row mt-5 front-page-image-1 front-page-image-1-container"
            >
              <div className="front-page-image-1-overlay w-100">
                <h2
                  className="mb-3"
                  style={{ color: "white", fontSize: "40px" }}
                >
                  PIKKU SANKARI
                </h2>
                <div className="d-flex align-items-end">
                  <button className="carousel-btn mt3">
                    PONIEN OMA REHU, TUTUSTU JA OSTA{" "}
                  </button>
                </div>
              </div>
            </div>

            <div className="row mt-5 mb-5 front-page-image-2-container">
              <div className="col-lg-6">
                <img
                  className="img-fluid mt-3 mb-3"
                  src="img/norra_menu_logo_vaaka_1080x.png"
                  alt=""
                />
              </div>
              <div className="col-lg-6 hidden">
                <h3 className="mt-4 mb-4">
                  <span
                    style={{
                      fontSize: "22px",
                      color: "#5f5f5f",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    OPTIMOI HEVOSESI RUOKINTA
                  </span>
                </h3>
                <p style={{ fontSize: "16px", color: "#5f5f5f" }}>
                  <span>Maksuttomalla</span>
                  <a
                    href="https://norramenu.lantmannenagro.fi/"
                    title="https://norramenu.lantmannenfeed.fi/"
                    target="_blank"
                    rel="noopener"
                  >
                    <span>Norra Menu -ruokintalaskurilla</span>
                  </a>
                  <span>
                    teet helposti juuri sinun hevosellesi sopivan, turvallisen
                    ja täysipainoisen ruokintasuunnitelman. Harkiten suunniteltu
                    ruokinta tukee hevosen hyvinvointia ja suorituskykyä.
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </main>
  );
};

export default Home;
