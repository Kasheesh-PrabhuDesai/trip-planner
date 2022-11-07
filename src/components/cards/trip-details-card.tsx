import {
  CardHeader,
  Typography,
  Card,
  makeStyles,
  createStyles,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    tripDetailsCard: {
      width: "80vw",
      height: 300,
    },
    cardHeader: {
      height: "20%",
    },
  })
);

const getCardHeader = legs => {
  let cardHeader = "";
  for (var i = 0; i < legs.length; i++) {
    cardHeader += legs[i]?.origin?.name + " - ";
  }
  cardHeader += legs[legs.length - 1]?.destination?.name;
  return cardHeader;
};

const getTrainDetails = legs => {
  let trains = "";
  for (var i = 0; i < legs.length; i++) {
    trains += legs[i]?.line?.name + " - ";
  }

  return trains;
};

export default function TripDetailsCard({ trips }) {
  const { legs, price } = trips;
  const transfers = legs.length;
  console.log(legs);
  const classes = useStyles();
  return (
    <Card className={classes.tripDetailsCard}>
      <CardHeader title={getCardHeader(legs)} className={classes.cardHeader} />
      <CardContent>
        <Typography>{getTrainDetails(legs)}</Typography>
        <Typography variant={"h4"} component={"h5"}>
          Departure Date:{" "}
          {new Date(legs[0]?.departure).toLocaleDateString("de")}
        </Typography>
        <Typography variant={"h4"} component={"h5"}>
          Departure Time:{" "}
          {new Date(legs[0]?.departure).toLocaleTimeString("de", {
            timeStyle: "short",
          })}
        </Typography>
        <Typography variant={"h4"} component={"h5"}>
          Arrival Time:{" "}
          {new Date(legs[legs.length - 1]?.arrival).toLocaleTimeString("de", {
            timeStyle: "short",
          })}
        </Typography>
        <Typography variant={"h4"} component={"h5"}>
          Transfers: {legs.length - 1}
        </Typography>
      </CardContent>
    </Card>
  );
}
