import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TrainIcon from "@material-ui/icons/Train";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { displayDateTime } from "../../helpers/trip-details-extractor";

interface TravelTimelineProps {
  legs: Array<any>;
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  icons: {
    width: 28,
    height: 28,
  },
}));

export default function TravelTimeline({ legs }: TravelTimelineProps) {
  const classes = useStyles();
  return (
    <Timeline align="alternate">
      {legs.map((item, index) => (
        <>
          <TimelineItem key={item.tripId}>
            <TimelineOppositeContent>
              {item?.line?.name && (
                <Typography variant={"h3"} color="textSecondary">
                  {displayDateTime(item.departure, "time")} via{" "}
                  {item.line.name ?? "TBD"}
                </Typography>
              )}
              {item?.walking && (
                <Typography variant={"h3"} color="textSecondary">
                  {displayDateTime(item.departure, "time")} via walking
                </Typography>
              )}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                {item?.line?.mode === "train" && (
                  <TrainIcon className={classes.icons} />
                )}
                {item?.line?.mode === "bus" && (
                  <AirportShuttleIcon className={classes.icons} />
                )}
                {item?.walking && (
                  <DirectionsWalkIcon className={classes.icons} />
                )}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={5} className={classes.paper}>
                {item?.line?.mode === "train" && (
                  <Typography>
                    Board the {item?.line?.mode} at {item?.origin?.name}{" "}
                    platform {item?.departurePlatform ?? "TBD"}
                  </Typography>
                )}
                {item?.line?.mode === "bus" && (
                  <Typography>
                    Board the {item?.line?.mode} at {item?.origin?.name}{" "}
                  </Typography>
                )}
                {item?.walking && (
                  <Typography>Walk until {item?.destination?.name}</Typography>
                )}
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography variant={"h3"} color="textSecondary">
                {displayDateTime(item.arrival, "time")}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                {item?.line?.mode === "train" && (
                  <TrainIcon className={classes.icons} />
                )}
                {item?.line?.mode === "bus" && (
                  <AirportShuttleIcon className={classes.icons} />
                )}
                {item?.walking && (
                  <DirectionsWalkIcon className={classes.icons} />
                )}
              </TimelineDot>
              {index !== legs.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={5} className={classes.paper}>
                {item?.line?.mode === "train" && (
                  <Typography>
                    Arrival at {item?.destination?.name} platform{" "}
                    {item?.arrivalPlatform ?? "TBD"}
                  </Typography>
                )}
                {item?.line?.mode !== "train" && (
                  <Typography>Arrival at {item?.destination?.name}</Typography>
                )}
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      ))}
    </Timeline>
  );
}
