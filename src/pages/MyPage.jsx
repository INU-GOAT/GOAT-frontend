import React from "react";
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
  FormControl,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

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
    value: "40",
    label: "40대",
  },
  {
    value: "50",
    label: "50대",
  },
];
function MyPage() {
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
                <FormLabel id="emo-row-radio-buttons-group-label">
                  선호 스포츠
                </FormLabel>
                <p />
                <ToggleButtonGroup
                  color="primary"
                  exclusive
                  aria-label="Platform"
                  value={"ios"}
                >
                  <ToggleButton value="web">축구</ToggleButton>
                  <ToggleButton value="android">농구</ToggleButton>
                  <ToggleButton value="ios">배드민턴</ToggleButton>
                  <ToggleButton value="asd">탁구</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  축구 실력
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="초보"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="중수"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="고수"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  농구 실력
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="초보"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="중수"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="고수"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  배드민턴 실력
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="초보"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="중수"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="고수"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  탁구 실력
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="초보"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="중수"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="고수"
                  />
                </RadioGroup>
              </FormControl>
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
