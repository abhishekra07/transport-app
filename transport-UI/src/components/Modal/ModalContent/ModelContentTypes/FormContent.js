import React from "react";
import "./formContent.css";

function FormContent({ selectedRow }) {
  return (
    <>
      <h2 class="modal-title">Shipment Details</h2>
      <div className="edit-form-container">
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="srtcChallanNumber">SRTC Challan Number</label>
              <input
                type="text"
                id="srtcChallanNumber"
                value={selectedRow.companyChallanNumber}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="truckNumber">Truck No</label>
              <input
                type="text"
                id="truckNumber"
                value={selectedRow.truckNumber}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="wagonNumber">Toli Number</label>
              <input
                type="text"
                id="wagonNumber"
                value={selectedRow.toliNumber}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="typeOfCement">Type Of Cement</label>
              <select id="typeOfCement" selected={selectedRow.productName}>
                <option value="">Select Type Of Cement</option>
                <option value="OPC 43">OPC 43</option>
                <option value="PPC">PPC</option>
                <option value="PPC NFR">PPC NFR</option>
                <option value="OPC 53">OPC 53</option>
                <option value="STRONGCRET">STRONGCRET</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="truckNumber">Truck No</label>
              <input
                type="text"
                id="truckNumber"
                value={selectedRow.toliNumber}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="ownerTransporter">Owner/Transporter</label>
              <input
                type="text"
                id="ownerTransporter"
                value={selectedRow.toliNumber}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="quantityInBags">Quantity in Bags</label>
              <input
                type="text"
                id="quantityInBags"
                value={selectedRow.quantity}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="partyName">Party Name</label>
              <input
                type="text"
                id="partyName"
                value={selectedRow.sourcePartyName}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="deliveryLocation">Delivery Location</label>
              <input
                type="text"
                id="deliveryLocation"
                value={selectedRow.destinationName}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="totalFreight">Total Freight</label>
              <input
                type="text"
                id="totalFreight"
                value={selectedRow.freight}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="remarks">
                Remark/Receipt Date/Shortage/Balance Paid
              </label>
              <textarea
                id="remarks"
                rows="4"
                value={selectedRow.remark}
              ></textarea>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="submit-btn"
          style={{ marginLeft: "10px" }}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default FormContent;
