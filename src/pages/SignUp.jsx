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
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  Paper,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { ReactComponent as GoatIcon } from "../assets/GOAT.svg";

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
  // const [age, setAge] = useState(null);
  // const [gender, setGender] = useState(null);
  // const [nickname, setNickname] = useState(null);
  // const [preferSport, setPreferSport] = useState(null);
  // const [soccerTier, setSoccerTier] = useState(null);
  // const [basketballTier, setBasketballTier] = useState(null);
  // const [badmintonTier, setBadmintonTier] = useState(null);
  // const [tableTennisTier, setTableTennisTier] = useState(null);

  const { setIsLogin } = isLoginStore();
  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    await userAxios
      .post(
        "",
        {
          age: data.get("age"),
          gender: data.get("gender"),
          nickname: data.get("nickName"),
          prefer_sport: data.get("preferSport"),
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
      <Grid
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?sports)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",

          position: "absolute",
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={3} alignContent={"center"}>
            <GoatIcon width="400px" height="400px" />
            <h1>GOAT 회원가입하기</h1>
          </Grid>
          <Grid item xs={3}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />

              <Box
                sx={{
                  mt: 8,
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "#eaebff",
                  boxShadow: 3,
                  borderRadius: 1,
                }}
              >
                <h1>회원가입</h1>
                <Box
                  component={"form"}
                  noValidate
                  onSubmit={signUpHandler}
                  sx={{ mt: 3 }}
                >
                  <TextField
                    name="nickName"
                    required
                    fullWidth
                    id="nickName"
                    label="닉네임"
                    autoFocus
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

                  <TextField
                    name="gender"
                    required
                    fullWidth
                    id="gender"
                    label="성별"
                    sx={{ mt: 2 }}
                  />

                  <TextField
                    name="preferSport"
                    required
                    fullWidth
                    id="preferSport"
                    label="선호 스포츠"
                    sx={{ mt: 2 }}
                  />

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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    가입하기
                  </Button>
                </Box>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignUp;
