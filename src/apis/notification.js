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
    const response = await notificationAxios.get('/');
    console.log('알림 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('알림 조회 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const connectNotificationSSE = () => {
  const accessToken = localStorage.getItem("accessToken");
  const sse = new EventSource(`http://15.165.113.9:8080/api/notification/connect?access_token=${accessToken}`);
  console.log('SSE 알림 연결 성공');
  return sse;
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