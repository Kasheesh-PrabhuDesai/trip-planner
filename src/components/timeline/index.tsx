import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import TrainIcon from "@material-ui/icons/Train";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  displayDateTime,
  getPlatformDetails,
  getTrainNameDetails,
} from "../../helpers/trip-details-extractor";

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
}));

export default function TravelTimeline({ legs }: TravelTimelineProps) {
  const classes = useStyles();
  return (
    <Timeline align="alternate">
      {legs.map((item, index) => (
        <>
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography variant={"h3"} color="textSecondary">
                {displayDateTime(item.departure, "time")} via{" "}
                {item?.line?.name ?? "TBD"}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                <TrainIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={5} className={classes.paper}>
                <Typography>
                  Board the train at {item?.origin?.name} platform{" "}
                  {item?.departurePlatform ?? "TBD"}
                </Typography>
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
                <TrainIcon />
              </TimelineDot>
              {index !== legs.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={5} className={classes.paper}>
                <Typography>
                  Arrival at {item?.destination?.name} platform{" "}
                  {item?.arrivalPlatform ?? "TBD"}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      ))}
    </Timeline>
  );
}
