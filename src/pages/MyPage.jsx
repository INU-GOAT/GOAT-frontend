import React, { useState } from "react";
import SignOut from "../components/SignOut";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Badge,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import {
  GiBasketballBall,
  GiPingPongBat,
  GiShuttlecock,
  GiSoccerBall,
} from "react-icons/gi";
import { FaLeaf, FaSeedling } from "react-icons/fa";

import { PiFlowerFill } from "react-icons/pi";

const defaultTheme = createTheme();
const ages = [
  {
    value: "10",
    label: "10대",
  },
  {
    value: "20",
    label: "20대",
  },
  {
    value: "30",
    label: "30대",
  },
  {
    value: "30",
    label: "30대",
  },
  {
    value: "50",
    label: "50대",
  },
];
function MyPage() {
  const myNickname = localStorage.getItem("nickname");
  const myAge = localStorage.getItem("age");
  const myGender = localStorage.getItem("gender");
  const myPreferSport = localStorage.getItem("prefer_sport");
  const [preferSport, setPreferSport] = useState(null);
  const soccerTier = localStorage.getItem("soccer_tier");
  const basketballTier = localStorage.getItem("basketball_tier");
  const badmintonTier = localStorage.getItem("badminton_tier");
  const tableTennisTier = localStorage.getItem("tableTennis_tier");
  const [sport, setSport] = useState(myPreferSport);

  const tier = (tier) => {
    if (tier === "1") {
      return <FaSeedling fill="#9ACD32" fontSize="30px" />;
    } else if (tier === "2") {
      return <FaLeaf fill="	#3CB371" fontSize="30px" />;
    } else {
      return <PiFlowerFill fill="#FFB6C1" fontSize="30px" />;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          maxWidth: "sm",
          marginX: "auto",
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          boxShadow: 3,
          borderRadius: 1,
        }}
      >
        <Typography component="h1" variant="h5">
          회원 정보
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Stack>
            <Stack>
              <TextField
                autoComplete="given-name"
                name="닉네임"
                fullWidth
                id="firstName"
                label="닉네임"
                defaultValue={myNickname}
              />
            </Stack>
            <Stack sx={{ mt: 3 }}>
              <TextField
                name="age"
                select
                fullWidth
                id="age"
                label="나이대"
                defaultValue={myAge}
              >
                {ages.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack sx={{ mt: 3 }}>
              <FormControl>
                <FormLabel name="gender-group" id="gender">
                  성별
                </FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  aria-labelledby="gender-group"
                  defaultValue={myGender}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="남성"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="여성"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Stack>
          <Stack
            display="flex"
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Badge badgeContent={tier(soccerTier)} sx={{ width: "20%" }}>
              <Card
                raised={sport === "soccer"}
                sx={{
                  maxWidth: "100%",
                  outline: "1px solid",
                  outlineColor: sport === "soccer" ? "primary.main" : "divider",
                  backgroundColor:
                    sport === "soccer" ? "background.default" : "",
                }}
              >
                <CardActionArea onClick={() => setSport("soccer")}>
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <GiSoccerBall
                      fill={sport === "soccer" ? "skyblue" : "gray"}
                      size={"100%"}
                    ></GiSoccerBall>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Badge>
            <Badge badgeContent={tier(basketballTier)} sx={{ width: "20%" }}>
              <Card
                raised={sport === "basketBall"}
                sx={{
                  maxWidth: "100%",
                  outline: "1px solid",
                  outlineColor:
                    sport === "basketBall" ? "primary.main" : "divider",
                  backgroundColor:
                    sport === "basketBall" ? "background.default" : "",
                }}
              >
                <CardActionArea onClick={() => setSport("basketBall")}>
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <GiBasketballBall
                      fill={sport === "basketBall" ? "orange" : "gray"}
                      size={"100%"}
                    ></GiBasketballBall>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Badge>
            <Badge badgeContent={tier(badmintonTier)} sx={{ width: "20%" }}>
              <Card
                raised={sport === "badminton"}
                sx={{
                  maxWidth: "100%",
                  outline: "1px solid",
                  outlineColor:
                    sport === "badminton" ? "primary.main" : "divider",
                  backgroundColor:
                    sport === "badminton" ? "background.default" : "",
                }}
              >
                <CardActionArea onClick={() => setSport("badminton")}>
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <GiShuttlecock
                      fill={sport === "badminton" ? "lightgreen" : "gray"}
                      size={"100%"}
                    ></GiShuttlecock>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Badge>
            <Badge badgeContent={tier(tableTennisTier)} sx={{ width: "20%" }}>
              <Card
                raised={sport === "tableTennis"}
                sx={{
                  maxWidth: "100%",
                  flexGrow: 1,
                  outline: "1px solid",
                  outlineColor:
                    sport === "tableTennis" ? "primary.main" : "divider",
                  backgroundColor:
                    sport === "tableTennis" ? "background.default" : "",
                }}
              >
                <CardActionArea onClick={() => setSport("tableTennis")}>
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <GiPingPongBat
                      fill={sport === "tableTennis" ? "red" : "gray"}
                      size={"100%"}
                    ></GiPingPongBat>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Badge>
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
          >
            회원 정보 수정하기
          </Button>

          <Grid container justifyContent="flex-end">
            <SignOut></SignOut>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MyPage;
