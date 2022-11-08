import {
  CardHeader,
  Typography,
  Card,
  makeStyles,
  createStyles,
  CardContent,
  Grid,
  Button,
  Collapse,
} from "@material-ui/core";
import { useState } from "react";
import {
  displayDateTime,
  getCardHeader,
  getTicketPrice,
  getTravelDuration,
} from "../../helpers/trip-details-extractor";
import TravelTimeline from "../timeline";

interface TripDetailsProps {
  trips: {
    legs: Array<any>;
    price: { amount: number; currency: string; hint: any };
    refreshToken: string;
    type: string;
  };
}

const useStyles = makeStyles(theme =>
  createStyles({
    tripDetailsCard: {
      width: "80vw",
    },
    detailsButton: {
      marginTop: theme.spacing(-3),
    },
  })
);

export default function TripDetailsCard({ trips }: TripDetailsProps) {
  const { legs, price } = trips;
  const classes = useStyles();
  const [moreDetails, setMoreDetails] = useState<boolean>(false);

  const handleShowMoreDetails = () => {
    setMoreDetails(!moreDetails);
  };

  return (
    <Card className={classes.tripDetailsCard}>
      <CardHeader
        title={getCardHeader(legs)}
        subheader={`Total Duration: ${getTravelDuration(legs)} `}
      />
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant={"h5"} component={"h5"}>
              Departure Date: {displayDateTime(legs[0].departure, "date")}
            </Typography>
            <Typography variant={"h5"} component={"h5"}>
              Arrival Date :{" "}
              {displayDateTime(legs[legs.length - 1].arrival, "date")}
            </Typography>
            <Typography variant={"h5"} component={"h5"}>
              Departure Time: {displayDateTime(legs[0].departure, "time")}
            </Typography>
            <Typography variant={"h5"} component={"h5"}>
              Arrival Time :{" "}
              {displayDateTime(legs[legs.length - 1].arrival, "time")}
            </Typography>
            <Typography variant={"h5"} component={"h5"}>
              Transfers: {legs.length - 1}
            </Typography>
          </Grid>
          <Grid item style={{ alignSelf: "center" }}>
            <Typography variant={"h5"} component={"h5"} align={"right"}>
              Price: {getTicketPrice(price)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Collapse in={moreDetails} timeout="auto" unmountOnExit>
        <CardContent>
          <TravelTimeline legs={legs} />
        </CardContent>
      </Collapse>
      <CardContent>
        <Grid
          container
          justifyContent="center"
          className={classes.detailsButton}
        >
          <Button onClick={handleShowMoreDetails}>
            {moreDetails ? "Hide Timeline" : "Show Timeline"}
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
}
