import React from "react";

const TotalAndTaxTable = ({ classList, cart }) => (
  <table className={classList}>
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
      <tr className="fw-bold">
        <td>Kokonaishinta ALV:än kanssa</td>
        <td>{cart.total.toFixed(2)} &euro;</td>
      </tr>
    </tbody>
  </table>
);

export default TotalAndTaxTable;
