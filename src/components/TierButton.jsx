import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { FaLeaf, FaSeedling } from "react-icons/fa";
import { PiFlowerFill } from "react-icons/pi";

function TierButton(props) {
  const tierChange = (event, nextTier) => {
    props.setTier(nextTier);
  };
  return (
    <ToggleButtonGroup
      orientation={props.orientation}
      value={props.tier}
      exclusive
      onChange={tierChange}
    >
      <ToggleButton value="1" aria-label="seedling" sx={{ padding: "19px" }}>
        <FaSeedling fill="#9ACD32" fontSize="30px" />
      </ToggleButton>
      <ToggleButton value="2" aria-label="apple" sx={{ padding: "19px" }}>
        <FaLeaf fill="	#3CB371" fontSize="30px" />
      </ToggleButton>
      <ToggleButton value="3" aria-label="tree" sx={{ padding: "19px" }}>
        <PiFlowerFill fill="#FFB6C1" fontSize="30px" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default TierButton;
