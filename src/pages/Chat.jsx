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

const defaultTheme = createTheme();

function Chat() {
  const client = useRef();
  const scrollRef = useRef();
  const roomId = 1;
  const [chatList, setChatList] = useState([]);
  const [inputChat, setInputChat] = useState("");
  const myNickname = localStorage.getItem("nickname");

  useEffect(() => {
    const getChat = async () => {
      try {
        const result = await axios.get(
          `http://15.165.113.9:8080/api/chats/${roomId}`
        );
        console.log(result.data);
        console.log(result.data.data);
        setChatList(result.data.data);
        console.log(chatList);
      } catch (error) {
        console.error(error);
        console.error("채팅내역 불러오기 실패");
      }
    };
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
      client.current.subscribe(`/room/${roomId}`, (chat) => {
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
        destination: `/send/message/${roomId}`,
        body: JSON.stringify(message),
      });
      setInputChat("");
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
          <Box ref={scrollRef} sx={{ overflowY: "auto", height: "87%" }}>
            {chatList.map((chat) => (
              <ChatBubble
                isMyChat={false}
                nickname={chat.userNickname}
                tier={400}
                team={1}
                number={0}
                chat={chat.comment}
              />
            ))}
          </Box>

          <Stack direction="row" sx={{ margin: 1, mt: 2 }}>
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
