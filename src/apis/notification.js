import axios from 'axios';

const notificationAxios = axios.create({
  baseURL: "http://15.165.113.9:8080/api/notification",
});

notificationAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Auth = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getNotifications = async () => {
  try {
    const response = await notificationAxios.get();
    console.log('알림 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('알림 조회 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const connectNotificationSSE = (onMessage) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.error('SSE 연결 오류: Access Token이 없습니다.');
    return null;
  }

  const url = 'http://15.165.113.9:8080/api/notification/connect';
  fetch(url, {
    headers: {
      'Auth': accessToken,
      'Accept': 'text/event-stream'
    }
  }).then(response => {
    if (response.ok) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      reader.read().then(function processText({ done, value }) {
        if (done) {
          console.log('SSE 연결 종료');
          return;
        }

        const text = decoder.decode(value, { stream: true });
        const events = text.split('\n\n');
        events.forEach(eventString => {
          if (eventString) {
            const event = parseEventStream(eventString);
            if (event && event.data) {
              try {
                const jsonData = JSON.parse(event.data);
                onMessage(jsonData);
              } catch (error) {
                console.error('JSON 파싱 오류:', error);
              }
            }
          }
        });

        return reader.read().then(processText);
      });
    } else {
      console.error('SSE 연결 오류:', response.statusText);
    }
  }).catch(error => {
    console.error('SSE 연결 오류:', error);
  });
};

const parseEventStream = (eventString) => {
  const event = {};
  const lines = eventString.split('\n');
  lines.forEach(line => {
    const [field, ...rest] = line.split(':');
    const value = rest.join(':').trim();
    if (field === 'data') {
      event.data = value;
    } else {
      event[field] = value;
    }
  });
  return event;
};

export const deleteNotification = async (notificationId) => {
  try {
    const response = await notificationAxios.delete(`/${notificationId}`);
    console.log('알림 삭제 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('알림 삭제 실패:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 401) {
      console.error('[UNAUTHORIZED] 권한이 없습니다. 본인만 삭제할 수 있습니다.');
    }
    return null;
  }
};

export const disconnectNotificationSSE = async () => {
  try {
    const response = await notificationAxios.delete('/disconnect');
    console.log('SSE 알림 해제 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('SSE 알림 해제 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};