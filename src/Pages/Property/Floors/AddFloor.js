import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRooms } from "../../../actions/floorActions";
import "./Floors.css";

const AddFloor = ({ setFloorDetails, floorName }) => {
  const [roomActive, setRoomActive] = useState(false);
  const handleRoomActive = () => {
    setRoomActive(!roomActive);
  };

  return (
    <div className="floorAdd">
      <div className="floorAddUnit">
        <div className="addUnitTop">
          <p>Add Units to {floorName}</p>
          <img
            src="Assets/Footer/plus.png"
            onClick={() => setFloorDetails(false)}
          />
        </div>
        <div className="addUnitMain">
          <div className="addMainTitle">
            <p>Select Room/Unit types on this floor</p>
          </div>
          <div className="addUnitSelect">
            <div
              className={roomActive ? `addSelectUnitActive` : `addSelectUnit`}
              onClick={handleRoomActive}
            >
              Rooms
            </div>
            <div className="addSelectUnit">RK</div>
            <div className="addSelectUnit">BHK</div>
            <div className="addSelectUnit">Apartment</div>
          </div>
        </div>
        {roomActive && <AddUnit floorName={floorName} />}
      </div>
    </div>
  );
};

export default AddFloor;

const AddUnit = ({ floorName }) => {
  const [roomTypes, setRoomTypes] = useState({
    single: 1,
    double: 1,
    triple: 1,
  });
  const dispatch = useDispatch();
  const handleRoomsAdd = () => {
    dispatch(addRooms({ name: floorName, roomsType: roomTypes }));
  };

  return (
    <div className="addRoom">
      <div class="addRoomQuantity">
        <div className="addQuantityTitle">
          <p>Room</p>
        </div>
        <div className="addQuantityUnit">
          <input type="text" />
          <p>Sigle Sharing</p>
        </div>
        <div className="addQuantityUnit">
          <input type="text" />
          <p>Double Sharing</p>
        </div>
        <div className="addQuantityUnit">
          <input type="text" />
          <p>Triple Sharing</p>
        </div>
      </div>
      <button onClick={handleRoomsAdd}>Add Unit</button>
    </div>
  );
};
