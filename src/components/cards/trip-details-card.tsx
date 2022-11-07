import {
  CardHeader,
  Typography,
  Card,
  makeStyles,
  createStyles,
  CardContent,
  Grid,
} from "@material-ui/core";

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
      height: 300,
    },
  })
);

const getCardHeader = (legs: Array<any>) => {
  let cardHeader = "";
  for (var i = 0; i < legs.length; i++) {
    cardHeader += legs[i]?.origin?.name + " - ";
  }
  cardHeader += legs[legs.length - 1]?.destination?.name;
  return cardHeader;
};

const getTrainNameDetails = (legs: Array<any>) => {
  let trains = "";
  for (var i = 0; i < legs.length; i++) {
    trains += legs[i]?.line?.name + " - ";
  }

  return trains;
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

const getTravelDuration = (legs: Array<any>) => {
  const departureTime = new Date(legs[0]?.departure).getTime();
  const arrivalTime = new Date(legs[legs.length - 1]?.arrival).getTime();
  const duration = arrivalTime - departureTime;
  let seconds = Math.floor(duration / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = seconds >= 30 ? minutes + 1 : minutes;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours) + " hours "} , ${
    padTo2Digits(minutes) + " minutes"
  }`;
};

const getTicketPrice = (price: {
  amount: number | string;
  hint: any;
  currency: string;
}) => {
  return `${price?.amount ?? "no price details available"} ${
    price?.currency ?? ""
  }`;
};

export default function TripDetailsCard({ trips }: TripDetailsProps) {
  const { legs, price } = trips;
  console.log(price);
  const classes = useStyles();
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
              Departure Date:{" "}
              {new Date(legs[0]?.departure).toLocaleDateString("de")}
            </Typography>
            <Typography variant={"h5"} component={"h5"}>
              Departure Time:{" "}
              {new Date(legs[0]?.departure).toLocaleTimeString("de", {
                timeStyle: "short",
              })}
            </Typography>
            <Typography variant={"h5"} component={"h5"}>
              Arrival Date:{" "}
              {new Date(legs[0]?.arrival).toLocaleDateString("de")}
            </Typography>
            <Typography variant={"h5"} component={"h5"}>
              Arrival Time:{" "}
              {new Date(legs[0]?.arrival).toLocaleTimeString("de", {
                timeStyle: "short",
              })}
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
    </Card>
  );
}
