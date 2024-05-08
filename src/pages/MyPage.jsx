import React, { useState } from "react";
import SignOut from "../components/SignOut";
import LogOut from "../components/LogOut";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  GiBasketballBall,
  GiPingPongBat,
  GiShuttlecock,
  GiSoccerBall,
} from "react-icons/gi";
import { FaApple, FaSeedling, FaTree } from "react-icons/fa";

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
  const [preferSport, setPreferSport] = useState(null);
  const [tier, setTier] = useState(null);
  const tierChange = (event, nextTier) => {
    setTier(nextTier);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        container
        justifyContent="center"
        spacing={1}
      >
        <CssBaseline />
        <Box
          width={"510px"}
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            boxShadow: 3,
            borderRadius: 1,
          }}
        >
          <Typography component="h1" variant="h5">
            회원 정보 수정
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="닉네임"
                  fullWidth
                  id="firstName"
                  label="닉네임"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="age"
                  select
                  fullWidth
                  id="age"
                  label="나이대"
                  defaultValue=""
                  sx={{ mt: 1 }}
                >
                  {ages.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    성별
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="남성"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="여성"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Stack alignItems={"flex-start"} mt={4} flexDirection={"row"}>
                  <RadioGroup
                    name="preferSport"
                    value={preferSport}
                    sx={{
                      flexDirection: "column",
                      mt: 2,
                      alignContent: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Card
                      raised={preferSport === "soccer"}
                      sx={{
                        maxWidth: "40%",
                        outline: "1px solid",
                        outlineColor:
                          preferSport === "soccer" ? "primary.main" : "divider",
                        backgroundColor:
                          preferSport === "soccer" ? "background.default" : "",
                      }}
                    >
                      <CardActionArea onClick={() => setPreferSport("soccer")}>
                        <CardContent
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <GiSoccerBall
                            fill={preferSport === "soccer" ? "skyblue" : "gray"}
                            size={"100%"}
                          ></GiSoccerBall>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    <Card
                      raised={preferSport === "basketBall"}
                      sx={{
                        maxWidth: "40%",
                        outline: "1px solid",
                        outlineColor:
                          preferSport === "basketBall"
                            ? "primary.main"
                            : "divider",
                        backgroundColor:
                          preferSport === "basketBall"
                            ? "background.default"
                            : "",
                      }}
                    >
                      <CardActionArea
                        onClick={() => setPreferSport("basketBall")}
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <GiBasketballBall
                            fill={
                              preferSport === "basketBall" ? "orange" : "gray"
                            }
                            size={"100%"}
                          ></GiBasketballBall>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    <Card
                      raised={preferSport === "badminton"}
                      sx={{
                        maxWidth: "40%",
                        outline: "1px solid",
                        outlineColor:
                          preferSport === "badminton"
                            ? "primary.main"
                            : "divider",
                        backgroundColor:
                          preferSport === "badminton"
                            ? "background.default"
                            : "",
                      }}
                    >
                      <CardActionArea
                        onClick={() => setPreferSport("badminton")}
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <GiShuttlecock
                            fill={
                              preferSport === "badminton"
                                ? "lightgreen"
                                : "gray"
                            }
                            size={"100%"}
                          ></GiShuttlecock>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    <Card
                      raised={preferSport === "tableTennis"}
                      sx={{
                        maxWidth: "40%",
                        flexGrow: 1,
                        outline: "1px solid",
                        outlineColor:
                          preferSport === "tableTennis"
                            ? "primary.main"
                            : "divider",
                        backgroundColor:
                          preferSport === "tableTennis"
                            ? "background.default"
                            : "",
                      }}
                    >
                      <CardActionArea
                        onClick={() => setPreferSport("tableTennis")}
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <GiPingPongBat
                            fill={
                              preferSport === "tableTennis" ? "red" : "gray"
                            }
                            size={"100%"}
                          ></GiPingPongBat>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </RadioGroup>
                  <Stack>
                    <ToggleButtonGroup
                      value={tier}
                      exclusive
                      onChange={tierChange}
                      sx={{ mt: 4 }}
                    >
                      <ToggleButton
                        value="1"
                        aria-label="seedling"
                        sx={{ padding: "19px" }}
                      >
                        <FaSeedling fill="lightgreen" fontSize="30px" />
                      </ToggleButton>
                      <ToggleButton
                        value="2"
                        aria-label="apple"
                        sx={{ padding: "19px" }}
                      >
                        <FaApple fill="red" fontSize="30px" />
                      </ToggleButton>
                      <ToggleButton
                        value="3"
                        aria-label="tree"
                        sx={{ padding: "19px" }}
                      >
                        <FaTree fill="green" fontSize="30px" />
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                      value={tier}
                      exclusive
                      onChange={tierChange}
                      sx={{ mt: 3 }}
                    >
                      <ToggleButton
                        value="1"
                        aria-label="seedling"
                        sx={{ padding: "19px" }}
                      >
                        <FaSeedling fill="lightgreen" fontSize="30px" />
                      </ToggleButton>
                      <ToggleButton
                        value="2"
                        aria-label="apple"
                        sx={{ padding: "19px" }}
                      >
                        <FaApple fill="red" fontSize="30px" />
                      </ToggleButton>
                      <ToggleButton
                        value="3"
                        aria-label="tree"
                        sx={{ padding: "19px" }}
                      >
                        <FaTree fill="green" fontSize="30px" />
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                      value={tier}
                      exclusive
                      onChange={tierChange}
                      sx={{ mt: 3 }}
                    >
                      <ToggleButton
                        value="1"
                        aria-label="seedling"
                        sx={{ padding: "19px" }}
                      >
                        <FaSeedling fill="lightgreen" fontSize="30px" />
                      </ToggleButton>
                      <ToggleButton
                        value="2"
                        aria-label="apple"
                        sx={{ padding: "19px" }}
                      >
                        <FaApple fill="red" fontSize="30px" />
                      </ToggleButton>
                      <ToggleButton
                        value="3"
                        aria-label="tree"
                        sx={{ padding: "19px" }}
                      >
                        <FaTree fill="green" fontSize="30px" />
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                      value={tier}
                      exclusive
                      onChange={tierChange}
                      sx={{ mt: 3 }}
                    >
                      <ToggleButton
                        value="1"
                        aria-label="seedling"
                        sx={{ padding: "19px" }}
                      >
                        <FaSeedling fill="lightgreen" fontSize="30px" />
                      </ToggleButton>
                      <ToggleButton
                        value="2"
                        aria-label="apple"
                        sx={{ padding: "19px" }}
                      >
                        <FaApple fill="red" fontSize="30px" />
                      </ToggleButton>
                      <ToggleButton
                        value="3"
                        aria-label="tree"
                        sx={{ padding: "19px" }}
                      >
                        <FaTree fill="green" fontSize="30px" />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원 정보 수정하기
            </Button>

            <Grid container justifyContent="flex-end">
              <SignOut></SignOut>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default MyPage;
