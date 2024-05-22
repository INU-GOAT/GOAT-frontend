import axios from 'axios';

const notificationAxios = axios.create({
  baseURL: "http://15.165.113.9:8080/api/notification",
});

notificationAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getNotifications = async () => {
  try {
    const response = await notificationAxios.get('');
    console.log('알림 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('알림 조회 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const response = await notificationAxios.delete(`/${notificationId}`);
    console.log('알림 삭제 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('알림 삭제 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};