import React from "react";
import "./dispatchForm.css";

function DispatchForm() {
  return (
    <div className="arrival-form-container">
      <h2>Dispatch FROM THE GODOWN</h2>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="srtcChallanNumber">
              SRTC Challan Number <span className="required">*</span>
            </label>
            <input type="text" id="srtcChallanNumber" required />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="truckNumber">
              Truck No <span className="required">*</span>
            </label>
            <input type="text" id="truckNumber" required />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="wagonNumber">
              Wagon Number/Toli Number <span className="required">*</span>
            </label>
            <input type="text" id="wagonNumber" required />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="typeOfCement">
              Type Of Cement <span className="required">*</span>
            </label>
            <select id="typeOfCement" required>
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
            <label htmlFor="truckNumber">
              Truck No <span className="required">*</span>
            </label>
            <input type="text" id="truckNumber" required />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="ownerTransporter">
              Owner/Transporter <span className="required">*</span>
            </label>
            <input type="text" id="ownerTransporter" required />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="quantityInBags">
              Quantity in Bags <span className="required">*</span>
            </label>
            <input type="text" id="quantityInBags" required />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="partyName">
              Party Name{" "}
              <span className="required">
                <span className="required">*</span>
              </span>
            </label>
            <input type="text" id="partyName" required />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="deliveryLocation">
              Delivery Location <span className="required">*</span>
            </label>
            <input type="text" id="deliveryLocation" required />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="totalFreight">
              Total Freight <span className="required">*</span>
            </label>
            <input type="text" id="totalFreight" required />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="remarks">
              Remark/Receipt Date/Shortage/Balance Paid
            </label>
            <textarea id="remarks" rows="4"></textarea>
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
  );
}

export default DispatchForm;
