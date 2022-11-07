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
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const handleGetTrips = async () => {
    if (origin !== "" && destination !== "" && date !== "" && time != "") {
      setGetTrips(true);
      const { data } = await axios.get(
        `https://v5.db.transport.rest/journeys?from=${origin}&to=${destination}&departure=${
          date + "T" + time
        }&bus=false&tickets=true&results=5`
      );
      if (data) {
        const journeys = data.journeys;
        setTrips(journeys);
        setGetTrips(false);
      }
    }
  };

  const classes = useStyles();

  return (
    <Card className={classes.searchCard}>
      <CardContent>
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
            <label
              htmlFor="date"
              style={{ color: "black", fontWeight: 600, fontSize: 20 }}
            >
              Choose Date
            </label>
            <TextField
              type={"date"}
              fullWidth
              variant="outlined"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <label
              htmlFor="date"
              style={{ color: "black", fontWeight: 600, fontSize: 20 }}
            >
              Choose Time
            </label>
            <TextField
              type={"time"}
              fullWidth
              variant="outlined"
              name="time"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            onClick={handleGetTrips}
            className={classes.bookButton}
            disabled={getTrips}
          >
            Find trips
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
}
