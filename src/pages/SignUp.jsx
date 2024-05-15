import { useState } from "react";
import { useNavigate } from "react-router-dom";

import userAxios from "../apis/userAxios";
import getUser from "../apis/getUser";
import setUser from "../utils/setUser";
import { isLoginStore } from "../utils/store";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  ThemeProvider,
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
import {
  BadmintonCard,
  BasketBallCard,
  SoccerCard,
  TableTennisCard,
} from "./../components/SportsCards";
import TierButton from "../components/TierButton";

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
  const [soccerTier, setSoccerTier] = useState(null);
  const [basketballTier, setBasketballTier] = useState(null);
  const [badmintonTier, setBadmintonTier] = useState(null);
  const [tableTennisTier, setTableTennisTier] = useState(null);
  const [preferTier, setPreferTier] = useState(null);
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
  const stepTwoHandler = () => {
    setPreferSport(sport);
    if (sport === "soccer") {
      setSoccerTier(preferTier);
    } else if (sport === "basketball") {
      setBasketballTier(preferTier);
    } else if (sport === "badminton") {
      setBadmintonTier(preferTier);
    } else if (sport === "tableTennis") {
      setTableTennisTier(preferTier);
    }
    setStep(3);
    console.log(soccerTier, preferSport, sport, preferTier);
  };
  const signUpHandler = async (e) => {
    e.preventDefault();

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
                  <h4>단계 {step} / 3</h4>
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
                    onSubmit={stepTwoHandler}
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
                      <TierButton
                        orientation={"vertical"}
                        setTier={setPreferTier}
                        tier={preferTier}
                      ></TierButton>

                      <Stack color="green">
                        {preferTier === "1" && (
                          <Stack mt={1.5} ml={2}>
                            <h4>
                              스포츠에 호기심을 갖고 있거나 입문한지 얼마 안된
                              레벨입니다.
                            </h4>
                          </Stack>
                        )}
                        {preferTier === "2" && (
                          <Stack mt={10} ml={2}>
                            <h4>
                              스포츠를 배우는 중이거나 취미로 즐기는 레벨입니다.
                            </h4>
                          </Stack>
                        )}
                        {preferTier === "3" && (
                          <Stack mt={18.5} ml={2}>
                            <h4>스포츠를 가르치거나 일상이 된 레벨입니다.</h4>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>

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
                        다음으로
                      </Button>
                    </Stack>
                  </Box>
                )}
                {step === 3 && (
                  <Box
                    component={"form"}
                    noValidate
                    onSubmit={signUpHandler}
                    sx={{ mt: 3 }}
                  >
                    <h2>나머지 스포츠 레벨 선택하기</h2>

                    <Stack flexDirection={"column"}>
                      {preferSport !== "soccer" && (
                        <Stack flexDirection={"row"} sx={{ mt: 2 }}>
                          <Card
                            sx={{
                              maxWidth: "30%",
                            }}
                          >
                            <CardContent
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <GiSoccerBall
                                fill={"skyblue"}
                                size={"100%"}
                              ></GiSoccerBall>
                            </CardContent>
                          </Card>
                          <Stack sx={{ mt: 3.5, ml: 5 }}>
                            <TierButton
                              orientation={"horizontal"}
                              setTier={setSoccerTier}
                              tier={soccerTier}
                            />
                          </Stack>
                        </Stack>
                      )}
                      {preferSport !== "basketball" && (
                        <Stack flexDirection={"row"} sx={{ mt: 2 }}>
                          <Card
                            sx={{
                              maxWidth: "30%",
                            }}
                          >
                            <CardContent
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <GiBasketballBall
                                fill={"orange"}
                                size={"100%"}
                              ></GiBasketballBall>
                            </CardContent>
                          </Card>
                          <Stack sx={{ mt: 3.5, ml: 5 }}>
                            <TierButton
                              orientation={"horizontal"}
                              setTier={setBasketballTier}
                              tier={basketballTier}
                            />
                          </Stack>
                        </Stack>
                      )}
                      {preferSport !== "badminton" && (
                        <Stack flexDirection={"row"} sx={{ mt: 2 }}>
                          <Card
                            sx={{
                              maxWidth: "30%",
                            }}
                          >
                            <CardContent
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <GiShuttlecock
                                fill={"lightgreen"}
                                size={"100%"}
                              ></GiShuttlecock>
                            </CardContent>
                          </Card>
                          <Stack sx={{ mt: 3.5, ml: 5 }}>
                            <TierButton
                              orientation={"horizontal"}
                              setTier={setBadmintonTier}
                              tier={badmintonTier}
                            />
                          </Stack>
                        </Stack>
                      )}
                      {preferSport !== "tableTennis" && (
                        <Stack flexDirection={"row"} sx={{ mt: 2 }}>
                          <Card
                            sx={{
                              maxWidth: "30%",
                            }}
                          >
                            <CardContent
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <GiPingPongBat
                                fill={"red"}
                                size={"100%"}
                              ></GiPingPongBat>
                            </CardContent>
                          </Card>
                          <Stack sx={{ mt: 3.5, ml: 5 }}>
                            <TierButton
                              orientation={"horizontal"}
                              setTier={setTableTennisTier}
                              tier={tableTennisTier}
                            />
                          </Stack>
                        </Stack>
                      )}
                    </Stack>

                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <Button
                        startIcon={<CgChevronLeft />}
                        variant="text"
                        onClick={() => setStep(2)}
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
                        다음으로
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
