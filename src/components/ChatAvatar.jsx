import { Avatar, Badge } from "@mui/material";
import React from "react";
import { FaLeaf, FaSeedling } from "react-icons/fa";
import { PiFlowerFill } from "react-icons/pi";

function ChatAvatar(props) {
  const avatarList = [
    "🐭",
    "🐵",
    "🐶",
    "🐺",
    "🐱",
    "🦁",
    "🐯",
    "🦒",
    "🦊",
    "🦝",
    "🐮",
    "🐷",
    "🐗",
    "🐹",
    "🐰",
    "🐻",
    "🐨",
    "🐼",
    "🐸",
    "🦓",
    "🐴",
    "🐔",
  ];
  let tier = null;
  let teamColor = null;
  if (props.tier <= 200) {
    tier = <FaSeedling fill="#9ACD32" fontSize="30px" />;
  } else if (props.tier <= 400) {
    tier = <FaLeaf fill="	#3CB371" fontSize="30px" />;
  } else {
    tier = <PiFlowerFill fill="#FFB6C1" fontSize="30px" />;
  }
  if (props.team === 1) {
    teamColor = "red";
  } else {
    teamColor = "blue";
  }
  return (
    <Badge badgeContent={tier}>
      <Avatar sx={{ bgcolor: teamColor }}>{avatarList[props.number]}</Avatar>
    </Badge>
  );
}

export default ChatAvatar;
