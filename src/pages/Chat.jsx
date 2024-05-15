import "./css/Chat.css";

import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import KaKaoMapchat from "../components/KaKaoMap_chat";
import { Map } from "react-kakao-maps-sdk";

import { CgChevronRight } from "react-icons/cg";
import { IoMdSend } from "react-icons/io";
import { MdWhereToVote } from "react-icons/md";

const defaultTheme = createTheme();

function Chat() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", minHeight: "95dvh" }}>
        <Box sx={{ flex: 3, boxShadow: 3, borderRadius: 1, margin: 3 }}>
          <KaKaoMapchat></KaKaoMapchat>
        </Box>

        <Box
          sx={{
            flex: 2,
            alignItems: "center",
            boxShadow: 3,
            borderRadius: 1,
            margin: 3,
            backgroundColor: "#EAEBFF",
          }}
        >
          <Box
            sx={{
              width: "100%",
              margin: 0,
              padding: 3,
              boxShadow: 3,
              borderRadius: 1,
              backgroundColor: "#9376E0",
              color: "white",
            }}
          >
            <h3>5월 10일 11시 30분 배드민턴 경기 대화방</h3>
          </Box>
          <Box sx={{ maxWidth: "60%", minWidth: "auto", mt: 2, ml: 2 }}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              spacing={2}
              sx={{ mb: 0.25 }}
            >
              <Avatar sx={{ bgcolor: "	#DC143C" }}>1</Avatar>
              <Stack>
                <Typography level="body-xs">선수 1</Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    px: 1.75,
                    py: 1.25,
                    borderRadius: 3,
                    borderTopLeftRadius: 0,
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <h3>안녕하세요</h3>
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ maxWidth: "60%", minWidth: "auto", mt: 2, ml: 2 }}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              spacing={2}
              sx={{ mb: 0.25 }}
            >
              <Avatar sx={{ bgcolor: "	#4169E1" }}>3</Avatar>
              <Stack>
                <Typography level="body-xs">선수 3</Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    px: 1.75,
                    py: 1.25,
                    borderRadius: 3,
                    borderTopLeftRadius: 0,
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <h3>안녕하세요 ㅎㅎ</h3>
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
          </Box>
          <Box
            sx={{
              maxWidth: "100%",
              minWidth: "auto",
              mt: 2,
              mr: 2,
            }}
          >
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: 0.25 }}
            >
              <Stack>
                <Paper
                  variant="outlined"
                  sx={{
                    px: 1.75,
                    py: 1.25,
                    borderRadius: 3,
                    borderTopRightRadius: 0,
                    backgroundColor: "#9376E0",
                    color: "white",
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <h3>만나서 반갑습니다!</h3>
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ maxWidth: "60%", minWidth: "auto", mt: 2, ml: 2 }}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              spacing={2}
              sx={{ mb: 0.25 }}
            >
              <Avatar sx={{ bgcolor: "	#4169E1" }}>3</Avatar>
              <Stack>
                <Typography level="body-xs">선수 3</Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    px: 1.75,
                    py: 1.25,
                    borderRadius: 3,
                    borderTopLeftRadius: 0,
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <h3>반가워요</h3>
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ maxWidth: "60%", minWidth: "auto", mt: 2, ml: 2 }}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              spacing={2}
              sx={{ mb: 0.25 }}
            >
              <Avatar sx={{ bgcolor: "	#DC143C" }}>2</Avatar>
              <Stack>
                <Typography level="body-xs">선수 2</Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    px: 1.75,
                    py: 1.25,
                    borderRadius: 3,
                    borderTopLeftRadius: 0,
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <h3>ㅎㅇㅎㅇ</h3>
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
          </Box>
          <Stack direction="row" sx={{ margin: 1, mt: 54 }}>
            <TextField
              fullWidth
              placeholder="선수들과 대화를 나누세요!"
              sx={{ backgroundColor: "white" }}
            />
            <Button
              endIcon={<IoMdSend />}
              type="submit"
              variant="contained"
              sx={{ ml: 1, width: "18%", backgroundColor: "#9376E0" }}
            >
              전송
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 10,
              backgroundColor: "pink",
              alignItems: "center",
              boxShadow: 3,
              borderRadius: 1,
              margin: 3,
            }}
          >
            <Box
              sx={{
                backgroundColor: "	#DC143C",
                color: "white",
                width: "100%",
                margin: 0,
                padding: 3,
                boxShadow: 3,
                borderRadius: 1,
              }}
            >
              <h3>레드팀</h3>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                margin: 1,
                ml: 2,
                padding: 1,
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "	#DC143C" }}>1</Avatar>
              <Typography component="h3" variant="h6" sx={{ ml: 1 }}>
                선수 1
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                margin: 1,
                ml: 2,
                padding: 1,
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "	#DC143C" }}>2</Avatar>
              <Typography component="h3" variant="h6" sx={{ ml: 1 }}>
                선수 2
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 10,
              backgroundColor: "#87CEFA",
              alignItems: "center",

              boxShadow: 3,
              borderRadius: 1,
              margin: 3,
            }}
          >
            <Box
              sx={{
                backgroundColor: "	#4169E1",
                color: "white",
                width: "100%",
                margin: 0,
                padding: 3,
                boxShadow: 3,
                borderRadius: 1,
              }}
            >
              <h3>블루팀</h3>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                margin: 1,
                ml: 2,
                padding: 1,
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "	#4169E1" }}>3</Avatar>
              <Typography component="h3" variant="h6" sx={{ ml: 1 }}>
                선수 3
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                margin: 1,
                ml: 2,
                padding: 1,
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "	#4169E1" }}>4</Avatar>
              <Typography component="h3" variant="h6" sx={{ ml: 1 }}>
                선수 4
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 1, margin: 3 }}>
            <Button
              variant="contained"
              endIcon={<MdWhereToVote />}
              sx={{ width: "100%", backgroundColor: "#9376E0" }}
            >
              경기장 투표하기
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Chat;
