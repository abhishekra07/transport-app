import React from "react";
import "./tableContent.css";

function TableContent({ selectedRow }) {
  const renderRows = () => {
    return Object.entries(selectedRow).map(([key, value]) => (
      <tr key={key}>
        <td className="field">{key}</td>
        <td className="value">{value}</td>
      </tr>
    ));
  };

  return (
    <div className="modal-content-inner">
      <h2 className="modal-title">Shipment Details</h2>
      <table className="shipment-table">
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
}

export default TableContent;
