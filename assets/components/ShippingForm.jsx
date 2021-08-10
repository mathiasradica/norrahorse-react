import React from "react";
import { validateForm } from "../app";
import { useHistory } from "react-router-dom";

const ShippingForm = ({cart}) => {
  let history = useHistory();

  function handleSubmit() {
    
    let valid = validateForm();

    if (valid && cart.items.length > 0) {
      
      let shippingInfo = {
        
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        company: $("#company").val(),
        streetAddress1: $("#streetAddress1").val(),
        streetAddress2: $("#streetAddress2").val(),
        zipCode: $("#zipCode").val(),
        city: $("#city").val(),
        telephone: $("#telephone").val(),
        email: $("#email").val(),
        marketing: $("#marketing").val(),
        deliveryInfo: $("#deliveryInfo").val(),
      };

      history.push({pathname:"/checkout/confirmation", state:shippingInfo})
    }
  };

  return (
    <form className="shipping-form">
      <div>
        <label>Etunimi *</label>
        <input type="text" id="firstName" className="form-control" required />
        <p></p>
      </div>
      <div>
        <label>Sukunumi *</label>
        <input type="text" className="form-control" id="lastName" required />
        <p></p>
      </div>
      <div>
        <label>Yritys</label>
        <input type="text" className="form-control" id="company" />
      </div>
      <div>
        <label>Katuosoite *</label>
        <input
          type="text"
          className="form-control"
          id="streetAddress1"
          required
        />
        <p></p>
      </div>
      <div>
        <label></label>
        <input type="text" className="form-control" id="streetAddress2" />
      </div>
      <div>
        <label>Postinumero *</label>
        <input type="text" className="form-control" id="zipCode" required />
        <p></p>
      </div>
      <div>
        <label>Paikkakunta *</label>
        <input type="text" className="form-control" id="city" required />
        <p></p>
      </div>
      <div>
        <label>Puhelinumero *</label>
        <input
          type="text"
          className="form-control"
          id="telephone"
          defaultValue="+358"
          required
        />
        <p></p>
      </div>
      <div>
        <label>Säkhöpostiosoite *</label>
        <input type="text" className="form-control" id="email" required />
        <p></p>
      </div>
      <div>
        <input
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            borderRadius: "0",
          }}
          type="checkbox"
          id="marketing"
        />
        <label style={{ color: "#5f5f5f" }} className="align-top">
          Minulle saa lähettää Norra Horsen markkinointimateriaalia
        </label>
      </div>
      <div>
        <label style={{ color: "#5f5f5f" }}>Toimituksen lisätiedot </label>
        <textarea
          style={{ borderRadius: "0" }}
          className="form-control"
          id="deliveryInfo"
        ></textarea>
      </div>
      <span>Viestiin mahtuu maksimissaan 235 merkkiä</span>
      <span
        style={{
          width: "220px",
          height: "50px",
          cursor: "pointer",
          textAlign: "center",
        }}
        className="checkout-page-btn float-end mt-5 p-3"
        onClick={handleSubmit}
      >
        Seuraava
      </span>
    </form>
  );
};
export default ShippingForm;
