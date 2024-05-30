import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import KaKaoMapchat from "../components/KaKaoMap_chat";
import { IoMdPeople, IoMdSend } from "react-icons/io";
import {
  MdChat,
  MdExitToApp,
  MdLocationOn,
  MdWhereToVote,
} from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import ChatAvatar from "./../components/ChatAvatar";
import ChatBubble from "../components/ChatBubble";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

function Chat() {
  const state = useLocation();
  const [loading, setLoading] = useState(true);

  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [title, setTitle] = useState("");
  const [preferCourts, setPreferCourts] = useState(null);
  const [court, setcourt] = useState(null);
  const [isCourt, setIsCourt] = useState(null);
  useEffect(() => {
    console.log(state.state);
    const setTeam = () => {
      const team1 = Object.entries(state.state.team1);
      console.log(team1);
      const team2 = Object.entries(state.state.team2);
      setTeam1(team1);
      setTeam2(team2);
    };
    const setCourts = () => {
      setPreferCourts(state.state.preferCourts);
    };
    const getTitle = () => {
      const date = new Date(state.state.startTime);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const sport = state.state.sportName;
      setTitle(
        `${month}월 ${day}일 ${hours}시 ${minutes}분 ${sport} 경기 대화방`
      );
    };
    const checkCourt = () => {
      if (state.state.court) {
        setcourt(state.state.court);
        setIsCourt("true");
      } else if (localStorage.getItem("court")) {
        setIsCourt("true");
      }
    };
    setTeam();
    setCourts();
    getTitle();
    checkCourt();
  }, [
    state.state,
    state.state.preferCourts,
    state.state.sportName,
    state.state.startTime,
    state.state.team1,
    state.state.team2,
  ]);

  const [voteOpen, setVoteOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState("");
  const [isVoted, setIsVoted] = useState(localStorage.getItem("isVoted"));

  const handleClickVoteOpen = () => {
    setVoteOpen(true);
  };
  const handleVoteClose = () => {
    setVoteOpen(false);
  };
  const handleVoteOptionChange = (event) => {
    setSelectedCourt(event.target.value);
  };
  const navigate = useNavigate();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [result, setResult] = useState("");
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleClickFeedbackOpen = () => {
    setFeedbackOpen(true);
  };
  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
  };
  const handleResultOptionChange = (event) => {
    setResult(event.target.value);
  };
  const handleFeedbackOptionChange = (event) => {
    setFeedback(event.target.value);
  };

  const sendFeedback = async () => {
    try {
      const res = await axios.patch(
        `http://15.165.113.9:8080/api/game/${gameId}`,
        { result: result, comment: comment, feedback: feedback },
        { headers: { auth: localStorage.getItem("accessToken") } }
      );
      console.log(result.data);
      navigate("/Main");
    } catch (error) {
      console.error(error);
      alert("경기 결과를 입력해주세요");
      console.error("진행 중인 게임 종료 실패");
    }
  };

  const client = useRef();
  const scrollRef = useRef();
  const gameId = state.state.gameId;
  const [chatList, setChatList] = useState([]);
  const [inputChat, setInputChat] = useState("");
  const myNickname = localStorage.getItem("nickname");
  const [notVotedCount, setNotVotedCount] = useState(0);
  const [votedCourts, setVotedCourts] = useState([]);

  const [value, setValue] = useState("chat");

  const getChat = async () => {
    try {
      const result = await axios.get(
        `http://15.165.113.9:8080/api/chats/${gameId}`
      );
      console.log(result.data);
      setChatList(result.data.data);
      console.log(chatList);
    } catch (error) {
      console.error(error);
      console.error("채팅내역 불러오기 실패");
    }
  };
  const getVote = async () => {
    try {
      const result = await axios.get(
        `http://15.165.113.9:8080/api/game/vote/${gameId}`
      );
      console.log(result.data);
      setVotedCourts(result.data.data.votedCourts);
      setNotVotedCount(result.data.data.notVotedCount);
      console.log(votedCourts);
    } catch (error) {
      console.error(error);
      console.error("투표내역 불러오기 실패");
    }
  };
  const gameData = async () => {
    try {
      const result = await axios.get(`http://15.165.113.9:8080/api/game`, {
        headers: { auth: localStorage.getItem("accessToken") },
      });
      console.log(result.data);
      console.log(result.data.data);
      setcourt([
        {
          court: result.data.data.court,
          latitude: result.data.data.latitude,
          longitude: result.data.data.longitude,
        },
      ]);
      setIsCourt("true");
      localStorage.setItem("court", "true");
    } catch (error) {
      console.error(error);
      console.error("진행 중인 게임 불러오기 실패");
      alert("진행중인 게임이 존재하지 않습니다.");
    }
  };
  useEffect(() => {
    getChat();
    getVote();
    client.current = new Client({
      brokerURL: "ws://15.165.113.9:8080/chat",
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.current.activate();
    client.current.onConnect = async () => {
      console.log("success");
      client.current.subscribe(`/room/${gameId}`, (chat) => {
        if (JSON.parse(chat.body).votedCourts) {
          setVotedCourts(JSON.parse(chat.body).votedCourts);
          setNotVotedCount(JSON.parse(chat.body).notVotedCount);
          if (JSON.parse(chat.body).notVotedCount === 0) {
            gameData();
          }
        } else if (chat) {
          setChatList((prevchatList) => [
            ...prevchatList,
            JSON.parse(chat.body),
          ]);
        }
      });
    };
    setLoading(false);
    return () => {
      client.current.deactivate();
      console.log("채팅이 종료되었습니다.");
      localStorage.removeItem("court");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatList]);

  const sendChat = () => {
    if (client.current && inputChat.trim()) {
      const message = {
        userNickname: myNickname,
        comment: inputChat,
      };

      client.current.publish({
        destination: `/send/message/${gameId}`,
        body: JSON.stringify(message),
      });
      setInputChat("");
    }
  };
  const sendVote = () => {
    if (client.current) {
      const message = {
        userNickname: myNickname,
        comment: selectedCourt,
      };

      client.current.publish({
        destination: `/send/vote/${gameId}`,
        body: JSON.stringify(message),
      });
      setIsVoted("true");
      localStorage.setItem("isVoted", "true");
    }
    setVoteOpen(false);
  };
  const ClickIsVoted = () => {
    alert("이미 경기장을 투표하셨습니다.");
  };
  const ClickIsCourt = () => {
    alert("아직 경기장이 확정되지 않았습니다.");
  };
  if (loading) {
    return <div>로딩중</div>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          minHeight: { xs: "84dvh", lg: "93dvh" },
          maxHeight: { xs: "84dvh", lg: "93dvh" },
        }}
      >
        <Box
          sx={{
            flex: 3,
            boxShadow: 3,
            borderRadius: 1,
            margin: 3,
            overflow: "auto",
            display: (theme) => ({
              xs: value === "location" ? "flex" : "none",
              lg: "flex",
            }),
            flexDirection: "column",
          }}
        >
          <Stack alignItems={"center"}>
            {isCourt ? (
              <Typography variant="h3" component="h2" sx={{ mt: 3 }}>
                {`선택된 경기장은 ${court[0].court} 입니다.`}
              </Typography>
            ) : (
              <Typography variant="h3" component="h2" sx={{ mt: 3 }}>
                선수들이 선택한 경기장
              </Typography>
            )}
          </Stack>
          {preferCourts ? (
            isCourt ? (
              <KaKaoMapchat court={court} />
            ) : (
              <KaKaoMapchat court={preferCourts} />
            )
          ) : (
            <div></div>
          )}

          <Stack alignItems={"flex-end"}>
            <Typography variant="h5" component="h3" sx={{ mb: 1, mr: 1 }}>
              {`투표하지 않은 인원 수 : ${notVotedCount}`}
            </Typography>
          </Stack>
          <Stack>
            <List
              sx={{
                p: 0,
                width: "100%",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
                overflowY: "auto",
              }}
            >
              {preferCourts.map((court, index) => (
                <>
                  <ListItem>
                    <ListItemText
                      primary={court.court}
                      secondary={`득표 수 : ${
                        votedCourts[index] ? votedCourts[index].count : null
                      }`}
                    />
                  </ListItem>
                  <Divider component="li" />
                </>
              ))}
            </List>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 2,
            display: (theme) => ({
              xs: value === "chat" ? "flex" : "none",
              lg: "flex",
            }),
            flexDirection: "column",
            alignItems: "flex-start",
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
            <h3>{title}</h3>
          </Box>
          <Box
            ref={scrollRef}
            sx={{ overflowY: "auto", flex: 1, width: "100%" }}
          >
            {chatList.map((chat) => (
              <ChatBubble
                isMyChat={chat.userNickname === myNickname}
                nickname={chat.userNickname}
                tier={state.state.user[chat.userNickname].tier}
                team={state.state.user[chat.userNickname].team}
                number={state.state.user[chat.userNickname].number}
                chat={chat.comment}
              />
            ))}
          </Box>

          <Stack direction="row" sx={{ padding: 1, width: "100%" }}>
            <TextField
              fullWidth
              placeholder="선수들과 대화를 나누세요!"
              sx={{ backgroundColor: "white" }}
              value={inputChat}
              onChange={(e) => setInputChat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChat()}
            />
            <Button
              endIcon={<IoMdSend />}
              onClick={sendChat}
              variant="contained"
              sx={{ ml: 1, backgroundColor: "#9376E0", whiteSpace: "nowrap" }}
            >
              전송
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            display: (theme) => ({
              xs: value === "user" ? "flex" : "none",
              lg: "flex",
            }),
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
              overflowY: "auto",
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
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                width: "100%",
              }}
            >
              {team1.map((user) => (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    padding: 2,
                    alignItems: "center",
                  }}
                >
                  <ChatAvatar
                    tier={user[1].tier}
                    team={user[1].team}
                    number={user[1].number}
                  />
                  <Typography component="h3" variant="h6" sx={{ ml: 1 }}>
                    {user[0]}
                  </Typography>
                </Box>
              ))}
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
              overflowY: "auto",
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
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                width: "100%",
              }}
            >
              {team2.map((user) => (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    padding: 2,
                    alignItems: "center",
                  }}
                >
                  <ChatAvatar
                    tier={user[1].tier}
                    team={user[1].team}
                    number={user[1].number}
                  />
                  <Typography component="h3" variant="h6" sx={{ ml: 1 }}>
                    {user[0]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ flex: 1, margin: 3 }}>
            <Button
              onClick={isVoted === "true" ? ClickIsVoted : handleClickVoteOpen}
              variant="contained"
              endIcon={<MdWhereToVote />}
              sx={{ width: "100%", backgroundColor: "#9376E0" }}
            >
              경기장 투표하기
            </Button>
            <Dialog
              open={voteOpen}
              onClose={handleVoteClose}
              sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
            >
              <DialogTitle>경기장을 투표 해주세요!</DialogTitle>
              <DialogContent>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={selectedCourt}
                    onChange={handleVoteOptionChange}
                  >
                    {preferCourts.map((court) => (
                      <FormControlLabel
                        value={court.court}
                        control={<Radio />}
                        label={court.court}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleVoteClose} color="secondary">
                  취소
                </Button>
                <Button onClick={sendVote} color="primary">
                  투표하기
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              onClick={
                isCourt === "true" ? handleClickFeedbackOpen : ClickIsCourt
              }
              variant="contained"
              endIcon={<MdExitToApp />}
              sx={{ width: "100%", backgroundColor: "#9376E0", mt: 2 }}
            >
              경기 종료하기
            </Button>
            <Dialog
              open={feedbackOpen}
              onClose={handleFeedbackClose}
              sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 440 } }}
            >
              <DialogTitle>경기는 어떠셨나요?</DialogTitle>
              <DialogContent>
                <Stack display={"flex"} direction={"row"} alignItems={"center"}>
                  <h3>경기에서 </h3>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      id="result"
                      value={result}
                      onChange={handleResultOptionChange}
                      input={<OutlinedInput />}
                    >
                      <MenuItem value={1}>승리</MenuItem>
                      <MenuItem value={0}>무승부</MenuItem>
                      <MenuItem value={-1}>패배</MenuItem>
                    </Select>
                  </FormControl>
                  <h3>했어요. </h3>
                </Stack>
                <Stack
                  sx={{ mt: 2 }}
                  display={"flex"}
                  direction={"row"}
                  alignItems={"center"}
                >
                  <h3>경기 난이도는 </h3>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      id="result"
                      value={feedback}
                      onChange={handleFeedbackOptionChange}
                      input={<OutlinedInput />}
                    >
                      <MenuItem value={1}>쉬웠어요</MenuItem>
                      <MenuItem value={0}>적당했어요</MenuItem>
                      <MenuItem value={-1}>어려웠어요</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack sx={{ mt: 2 }}>
                  <TextField
                    multiline
                    rows={4}
                    label="경기 소감을 입력해주세요"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleFeedbackClose} color="secondary">
                  취소
                </Button>
                <Button onClick={sendFeedback} color="primary">
                  결과 작성하기
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: { xs: "flex", lg: "none" } }}>
        <BottomNavigation
          sx={{ width: "100%" }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="채팅" value="chat" icon={<MdChat />} />
          <BottomNavigationAction
            label="참가자"
            value="user"
            icon={<IoMdPeople />}
          />
          <BottomNavigationAction
            label="경기장"
            value="location"
            icon={<MdLocationOn />}
          />
        </BottomNavigation>
      </Box>
    </ThemeProvider>
  );
}

export default Chat;
