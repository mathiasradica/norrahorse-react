import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  validateReduceQuantity,
  validateIncreaseQuantity,
  blurPage,
  removeItem,
  changeQuantity,
} from "../app";
import Loading from "./Loading";
import EmptyCart from "./EmptyCart";

const Cart = ({ cart, loading, callback }) => {
  let history = useHistory();

  return loading ? (
    <Loading />
  ) : cart.items.length === 0 ? (
    <EmptyCart />
  ) : (
    <main>
      {cart.total < 30 ? (
        <div
          className="min-order-amount-warning bg-white p-4 mb-2 ms-3 me-3 mt-4 d-flex justify-content-between"
          style={{
            fontSize: "12px",
            border: "1px solid #e77110",
            position: "relative",
          }}
        >
          <svg
            style={{
              color: "#e77110",
              position: "absolute",
              left: "30px",
              top: "27px",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-exclamation-triangle"
            viewBox="0 0 16 16"
          >
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
          </svg>
          <svg
            style={{ color: "lightgray" }}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-circle-fill"
            viewBox="0 0 16 16"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
          <span
            className="ps-4"
            style={{
              color: "#e77110",
              position: "absolute",
              left: "60px",
              lineHeight: "32px",
            }}
          >
            Pienin tilausmäärä on 30,00 &euro;
          </span>
          <Link
            to="/checkout"
            style={{ cursor: "pointer" }}
            onClick={() => {
              document
                .getElementsByClassName("min-order-amount-warning")[0]
                .classList.add("d-none");
            }}
          >
            <svg
              style={{ color: "#e77110" }}
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
      ) : null}
      <div
        className="checkout-top-container"
        style={{ fontSize: "12px", color: "#5f5f5f" }}
      >
        <div
          className="d-inline-block checkout-main-container"
          style={{ height: "fitContent" }}
        >
          <h2 className="cart-details-title mt-2 p-4 mb-0 bg-white fw-bold">
            OSTOKORI
          </h2>
          <div className="cart-details-container p-4 bg-white">
            <div className="cart-details">
              <div
                className="d-flex align-items-center p-3"
                style={{ backgroundColor: "lightgray", height: "70px" }}
              >
                <div style={{ width: "40%" }} className="cart-contents-heading">
                  Tuote
                </div>
                <div style={{ width: "15%" }} className="cart-contents-heading">
                  Yksikköhinta
                </div>
                <div style={{ width: "30%" }} className="cart-contents-heading">
                  Kpl/tn
                </div>
                <div style={{ width: "15%" }} className="cart-contents-heading">
                  Kokonaishinta ilman ALV:tä
                </div>
              </div>
              {cart.items.map((item, index) => (
                <div
                  className="d-flex align-items-top pt-3 pb-3"
                  style={{ borderBottom: "1px solid lightgray" }}
                  key={index}
                >
                  <div
                    style={{ width: "40%" }}
                    className="cart-contents-item d-flex"
                  >
                    <Link
                      to={{ pathname: item.product.url, state: item.product }}
                    >
                      <img
                        style={{ width: "72px", height: "72px" }}
                        src={item.product.imageUrl}
                        alt=""
                      />
                    </Link>
                    <div className="d-inline">
                      <Link
                        to={{ pathname: item.product.url, state: item.product }}
                        style={{ textDecoration: "none", color: "#5f5f5f" }}
                      >
                        <div>{item.product.title}</div>
                        <div style={{ color: "lightgray", fontSize: "10px" }}>
                          {item.product.imageUrl}
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div style={{ width: "15%" }} className="cart-contents-item">
                    <div>
                      {(item.product.price * (1 - item.product.vat)).toFixed(2)}{" "}
                      &euro;
                    </div>
                    <div style={{ color: "lightgray", fontSize: "10px" }}>
                      Ilman ALV:tä
                    </div>
                    <div>{item.product.price} &euro;</div>
                    <div style={{ color: "lightgray", fontSize: "10px" }}>
                      Sis. ALV:n (14 %)
                    </div>
                  </div>
                  <div style={{ width: "30%" }} className="cart-contents-item">
                    <form className="d-flex">
                      <input
                        className="url-input"
                        name="url"
                        type="hidden"
                        defaultValue={item.product.url}
                      />
                      <span
                        className="quantity-change-btn text-center"
                        style={{ marginRight: "10px", lineHeight: "40px" }}
                        onClick={() => {
                          blurPage();
                          validateReduceQuantity() ? changeQuantity() : null;
                          callback(true);
                        }}
                      >
                        -
                      </span>
                      <input
                        name="quantity"
                        type="number"
                        defaultValue={item.quantity}
                        className="quantity-input d-inline form-control text-center"
                        style={{ fontSize: "12px" }}
                      />
                      <span
                        className="quantity-change-btn text-center"
                        style={{ marginLeft: "10px", lineHeight: "40px" }}
                        onClick={() => {
                          blurPage();
                          validateIncreaseQuantity() ? changeQuantity() : null;
                          callback(true);
                        }}
                      >
                        +
                      </span>
                      <div
                        style={{ width: "40%" }}
                        className="d-inline d-flex justify-content-center align-items-center"
                      >
                        <svg
                          style={{ color: "#5f5f5f", cursor: "pointer" }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                          onClick={() => {
                            blurPage();
                            removeItem(item.product.url);
                            callback(true);
                          }}
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </div>
                    </form>
                    <div
                      style={{
                        fontSize: "10px",
                        height: "48px",
                        width: "140px",
                        backgroundColor: "lightgray",
                        color: "#b55f18",
                      }}
                      className="nonpositive-quantity-warning text-center p-2 mt-2 mb-2 d-none"
                    >
                      <div>Määrä ei ole sallitun</div>
                      <div>rajan sisällä.</div>
                    </div>
                  </div>
                  <div style={{ width: "15%" }} className="cart-contents-item">
                    <div>
                      {(item.total * (1 - item.product.vat)).toFixed(2)} &euro;
                    </div>
                    <div style={{ color: "lightgray", fontSize: "10px" }}>
                      Ilman ALV:tä
                    </div>
                    <div>{item.total.toFixed(2)} &euro;</div>
                    <div style={{ color: "lightgray", fontSize: "10px" }}>
                      Sis. ALV:n (14 %)
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="promo-code-container ps-2 pe-2 pt-3 pb-3 mt-2"
              style={{ border: "1px solid lightgray" }}
            >
              <span
                className="mb-3"
                style={{ color: "#5f5f5f", fontWeight: "bold" }}
              >
                Onko sinulla alennuskoodi?
              </span>
              <form>
                <input
                  style={{
                    boxShadow: "none",
                    borderRadius: "0",
                    fontSize: "13px",
                    color: "lightgray",
                  }}
                  className="form-control fw-bold"
                  type="text"
                  defaultValue="Syötä alennuskoodi"
                />
                <div
                  className="checkout-page-btn w-100 mt-1"
                  style={{
                    border: "none",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  Käyte alennusta
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          style={{ color: "#5f5f5f", height: "fit-content" }}
          className="total-and-tax-container mb-2 me-3 p-4 bg-white"
        >
          <h6 className="fw-bold text-left">TILAUKSESI</h6>
          <hr />
          <table className="total-and-tax-table w-100">
            <tbody>
              <tr>
                <td>Kokonaishinta ilman ALV:tä</td>
                <td>{(cart.total - cart.totalVat).toFixed(2)} &euro;</td>
              </tr>
              <tr>
                <td>Kokonaishinta ALV:än kanssa</td>
                <td>{cart.total.toFixed(2)} &euro;</td>
              </tr>
              <tr>
                <td>Verot</td>
                <td>{cart.totalVat.toFixed(2)} &euro;</td>
              </tr>
              <tr>
                <td>Toimituskulut</td>
                <td>Ilmainen</td>
              </tr>
              <tr
                style={{ borderTop: "1px solid lightgray", fontWeight: "bold" }}
              >
                <td>Kokonaishinta ALV:än kanssa</td>
                <td>{cart.total.toFixed(2)} &euro;</td>
              </tr>
              <tr className="d-lg-none">
                <td></td>
                <td>
                  {cart.total < 30 ? (
                    <div
                      style={{ opacity: "0.5", cursor: "pointer" }}
                      className="checkout-page-btn proceed-to-checkout-btn w-100 mt-1"
                    >
                      Slirry kassalle
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        history.push("/checkout/shipping")
                      }
                      style={{ cursor: "pointer", textAlign: "center" }}
                      className="checkout-page-btn proceed-to-checkout-btn w-100 mt-1"
                    >
                      Slirry kassalle
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {cart.total < 30 ? (
            <div
              style={{ cursor: "pointer", opacity: "0.5" }}
              className="d-none d-lg-block checkout-page-btn proceed-to-checkout-btn mt-3"
            >
              Slirry kassalle
            </div>
          ) : (
            <div
              onClick={() =>
                history.push("/checkout/shipping")
              }
              style={{ cursor: "pointer", textAlign: "center" }}
              className="d-none d-lg-block checkout-page-btn proceed-to-checkout-btn mt-3"
            >
              Slirry kassalle
            </div>
          )}
        </div>
      </div>
      ;
    </main>
  );
};
export default Cart;
