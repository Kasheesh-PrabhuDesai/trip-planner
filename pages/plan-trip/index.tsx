import {
  TextField,
  Grid,
  Button,
  makeStyles,
  createStyles,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import SearchCard from "../../src/components/cards/search-inputs-card";
import TripDetailsCard from "../../src/components/cards/trip-details-card";

export default function PlanTripPage() {
  const [trips, setTrips] = useState([]);
  const [getTrips, setGetTrips] = useState<boolean>(false);

  return (
    <>
      <Grid container justifyContent="center" item>
        <SearchCard
          setTrips={setTrips}
          setGetTrips={setGetTrips}
          getTrips={getTrips}
        />
      </Grid>
      {getTrips && (
        <Grid container justifyContent="center" item>
          <Typography variant={"h2"} component={"h2"}>
            Getting trip details........
            <CircularProgress />
          </Typography>
        </Grid>
      )}

      {!getTrips &&
        trips.map((trips, index) => (
          <Grid container item justifyContent="center">
            <TripDetailsCard trips={trips} key={index} />
          </Grid>
        ))}
    </>
  );
}
