import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  colors,
  createTheme,
} from "@mui/material";
import { ReactComponent as GoatIcon } from "../assets/GOAT.svg";
import {
  GiBasketballBall,
  GiPingPongBat,
  GiShuttlecock,
  GiSoccerBall,
} from "react-icons/gi";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { FaApple, FaSeedling, FaTree } from "react-icons/fa";
import { grey } from "@mui/material/colors";
import {
  BadmintonCard,
  BasketBallCard,
  SoccerCard,
  TableTennisCard,
} from "./../components/SportsCards";

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
  const [sport, setSport] = useState(null);
  const [preferSport, setPreferSport] = useState(null);
  // const [soccerTier, setSoccerTier] = useState(1);
  // const [basketballTier, setBasketballTier] = useState(1);
  // const [badmintonTier, setBadmintonTier] = useState(1);
  // const [tableTennisTier, setTableTennisTier] = useState(1);
  const [tier, setTier] = useState(null);
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
  const tierChange = (event, nextTier) => {
    setTier(nextTier);
  };
  const signUpHandler = async (e) => {
    e.preventDefault();
    let soccerTier = 1,
      basketballTier = 1,
      badmintonTier = 1,
      tableTennisTier = 1;
    if (preferSport === "soccer") {
      soccerTier = +tier;
    } else if (preferSport === "basketBall") {
      basketballTier = +tier;
    } else if (preferSport === "badminton") {
      badmintonTier = +tier;
    } else if (preferSport === "tableTennis") {
      tableTennisTier = +tier;
    }

    console.log({
      age: age,
      gender: gender,
      nickname: nickname,
      prefer_sport: preferSport,
      soccer_tier: soccerTier,
      basketball_tier: basketballTier,
      badminton_tier: badmintonTier,
      tableTennis_tier: tableTennisTier,
    });
    await userAxios
      .post(
        "",
        {
          age: age,
          gender: gender,
          nickname: nickname,
          prefer_sport: preferSport,
          soccer_tier: soccerTier,
          basketball_tier: basketballTier,
          badminton_tier: badmintonTier,
          tableTennis_tier: tableTennisTier,
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
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "2",
          }}
        ></Box>
        <Box
          sx={{
            position: "fixed",
            backgroundImage: "url(https://source.unsplash.com/random?sports)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",

            alignItems: "center",
            zIndex: "1",
          }}
        ></Box>
        <Grid
          container
          direction={"row"}
          alignItems={"center"}
          justifyContent="center"
          spacing={1}
          sx={{ zIndex: "3", position: "relative", mt: "0", height: "100%" }}
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
              alignContent: "center",
              flexWrap: "wrap",
            }}
          >
            <GoatIcon width="300px" height="300px" />
            <h2>GOAT 회원가입하기</h2>
          </Grid>

          <Stack>
            <Container component="main">
              <CssBaseline />
              <Box
                width={"510px"}
                alignItems={"stretch"}
                sx={{
                  mt: 8,
                  mb: 8,
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
                    <h2>선수 정보 입력하기</h2>
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
                      <FormLabel name="gender-group" id="gender">
                        성별
                      </FormLabel>
                      <RadioGroup
                        row
                        name="gender"
                        aria-labelledby="gender-group"
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
                    <h2>선호 스포츠와 레벨 선택하기</h2>
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
                      <SoccerCard sportState={{ sport, setSport }} />
                      <BasketBallCard sportState={{ sport, setSport }} />
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
                      <BadmintonCard sportState={{ sport, setSport }} />
                      <TableTennisCard sportState={{ sport, setSport }} />
                    </RadioGroup>
                    <Stack
                      alignItems={"flex-start"}
                      mt={4}
                      flexDirection={"row"}
                    >
                      <ToggleButtonGroup
                        orientation="vertical"
                        value={tier}
                        exclusive
                        onChange={tierChange}
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
                      <Stack color="green">
                        {tier === "1" && (
                          <Stack mt={1.5} ml={2}>
                            <h4>
                              스포츠에 호기심을 갖고 있거나 입문한지 얼마 안된
                              레벨입니다.
                            </h4>
                          </Stack>
                        )}
                        {tier === "2" && (
                          <Stack mt={10} ml={2}>
                            <h4>
                              스포츠를 배우는 중이거나 취미로 즐기는 레벨입니다.
                            </h4>
                          </Stack>
                        )}
                        {tier === "3" && (
                          <Stack mt={18.5} ml={2}>
                            <h4>스포츠를 가르치거나 일상이 된 레벨입니다.</h4>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                    <Typography
                      variant="subtitle2"
                      mt={3}
                      color={"yellowgreen"}
                      textAlign={"right"}
                    >
                      선택하지 않은 스포츠의 레벨은 새싹레벨로 선택됩니다.
                    </Typography>
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
