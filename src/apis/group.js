import axios from 'axios';

const groupAxios = axios.create({
  baseURL: "http://15.165.113.9:8080/api/group",
});

groupAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Auth = accessToken;
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

export const acceptGroupInvite = async (groupId, notificationId, isAccepted) => {
  try {
    const response = await groupAxios.patch(`/${groupId}`, { notificationId, isAccepted });
    return response.data;
  } catch (error) {
    console.error('그룹 초대 수락 실패:', error.response ? error.response.data : error.message);
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

export const getGroupMembers = async () => {
  try {
    const response = await groupAxios.get('/');
    const validGroups = response.data.filter(group => group.members.length > 1);
    return validGroups;
  } catch (error) {
    console.error('그룹원 조회 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const leaveGroup = async (userId) => {
  try {
    const response = await groupAxios.delete('/', { data: { userId } });
    return response.data;
  } catch (error) {
    console.error('그룹 탈퇴 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const getInvites = async () => {
  try {
    const response = await groupAxios.get('/invites');
    return response.data;
  } catch (error) {
    console.error('그룹 초대 조회 실패:', error.response ? error.response.data : error.message);
    return null;
  }
};