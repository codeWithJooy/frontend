import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Rooms.css";
import { roomData } from "../../../data/roomData";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import { selectedRoom } from "../../../actions/roomActions";

const RoomUnit = () => {
  const [navActive, setNavActive] = useState("details");
  const handleDetailsNav = () => {
    setNavActive("details");
  };
  const handleTenantNav = () => {
    setNavActive("tenant");
  };
  return (
    <div className="rooms">
      <Header />
      <div className="roomMain">
        <div className="roomNavbar">
          <div
            className={`navUnit ${navActive === "tenant" ? "navActive" : ""}`}
            onClick={handleTenantNav}
          >
            {"Room's Tenant"}
          </div>
          <div
            className={`navUnit ${navActive === "details" ? "navActive" : ""}`}
            onClick={handleDetailsNav}
          >
            {"Room Details"}
          </div>
        </div>
        {navActive === "details" ? <RoomSection /> : <TenantDetails />}
      </div>
      <Footer />
    </div>
  );
};
export default RoomUnit;

const TenantDetails = () => {
  return (
    <div className="tenantDetails">
      <div className="tenantEmpty">
        <div className="emptyPics">
          <img src="Assets/Property/bed.png" />
        </div>
        <div className="emptyText">{"No Tenants added yet."}</div>
        <div className="emptyButton">
          <button>Add Tenant</button>
        </div>
      </div>
    </div>
  );
};
const RoomSection = () => {
  return (
    <>
      <RoomDetails />
      <RoomFacilities />
    </>
  );
};
const RoomDetails = () => {
  const room = useSelector((state) => state.room.selectedRoom);
  const { floor, name, rate, status, type } = room;
  return (
    <div className="roomDetails">
      <div className="detailsHeader">Room Details</div>
      <div className="roomDetailsHalf">
        <div className="halfUnitLeft">
          <div className="roomDetailsUnit">
            <div className="detailsLabel">
              <p>{"Room Name"}</p>
            </div>
            <div className="detailsInput">
              <p>{name}</p>
            </div>
          </div>
        </div>
        <div className="halfUnitRight">
          <div className="roomDetailsUnit">
            <div className="detailsLabel">
              <p>{"Unit Type"}</p>
            </div>
            <div className="detailsInput">
              <p>Room</p>
            </div>
          </div>
        </div>
      </div>
      <div className="roomDetailsHalf">
        <div className="fullUnit">
          <div className="roomDetailsUnit">
            <div className="detailsLabel">
              <p>{"Floor"}</p>
            </div>
            <div className="detailsInput">
              <p>{floor}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="roomDetailsHalf">
        <div className="halfUnitLeft">
          <div className="roomDetailsUnit">
            <div className="detailsLabel">
              <p>{"Sharing Type"}</p>
            </div>
            <div className="detailsInput">
              <p>{type}</p>
            </div>
          </div>
        </div>
        <div className="halfUnitRight">
          <div className="roomDetailsUnit">
            <div className="detailsLabel">
              <p>{"Rent"}</p>
            </div>
            <div className="detailsInput">
              <p>Rs {rate} / bed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomFacilities = () => {
  return (
    <div className="facilitySection">
      <div className="facilityHeader">Room Facilities</div>
      <div className="facilities">
        {roomData.map((data, index) => (
          <FacilityIcon
            key={index}
            title={data.title}
            normal={data.normal}
            selected={data.selected}
          />
        ))}
      </div>
    </div>
  );
};

const FacilityIcon = ({ title, normal, selected }) => {
  const [selectedIcon, setSelectedIcon] = useState(false);
  return (
    <div
      className="facilityIcons"
      onClick={() => setSelectedIcon(!selectedIcon)}
    >
      <img src={`${selectedIcon ? selected : normal}`} />
      <p className={`${selectedIcon ? "textSelected" : "textNormal"}`}>
        {title}
      </p>
    </div>
  );
};