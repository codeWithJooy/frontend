import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Rooms.css";
import { roomData } from "../../../data/roomData";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import { useHistory } from "react-router-dom";
import { roomUpdate, selectedRoom } from "../../../actions/roomActions";

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
      <Header type={"back"} name={"Room"} link={"/rooms"} />
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
      <Footer page={"Property"} />
    </div>
  );
};
export default RoomUnit;

const TenantDetails = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/addtenant");
  };
  return (
    <div className="tenantDetails">
      <div className="tenantEmpty">
        <div className="emptyPics">
          <img src="Assets/Property/bed.png" />
        </div>
        <div className="emptyText">{"No Tenants added yet."}</div>
        <div className="emptyButton">
          <button onClick={handleClick}>Add Tenant</button>
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
  const roomDispatch = useDispatch();
  const { floor, name, rate, status, type } = room;
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    floor: floor,
    name: name,
    title: name,
    rent: rate,
  });
  const handleEdit = () => {
    setEdit(!edit);
  };
  const handleUpdate = () => {
    roomDispatch(roomUpdate(data));
    setEdit(!edit);
  };
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
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
              <input
                type="text"
                name="title"
                defaultValue={data.title}
                onChange={handleChange}
                readOnly={!edit}
              />
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
              Rs
              <input
                type="text"
                name="rent"
                value={data.rent}
                onChange={handleChange}
                className="rateInput"
                readOnly={!edit}
              />{" "}
              / bed
            </div>
          </div>
        </div>
      </div>
      <img
        src={`${
          edit ? "Assets/Property/done.png" : "Assets/Property/edit.png"
        }`}
        className="editButton"
        onClick={edit ? handleUpdate : handleEdit}
      />
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
