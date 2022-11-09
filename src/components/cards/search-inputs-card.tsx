import {
  CardContent,
  Card,
  Grid,
  TextField,
  Button,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import SearchDestination from "../inputs/destination-input";
import SearchOrigin from "../inputs/origin-input";
import { useSnackbar } from "notistack";
import getTripDetails from "../../../pages/api/get-trips";
import tripsServices from "../../services/get-trips-service";

const useStyles = makeStyles(theme =>
  createStyles({
    bookButton: {
      marginTop: theme.spacing(3),
    },
    searchCard: {
      width: "80vw",
      margin: 30,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), url(${"/db-2.jpg"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    inputFields: {
      marginTop: theme.spacing(2),
    },
    labels: { color: "black", fontWeight: 600, fontSize: 20 },
  })
);

interface SearchCardProps {
  setTrips: (arg: []) => void;
  setGetTrips: (arg: boolean) => void;
  getTrips: boolean;
}

export default function SearchCard({
  setTrips,
  setGetTrips,
  getTrips,
}: SearchCardProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const handleGetTrips = async () => {
    if (origin !== "" && destination !== "" && date !== "" && time != "") {
      setGetTrips(true);
      try {
        const response = await tripsServices.getTrips({
          origin,
          destination,
          date,
          time,
        });
        const journeys = response.data.journeys;
        setTrips(journeys);
        setGetTrips(false);
      } catch (err: any) {
        console.log(err);
        if (err?.response?.data?.error) {
          const errorMsg = err?.response?.data?.error?.message;
          enqueueSnackbar(errorMsg ?? "An error occurred. Please try again", {
            variant: "error",
          });
          setGetTrips(false);
          return;
        }
      }
    }
  };

  const classes = useStyles();

  return (
    <Card className={classes.searchCard}>
      <CardContent>
        <form>
          <Grid container justifyContent="space-evenly">
            <Grid item xs={6}>
              <SearchOrigin setOrigin={setOrigin} />
            </Grid>
            <Grid item xs={6}>
              <SearchDestination setDestination={setDestination} />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-evenly"
            className={classes.inputFields}
          >
            <Grid item xs={6}>
              <label htmlFor="date" className={classes.labels}>
                Choose Date
              </label>
              <TextField
                type={"date"}
                fullWidth
                variant="outlined"
                name="date"
                value={date}
                required
                onChange={e => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <label htmlFor="date" className={classes.labels}>
                Choose Time
              </label>
              <TextField
                type={"time"}
                fullWidth
                variant="outlined"
                name="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            className={classes.bookButton}
          >
            <Button
              variant="contained"
              onClick={handleGetTrips}
              disabled={getTrips}
              type="submit"
            >
              Find trips
            </Button>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
