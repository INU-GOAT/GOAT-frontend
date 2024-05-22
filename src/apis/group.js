import axios from 'axios';

const groupAxios = axios.create({
  baseURL: "http://15.165.113.9:8080/api/group",
});

groupAxios.interceptors.request.use(
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

export const inviteToGroup = async (inviteeNickname) => {
  try {
    const response = await groupAxios.patch('/', { inviteeNickname });
    return response.data;
  } catch (error) {
    console.error('그룹 초대 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const getGroupMembers = async () => {
  try {
    const response = await groupAxios.get('/');
    return response.data;
  } catch (error) {
    console.error('그룹원 조회 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const leaveGroup = async () => {
  try {
    const response = await groupAxios.delete('/');
    return response.data;
  } catch (error) {
    console.error('그룹 탈퇴 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const expelGroupMember = async (memberId) => {
  try {
    const response = await groupAxios.patch(`/members/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('그룹원 추방 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};