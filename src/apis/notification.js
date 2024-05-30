import axios from 'axios';
import { EventSourcePolyfill } from 'eventsourcepolyfill';

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
    const response = await notificationAxios.get('/');
    return response.data;
  } catch (error) {
    console.error('알림 조회 실패:', error.response ? error.response.data : error.message);
    return [];
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const response = await notificationAxios.delete(`/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error('알림 삭제 실패:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 401) {
      console.error('[UNAUTHORIZED] 권한이 없습니다. 본인만 삭제할 수 있습니다.');
    }
    return null;
  }
};

const handleSSEMessage = (onMessage, event) => {
  const newNotification = JSON.parse(event.data);
  onMessage(newNotification);

  if (Notification.permission === "granted") {
    new Notification(newNotification.content);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(newNotification.content);
      }
    });
  }
};

export const connectSSE = (onMessage) => {
  const eventSource = new EventSourcePolyfill("http://15.165.113.9:8080/api/notification/connect", {
    headers: {
      Auth: `${localStorage.getItem("accessToken")}`
    }
  });
  eventSource.onmessage = (event) => handleSSEMessage(onMessage, event);
  eventSource.onerror = (error) => {
    console.error('SSE 에러 발생:', error);
    eventSource.close();
  };
  return eventSource;
};

export const disconnectSSE = (eventSource) => {
  if (eventSource) {
    eventSource.close();
  }
};

export const disconnectNotifications = async () => {
  try {
    const response = await notificationAxios.delete('/disconnect');
    return response.data;
  } catch (error) {
    console.error('SSE 알림 해제 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};