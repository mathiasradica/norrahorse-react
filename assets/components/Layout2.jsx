import React from "react"
import {Link} from 'react-router-dom'
import {toggleExpandedTotalAndTaxTable} from '../app'

const Layout2 = (props) => (
  <header>
    <div className="d-none d-lg-block">
      <div
        style={{height:'74px', width:'100%', backgroundColor:'#020c10', color:'white'}}
        className="d-flex justify-content-between"
      >
        <Link className={"logo h-100"} style={{lineHeight:'74px'}} to="/">
        <img
            style={{height:'60px'}}
            className="ml-3 mt-1"
            src="/img/norra_logo_musta_laatikko_1.png"
            alt=""
          />
        </Link>
        <span className="fs-3 fw-bold h-100" style={{lineHeight:'70px'}}>
          KASSALLE
        </span>
        <div className="d-inline me-3">
        <Link style={{color:'white', fontSize:'13px', textDecoration:'none', lineHeight:'74px'}} to="/">
          Jatka ostoksia
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="d-inline bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div className="shipping-mobile-header-container d-lg-none">
      <div
        style={{height:'148px', width:'100%', backgroundColor:'#020c10', color:'white'}}
        className="d-flex justify-content-between"
      >
        <div className="d-inline d-flex ms-3">
          <div className="mt-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
            <Link style={{color:'white', fontSize:'13px', textDecoration:'none', lineHeight:'74px'}} to="/">
            Jatka ostoksia
            </Link>   
          </div>
        </div>
        <div>
            <Link className="logo h-100 ps-2" style={{lineHeight:'74px'}} to="/">
            <img
              style={{height:'60px'}}
              className="mt-1"
              src="/img/norra_logo_musta_laatikko_1.png"
              alt=""
            />
            </Link>
          <div className="fs-6 fw-bold text-center" style={{lineHeight:'70px'}}>
            KASSALLE
          </div>
        </div>
        <div className="d-inline d-flex me-3">
          <div
            className="mt-auto"
            style={{cursor:'pointer'}}
            onClick={toggleExpandedTotalAndTaxTable}
          >
            <span style={{color:'white', fontSize:'13px', textDecoration:'none', lineHeight:'74px'}}>
              Tilauksesi
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="d-inline bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    {props.children}
  </header>
);

export default Layout2