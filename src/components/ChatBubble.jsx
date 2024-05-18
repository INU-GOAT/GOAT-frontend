import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ChatAvatar from "./ChatAvatar";

function ChatBubble(props) {
  return (
    <Box sx={{ mt: 2, ml: 2, mr: 2 }}>
      <Stack
        direction="row"
        justifyContent={props.isMyChat ? "flex-end" : "flex-start"}
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        {props.isMyChat ? null : (
          <ChatAvatar
            tier={props.tier}
            team={props.team}
            number={props.number}
          />
        )}
        <Stack sx={{ maxWidth: "60%" }}>
          {props.isMyChat ? null : (
            <Typography level="body-xs">{props.nickname}</Typography>
          )}

          <Paper
            variant="outlined"
            sx={{
              px: 1.75,
              py: 1.25,
              borderRadius: 3,
              borderTopLeftRadius: props.isMyChat ? 12 : 0,
              borderTopRightRadius: props.isMyChat ? 0 : 12,
              backgroundColor: props.isMyChat ? "#9376E0" : "white",
              color: props.isMyChat ? "white" : "black",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <h3>{props.chat}</h3>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ChatBubble;
