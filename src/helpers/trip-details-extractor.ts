import moment from "moment";

export const getCardHeader = (legs: Array<any>) => {
  let cardHeader = "";
  for (var i = 0; i < legs.length; i++) {
    cardHeader += legs[i]?.origin?.name + " - ";
  }
  cardHeader += legs[legs.length - 1]?.destination?.name;
  return cardHeader;
};

export const getTrainNameDetails = (legs: Array<any>) => {
  let trains = [];
  for (var i = 0; i < legs.length; i++) {
    trains.push(legs[i]?.line?.name);
  }

  return trains;
};

export const getTravelDuration = (legs: Array<any>) => {
  const departureTime = moment.utc(new Date(legs[0]?.departure));
  const arrivalTime = moment.utc(new Date(legs[legs.length - 1]?.arrival));
  if (arrivalTime.isBefore(departureTime)) departureTime.add(1, "day");
  var d = moment.duration(arrivalTime.diff(departureTime));
  if (d.get("days") >= 1) {
    return `${d.get("days")} days, ${d.get("hours")} hours, ${d.get(
      "minutes"
    )} minutes`;
  }
  return `${d.get("hours")} hours, ${d.get("minutes")} minutes`;
};

export const getTicketPrice = (price: {
  amount: number | string;
  hint: any;
  currency: string;
}) => {
  return `${price?.amount ?? "no price details available"} ${
    price?.currency ?? ""
  }`;
};

export const displayDateTime = (inputDate: string, mode: string) => {
  if (mode === "date") {
    return moment(new Date(inputDate)).format("D/M/Y");
  }
  if (mode === "time") {
    return moment(new Date(inputDate)).format("hh:mm a");
  }
};

export const getPlatformDetails = (legs: Array<any>) => {
  return {
    departure: legs[0].departurePlatform,
    arrival: legs[0].arrivalPlatform,
  };
};
