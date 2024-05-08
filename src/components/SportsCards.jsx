import { Card, CardActionArea, CardContent } from "@mui/material";
import { func } from "prop-types";
import React from "react";
import {
  GiBasketballBall,
  GiPingPongBat,
  GiShuttlecock,
  GiSoccerBall,
} from "react-icons/gi";

export function SoccerCard(props) {
  return (
    <Card
      raised={props.sportState.sport === "soccer"}
      sx={{
        maxWidth: "40%",
        outline: "1px solid",
        outlineColor:
          props.sportState.sport === "soccer" ? "primary.main" : "divider",
        backgroundColor:
          props.sportState.sport === "soccer" ? "background.default" : "",
      }}
    >
      <CardActionArea onClick={() => props.sportState.setSport("soccer")}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GiSoccerBall
            fill={props.sportState.sport === "soccer" ? "skyblue" : "gray"}
            size={"100%"}
          ></GiSoccerBall>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function BasketBallCard(props) {
  return (
    <Card
      raised={props.sportState.sport === "basketBall"}
      sx={{
        maxWidth: "40%",
        outline: "1px solid",
        outlineColor:
          props.sportState.sport === "basketBall" ? "primary.main" : "divider",
        backgroundColor:
          props.sportState.sport === "basketBall" ? "background.default" : "",
      }}
    >
      <CardActionArea onClick={() => props.sportState.setSport("basketBall")}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GiBasketballBall
            fill={props.sportState.sport === "basketBall" ? "orange" : "gray"}
            size={"100%"}
          ></GiBasketballBall>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function BadmintonCard(props) {
  return (
    <Card
      raised={props.sportState.sport === "badminton"}
      sx={{
        maxWidth: "40%",
        outline: "1px solid",
        outlineColor:
          props.sportState.sport === "badminton" ? "primary.main" : "divider",
        backgroundColor:
          props.sportState.sport === "badminton" ? "background.default" : "",
      }}
    >
      <CardActionArea onClick={() => props.sportState.setSport("badminton")}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GiShuttlecock
            fill={
              props.sportState.sport === "badminton" ? "lightgreen" : "gray"
            }
            size={"100%"}
          ></GiShuttlecock>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function TableTennisCard(props) {
  return (
    <Card
      raised={props.sportState.sport === "tableTennis"}
      sx={{
        maxWidth: "40%",
        flexGrow: 1,
        outline: "1px solid",
        outlineColor:
          props.sportState.sport === "tableTennis" ? "primary.main" : "divider",
        backgroundColor:
          props.sportState.sport === "tableTennis" ? "background.default" : "",
      }}
    >
      <CardActionArea onClick={() => props.sportState.setSport("tableTennis")}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GiPingPongBat
            fill={props.sportState.sport === "tableTennis" ? "red" : "gray"}
            size={"100%"}
          ></GiPingPongBat>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
