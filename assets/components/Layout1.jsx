import React from "react";
import { Link } from "react-router-dom";
import { closeNav, openNav } from "../app";

const Layout1 = ({children, cart}) => {

  return (
    <div className="page-container">
      <header>
        <div
          className="spinner-border d-none"
          role="status"
          style={{
            color: "#e77110",
            width: "50px",
            height: "50px",
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: "1040",
          }}
        >
          <span className="sr-only"></span>
        </div>
        <div className="header-mobile">
          <div className="toggle-container">
            <span
              className="toggle"
              style={{
                fontSize: "25px",
                cursor: "context-menu",
                color: "white",
              }}
              onClick={openNav}
            >
              &#9776;
            </span>
          </div>
          <Link className="logo" to="/">
            <img src="img/norra_logo_musta_laatikko_1.png" alt="" />
          </Link>
          {cart ? (
          <Link
            className="shopping-cart d-flex"
            style={{ textDecoration: "none", position: "relative" }}
            to="/checkout"
          >
            <img src="img/shopping-cart.png" alt="" />
            <div
              className={"shopping-cart-summary invisible"}
              style={{ marginTop: "-10px", marginLeft: "30px" }}
            >
              <span
                className="shopping-cart-items-count text-center"
              ></span>
              <div className="d-inline">
                <span
                  className="shopping-cart-total fw-bold"
                ></span>
                <span
                  style={{ fontSize: "10px", color: "white" }}
                  className="d-block text-end"
                >
                  Sis. ALV:n
                </span>
              </div>
            </div>
          </Link>
          ) : null}
        </div>

        <div className="header-desktop">
          <Link className="logo" to="/">
            <img src="img/norra_logo_musta_laatikko_1.png" alt="" />
          </Link>
          <Link
            className="shopping-cart d-flex"
            style={{ textDecoration: "none", position: "relative" }}
            to="/checkout"
          >
            <img src="img/shopping-cart.png" alt="" />
            <div
              className="shopping-cart-summary invisible"
              style={{ marginTop: "-10px", marginLeft: "30px" }}
            >
              <span className="shopping-cart-items-count text-center"></span>
              <div className="d-inline">
                <span className="shopping-cart-total fw-bold"></span>
                <span
                  style={{ fontSize: "10px", color: "white" }}
                  className="d-block text-end"
                >
                  Sis. ALV:n
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="navigation-bar">
          <Link className="fw-bold" to="/">
            RUOKINTALASKURI
          </Link>
          <Link className="fw-bold" to="/">
            RUOKINTAVINKIT
          </Link>
          <Link
            className="fw-bold"
            to="/products"
          >
            TUOTTEET
          </Link>
          <Link className="fw-bold" to="/">
            YHTEYSTIEDOT
          </Link>
          <Link className="fw-bold" to="/">
            YRITYS
          </Link>
        </div>

        <div id="mySidenav" className="sidenav d-lg-none">
          <div
            style={{
              paddingTop: "6px",
              paddingBottom: "6px",
              borderBottom: "2px solid lightgray",
            }}
          >
            <a style={{ cursor: "context-menu" }} onClick={closeNav}>
              <span
                style={{
                  fontSize: "32px",
                  color: "#e77110",
                  paddingBottom: "6px",
                }}
              >
                &times;
              </span>
              <span style={{ fontSize: "12px", color: "#5f5f5f" }}>
                {" "}
                VALIKKO{" "}
              </span>
            </a>
          </div>
          <div>
            <Link className="fw-bold" to="/" onClick={closeNav}>
              RUOKINTALASKURI
            </Link>
          </div>
          <div>
            <Link className="fw-bold" to="/" onClick={closeNav}>
              RUOKINTAVINKIT
            </Link>
          </div>
          <div>
            <Link
              className="fw-bold"
              to="/products"
              onClick={closeNav}
            >
              TUOTTEET
            </Link>
          </div>
          <div>
            <Link className="fw-bold" to="/" onClick={closeNav}>
              YHTEYSTIEDOT
            </Link>
          </div>
          <div>
            <Link className="fw-bold" to="/" onClick={closeNav}>
              YRITYS
            </Link>
          </div>
          <div>
            <Link style={{ fontSize: "12px" }} to="/" onClick={closeNav}>
              PIKATILAUS
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer>
        <div className="d-lg-none">
          <div
            style={{ fontSize: "13px" }}
            className="accordion_button d-flex align-items-center"
          >
            <b>VERKKOKAUPPA</b>
            <div className="plus-icon white-plus-icon"></div>
          </div>
          <div className="panel">
            <div className="pt-4 pr-4 pb-4">
              <a style={{ fontSize: "13px" }} className="d-block" href="/">
                Myynti- ja toimitusehdot
              </a>
              <a style={{ fontSize: "13px" }} className="d-block" href="/">
                Palautukset
              </a>
              <a style={{ fontSize: "13px" }} className="d-block" href="/">
                Käyttöehdot
              </a>
              <a style={{ fontSize: "13px" }} className="d-block" href="/">
                Yhteystiedot
              </a>
              <a style={{ fontSize: "13px" }} className="d-block" href="/">
                Yritys
              </a>
            </div>
          </div>
          <div
            style={{ fontSize: "13px" }}
            className="accordion_button d-flex align-items-center"
          >
            <b>SEURAA MEITÄ</b>
            <div className="plus-icon white-plus-icon"></div>
          </div>
          <div className="panel">
            <div className="pt-4 pr-4 pb-4">
              <a href="">
                <img src="img/f.png" alt="" />
              </a>
            </div>
          </div>
        </div>

        <div
          style={{ backgroundColor: "#020c10" }}
          className="w-100 row p-3 m-0 d-none d-lg-block"
        >
          <div className="d-inline-block col-5">
            <Link
              className="mt-3 pb-2"
              style={{ fontSize: "13px", color: "white" }}
              to="/"
            >
              VERKKOKAUPPA
            </Link>
            <div className="pr-4 pb-4">
              <Link className="d-block" style={{ fontSize: "13px" }} to="/">
                Myynti- ja toimitusehdot
              </Link>
              <Link className="d-block" style={{ fontSize: "13px" }} to="/">
                Palautukset
              </Link>
              <Link className="d-block" style={{ fontSize: "13px" }} to="/">
                Käyttöehdot
              </Link>
              <Link className="d-block" style={{ fontSize: "13px" }} to="/">
                Yhteystiedot
              </Link>
              <Link className="d-block" style={{ fontSize: "13px" }} to="/">
                Yritys
              </Link>
            </div>
          </div>
          <div className="d-inline-block col-2 align-top">
            <div
              style={{ fontSize: "13px", color: "white" }}
              className="mt-3 pb-2"
            >
              <b>SEURAA MEITÄ</b>
            </div>
            <Link to="/">
              <img
                src="img/f.png"
                style={{ width: "15px", height: "15px" }}
                alt=""
              />
            </Link>
          </div>
        </div>

        <p
          style={{
            backgroundColor: "#020c10",
            color: "white",
            fontSize: "12px",
          }}
          className="w-100 text-center pt-3 pb-4 mb-0"
        >
          &copy; 2020 Lantmännen &nbsp; <Link to="/">Tietosuojapolitiikka</Link>{" "}
          &nbsp; <Link to="/">Evästekäytäntö</Link>
          &nbsp; <Link to="/">Evästeasetukset</Link>
        </p>
      </footer>
    </div>
  );
};
export default Layout1;
