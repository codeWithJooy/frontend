import moment from "moment";
export const roomAddHelper = (floorName, roomTypes) => {
  const arr = [];
  let counter = 1;
  if (roomTypes.single !== "") {
    if (floorName === "Ground Floor") {
      for (let i = 1; i <= parseInt(roomTypes.single); i++) {
        let room = {};
        room.floor = "Ground Floor";
        room.name = "Ground" + counter;
        room.status = "Vacant";
        room.type = "Single";
        room.rate = 0;
        counter = counter + 1;
        arr.push(room);
      }
    } else {
      for (let i = 1; i <= parseInt(roomTypes.single); i++) {
        let floorNumber = floorName.split(" ")[1];
        let room = {};
        room.floor = floorName;
        room.name = floorNumber * 100 + counter;
        room.status = "Vacant";
        room.type = "Single";
        room.rate = 0;
        arr.push(room);
        counter = counter + 1;
      }
    }
  }
  if (roomTypes.double !== "") {
    if (floorName === "Ground Floor") {
      for (let i = 1; i <= parseInt(roomTypes.double); i++) {
        let room = {};
        room.floor = "Ground Floor";
        room.name = "Ground" + counter;
        room.status = "Vacant";
        room.type = "Double";
        room.rate = 0;
        arr.push(room);
        counter = counter + 1;
      }
    } else {
      for (let i = 1; i <= parseInt(roomTypes.double); i++) {
        let floorNumber = floorName.split(" ")[1];
        let room = {};
        room.floor = floorName;
        room.name = floorNumber * 100 + counter;
        room.status = "Vacant";
        room.type = "Double";
        room.rate = 0;
        arr.push(room);
        counter = counter + 1;
      }
    }
  }
  if (roomTypes.triple !== "") {
    if (floorName === "Ground Floor") {
      for (let i = 1; i <= parseInt(roomTypes.triple); i++) {
        let room = {};
        room.floor = "Ground Floor";
        room.name = "Ground" + counter;
        room.status = "Vacant";
        room.type = "Triple";
        room.rate = 0;
        arr.push(room);
        counter = counter + 1;
      }
    } else {
      for (let i = 1; i <= parseInt(roomTypes.triple); i++) {
        let floorNumber = floorName.split(" ")[1];
        let room = {};
        room.floor = floorName;
        room.name = floorNumber * 100 + counter;
        room.status = "Vacant";
        room.type = "Triple";
        room.rate = 0;
        arr.push(room);
        counter = counter + 1;
      }
    }
  }
  return arr;
};
export const monthName = (number) => {
  const months = [
    { name: "Jan", days: 31 },
    { name: "Feb", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "Jun", days: 30 },
    { name: "July", days: 31 },
    { name: "Aug", days: 31 },
    { name: "Sep", days: 30 },
    { name: "Oct", days: 31 },
    { name: "Nov", days: 30 },
    { name: "Dec", days: 31 },
  ];
  return months[number];
};
export const monthNameByDate = (date) => {
  const months = [
    { name: "Jan", days: 31 },
    { name: "Feb", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "Jun", days: 30 },
    { name: "July", days: 31 },
    { name: "Aug", days: 31 },
    { name: "Sep", days: 30 },
    { name: "Oct", days: 31 },
    { name: "Nov", days: 30 },
    { name: "Dec", days: 31 },
  ];
  const newDate = new Date(date);
  let present_month = newDate.getMonth();
  return months[present_month];
};
export const calculateDue = (rent, day, maxDay) => {
  return Math.floor((rent * (maxDay - day + 1)) / maxDay);
};
export const calculateTotalDues = (arr) => {
  let val = 0;

  let data = arr.map((data) => {
    val = val + parseInt(data.due) - parseInt(data.collection);
  });
  return val;
};
export const allDues = (dues, collection) => {
  let val = 0;
  let col = 0;
  for (let i = 0; i < dues.length; i++) {
    for (let j = 0; j < dues[i].dues.length; j++) {
      val = val + parseInt(dues[i].dues[j].due);
    }
  }
  for (let i = 0; i < collection.length; i++) {
    for (let j = 0; j < collection[i].collections.length; j++) {
      col = col + parseInt(collection[i].collections[j].amount);
    }
  }
  return val - col;
};
export const generateIndiDues = (dues, collection, tenantId) => {
  const collections = collection.filter((unit) => unit.tenantId == tenantId);

  let val = 0;
  let col = 0;
  for (let i = 0; i < dues.length; i++) {
    val = val + parseInt(dues[i].due);
  }

  for (let i = 0; i < collections.length; i++) {
    for (let j = 0; j < collections[i].collections.length; j++) {
      col = col + parseInt(collection[i].collections[j].amount);
    }
  }

  return val - col;
};
export const generateLockIn = (period, date, rent) => {
  const newDate = new Date(date);
  let present_month = newDate.getMonth();
  let present_year = newDate.getFullYear();
  let newYear = present_year;

  let arr = [];
  for (let i = 1; i < period; i++) {
    let testMonth = (present_month + i) % 12;
    if (testMonth < present_month) {
      newYear = present_year + 1;
    }

    let obj = {
      type: monthName(testMonth).name + " Rent",
      rent: rent,
      due: rent,
      collection: 0,
      description: "",
      dueDate: moment({ year: newYear, month: testMonth, day: 1 }).format(
        "YYYY-MM-DD"
      ),
    };
    arr.push(obj);
  }

  return arr;
};
