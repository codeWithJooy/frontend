import React, { useState } from "react";
import "./Tenant.css";
import moment from "moment/moment";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const AddTenant = () => {
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  const onChangeDate = (e) => {
    const d = new Date(e.target.value);
    console.log(d.getMonth() + 1);
    console.log(d.getDate());
    const newDate = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    setCurrentDate(newDate);
    console.log(newDate); //value picked from date picker
  };
  return (
    <div className="tenantMain">
      <Header />
      <div className="tenantSection">
        <div className="tenantInput">
          <p>Tenant Name</p>
          <input type="text" />
        </div>
        <div className="tenantInput">
          <p>Phone Number</p>
          <input type="text" />
        </div>
        <div className="tenantInput">
          <p>Tenant Room</p>
          <select>
            <option>Hii</option>
            <option>Hello</option>
          </select>
        </div>
        <div className="tenantInput">
          <p>Date of Joining</p>
          <input type="date" value={currentDate} onChange={onChangeDate} />
        </div>
        <div className="tenantAddHalf">
          <div className="tenantAddLeftSection">
            <p>Room Rent</p>
            <input type="number" />
          </div>
          <div className="tenantAddRightSection">
            <p>Security Deposit</p>
            <input type="number" />
          </div>
        </div>
        <div className="tenantBalanceHeader">
          <p>Opening Balance of Tenant</p>
        </div>
        <div className="tenantBalanceSection">
          <div className="section">
            <div className="sectionUnitHeader">Dues Type</div>
            <div className="sectionUnitHeader">Due</div>
            <div className="sectionUnitHeader">Collected</div>
          </div>
          <div className="section">
            <div className="sectionUnit unitMain">Rent</div>
            <div className="sectionUnit">
              <p className="rate">Rs 400</p>
              <p className="range">14 June to 30 June</p>
            </div>
            <div className="sectionUnit collected">
              <img src="Assets/Tenant/edit.png" onClick={handleEdit} />
              <p>0</p>
            </div>
          </div>
          <div className="section">
            <div className="sectionUnit unitMain">Security Deposit</div>
            <div className="sectionUnit">
              <p className="rate">Rs 400</p>
              <p className="range">14 June to 30 June</p>
            </div>
            <div className="sectionUnit collected">
              <img src="Assets/Tenant/edit.png" onClick={handleEdit} />
              <p>0</p>
            </div>
          </div>
          <div className="tenantButton">
            <button>Add Tenant</button>
          </div>
        </div>
      </div>
      <Footer page={"Tenants"} />
      {edit && <TenantPayment setEdit={setEdit} />}
    </div>
  );
};

export default AddTenant;

const TenantPayment = ({ setEdit }) => {
  return (
    <div className="categoryMain">
      <div className="categoryCross">
        <img src="Assets/components/cross.png" onClick={() => setEdit(false)} />
      </div>
      <div className="categoryContainer">
        <div className="categoryTitle">Rent</div>
        <div className="tenantInput">
          <p>Due Amount</p>
          <input type="text" readOnly />
        </div>
        <div className="tenantInput">
          <p>Collection</p>
          <input type="text" />
        </div>
        <div className="tenantInput">
          <p>Description</p>
          <input type="text" />
        </div>
        <div className="tenantInput">
          <p>Payment Date</p>
          <input type="date" />
        </div>
        <div className="paymentMode">
          <p>Payment Mode</p>
          <div className="paymentHolder">
            <div className="paymentUnits paymentActive">
              <img src="Assets/Payment/cash.png" />
              <p>Cash</p>
            </div>
            <div className="paymentUnits">
              <img src="Assets/Payment/gpay.png" />
              <p>GPay</p>
            </div>
            <div className="paymentUnits">
              <img src="Assets/Payment/phonepe.png" />
              <p>PhonePe</p>
            </div>
            <div className="paymentUnits">
              <img src="Assets/Payment/paytm.png" />
              <p>Paytm</p>
            </div>
          </div>
        </div>
        <div className="tenantButton">
          <button style={{ width: "90%", margin: "5%" }}>Save</button>
        </div>
      </div>
    </div>
  );
};
