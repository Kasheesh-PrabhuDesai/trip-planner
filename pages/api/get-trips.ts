import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function getTripDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(500).json({ msg: "INCORRECT METHOD" });
  } else {
    try {
      const { origin, destination, date, time } = req.body.data;
      const response = await axios.get(
        `https://v5.db.transport.rest/journeys?from=${origin}&to=${destination}&departure=${
          date + "T" + time
        }&tickets=true&results=5`
      );
      return res.status(200).json({ journeys: response.data.journeys });
    } catch (err: any) {
      return res.status(500).json({ error: err.response.data });
    }
  }
}
