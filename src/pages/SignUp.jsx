import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

//import "./css/SignUp.css";
import userAxios from "../apis/userAxios";
import getUser from "../apis/getUser";
import setUser from "../utils/setUser";
import { isLoginStore } from "../utils/store";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  colors,
  createTheme,
} from "@mui/material";
import { ReactComponent as GoatIcon } from "../assets/GOAT.svg";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import {
  GiBasketballBall,
  GiPingPongBat,
  GiShuttlecock,
  GiSoccerBall,
} from "react-icons/gi";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

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
    value: "40",
    label: "40대",
  },
  {
    value: "50",
    label: "50대",
  },
];

const defaultTheme = createTheme();

function SignUp() {
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [preferSport, setPreferSport] = useState(null);
  // const [soccerTier, setSoccerTier] = useState(null);
  // const [basketballTier, setBasketballTier] = useState(null);
  // const [badmintonTier, setBadmintonTier] = useState(null);
  // const [tableTennisTier, setTableTennisTier] = useState(null);
  const [step, setStep] = useState(1);

  const { setIsLogin } = isLoginStore();
  const navigate = useNavigate();

  const stepOneHandler = (e) => {
    const data = new FormData(e.currentTarget);
    setAge(data.get("age"));
    setNickname(data.get("nickName"));
    setGender(data.get("gender"));
    setStep(2);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    await userAxios
      .post(
        "",
        {
          age: age,
          gender: gender,
          nickname: nickname,
          prefer_sport: preferSport,
          soccer_tier: data.get("soccerTier"),
          basketball_tier: data.get("basketballTier"),
          badminton_tier: data.get("badmintonTier"),
          tableTennis_tier: data.get("tableTennisTier"),
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then(async (res) => {
        console.log(res);
        const data = await getUser();
        setUser(data);
        localStorage.setItem("isLogin", true);
        setIsLogin(true);
        navigate("/Main");
      })
      .catch((error) => {
        console.error(error);
        alert("회원가입 실패");
        navigate("/");
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: "1",
        }}
      ></Box>
      <Box
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?sports)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          direction={"row"}
          alignItems={"center"}
          justifyContent="center"
          spacing={1}
          sx={{ zIndex: "2" }}
        >
          <Grid
            item
            lg={3}
            alignContent={"center"}
            color="#f4f4f4"
            sx={{
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <GoatIcon width="300px" height="300px" />
            <h1>GOAT 회원가입하기</h1>
          </Grid>

          <Stack>
            <Container component="main">
              <CssBaseline />
              <Box
                width={"510px"}
                alignItems={"center"}
                sx={{
                  mt: 8,
                  padding: "40px 60px",
                  display: "flex",
                  flexDirection: "column",

                  bgcolor: "#ffffff",
                  boxShadow: 3,
                  borderRadius: 1,
                }}
              >
                <Stack component={"header"} color="#747474">
                  <h4>단계 {step} / 2</h4>
                </Stack>
                {step === 1 && (
                  <Box
                    component={"form"}
                    noValidate
                    onSubmit={stepOneHandler}
                    sx={{ mt: 3 }}
                  >
                    <h1>선수 정보 입력하기</h1>
                    <TextField
                      name="nickName"
                      required
                      fullWidth
                      id="nickName"
                      label="닉네임"
                      autoFocus
                      sx={{ mt: 4 }}
                    />

                    <TextField
                      name="age"
                      select
                      required
                      fullWidth
                      id="age"
                      label="나이대"
                      defaultValue=""
                      sx={{ mt: 2 }}
                    >
                      {ages.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <FormControl sx={{ mt: 2 }}>
                      <FormLabel id="gender">성별</FormLabel>
                      <RadioGroup row name="gender-group">
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
                    <Stack flexDirection={"row"} justifyContent={"right"}>
                      <Button
                        endIcon={<CgChevronRight />}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        다음으로
                      </Button>
                    </Stack>
                  </Box>
                )}
                {step === 2 && (
                  <Box
                    component={"form"}
                    noValidate
                    onSubmit={signUpHandler}
                    sx={{ mt: 3 }}
                  >
                    <h1>선호 스포츠 선택하기</h1>
                    <RadioGroup
                      name="preferSport"
                      value={preferSport}
                      sx={{
                        flexDirection: "row",
                        mt: 2,
                        justifyContent: "space-around",
                        alignContent: "space-around",
                      }}
                    >
                      <Card
                        raised={preferSport === "soccer"}
                        sx={{
                          maxWidth: "40%",
                          outline: "1px solid",
                          outlineColor:
                            gender === "soccer" ? "primary.main" : "divider",
                          backgroundColor:
                            gender === "soccer" ? "background.default" : "",
                        }}
                      >
                        <CardActionArea
                          onClick={() => setPreferSport("soccer")}
                        >
                          <CardContent
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <GiSoccerBall
                              fill={
                                preferSport === "soccer" ? "skyblue" : "gray"
                              }
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
                            gender === "basketBall"
                              ? "primary.main"
                              : "divider",
                          backgroundColor:
                            gender === "basketBall" ? "background.default" : "",
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
                    </RadioGroup>
                    <RadioGroup
                      name="preferSport"
                      value={preferSport}
                      sx={{
                        flexDirection: "row",
                        mt: 2,
                        justifyContent: "space-around",
                        alignContent: "space-around",
                      }}
                    >
                      <Card
                        raised={preferSport === "badminton"}
                        sx={{
                          maxWidth: "40%",
                          outline: "1px solid",
                          outlineColor:
                            gender === "badminton" ? "primary.main" : "divider",
                          backgroundColor:
                            gender === "badminton" ? "background.default" : "",
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
                            gender === "tableTennis"
                              ? "primary.main"
                              : "divider",
                          backgroundColor:
                            gender === "tableTennis"
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

                    <TextField
                      name="soccerTier"
                      required
                      fullWidth
                      id="soccerTier"
                      label="축구 실력"
                      sx={{ mt: 2 }}
                    />

                    <TextField
                      name="basketballTier"
                      required
                      fullWidth
                      id="basketballTier"
                      label="농구 실력"
                      sx={{ mt: 2 }}
                    />

                    <TextField
                      name="badmintonTier"
                      required
                      fullWidth
                      id="badmintonTier"
                      label="배드민턴 실력"
                      sx={{ mt: 2 }}
                    />

                    <TextField
                      name="tableTennisTier"
                      required
                      fullWidth
                      id="tableTennisTier"
                      label="탁구 실력"
                      sx={{ mt: 2 }}
                    />
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <Button
                        startIcon={<CgChevronLeft />}
                        variant="text"
                        onClick={() => setStep(1)}
                        sx={{ mt: 3, mb: 2 }}
                      >
                        뒤로가기
                      </Button>
                      <Button
                        endIcon={<CgChevronRight />}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        가입하기
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Box>
            </Container>
          </Stack>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default SignUp;
