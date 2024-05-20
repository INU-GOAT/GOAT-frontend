import {
  Avatar,
  Badge,
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
import { IoMdSend } from "react-icons/io";
import { MdWhereToVote } from "react-icons/md";
import SockJS from "sockjs-client";
import { useEffect, useRef, useState } from "react";
import { Client, Stomp } from "@stomp/stompjs";
import { FaSeedling } from "react-icons/fa";
import ChatAvatar from "./../components/ChatAvatar";
import ChatBubble from "../components/ChatBubble";
import axios from "axios";
import { useLocation } from "react-router-dom";

const defaultTheme = createTheme();

function Chat() {
  const state = useLocation();
  console.log(state.state);

  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [title, setTitle] = useState("");
  const [preferCourts, setPreferCourts] = useState([]);

  useEffect(() => {
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
    setTeam();
    setCourts();
    getTitle();
  }, [
    state.state.preferCourts,
    state.state.sportName,
    state.state.startTime,
    state.state.team1,
    state.state.team2,
  ]);

  const client = useRef();
  const scrollRef = useRef();
  const gameId = state.state.gameId;
  const [chatList, setChatList] = useState([]);
  const [inputChat, setInputChat] = useState("");
  const myNickname = localStorage.getItem("nickname");
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
  useEffect(() => {
    getChat();

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
    client.current.onConnect = () => {
      console.log("success");
      client.current.subscribe(`/room/${gameId}`, (chat) => {
        if (chat) {
          console.log(JSON.parse(chat.body));

          setChatList((prevchatList) => [
            ...prevchatList,
            JSON.parse(chat.body),
          ]);
        }
      });
    };
    return () => {
      client.current.deactivate();
      console.log("채팅이 종료되었습니다.");
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
        comment: inputChat,
      };

      client.current.publish({
        destination: `/send/vote/${gameId}`,
        body: JSON.stringify(message),
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", minHeight: "95dvh", maxHeight: "95dvh" }}>
        <Box sx={{ flex: 3, boxShadow: 3, borderRadius: 1, margin: 3 }}>
          <KaKaoMapchat></KaKaoMapchat>
        </Box>

        <Box
          sx={{
            flex: 2,
            display: "flex",
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
