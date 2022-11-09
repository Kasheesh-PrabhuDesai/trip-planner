import axios from "axios";

const getTrips = async (data: any) => {
  const url = "/api/get-trips/";
  return await axios.post(url, { data });
};

const tripsServices = {
  getTrips,
};

export default tripsServices;
