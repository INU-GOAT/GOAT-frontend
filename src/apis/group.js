import axios from 'axios';

const groupAxios = axios.create({
  baseURL: "http://15.165.113.9:8080/api/group",
});

groupAxios.interceptors.request.use(
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

const handleErrors = (error, defaultMessage) => {
  console.error(defaultMessage, error.response ? error.response.data : error.message);
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 404:
        console.error('[NO_JOINING_GROUP] 가입된 그룹을 찾을 수 없습니다.');
        return { error: '[NO_JOINING_GROUP] 가입된 그룹을 찾을 수 없습니다.' };
      case 400:
        console.error('[BAD_REQUEST] 유효성 검사 예외 발생');
        return { error: '[BAD_REQUEST] 유효성 검사 예외 발생' };
      case 409:
        console.error('[USER_BELONG_GROUP] 그룹에 초대할 수 없습니다. 해당 유저가 이미 그룹에 속해 있습니다.');
        return { error: '[USER_BELONG_GROUP] 그룹에 초대할 수 없습니다. 해당 유저가 이미 그룹에 속해 있습니다.' };
      case 500:
        console.error('[INTERNAL_SERVER_ERROR] 서버 내부 오류가 발생했습니다.');
        return { error: '[INTERNAL_SERVER_ERROR] 서버 내부 오류가 발생했습니다.' };
      default:
        console.error(`Error ${status}: ${data.msg}`);
        return { error: `Error ${status}: ${data.msg}` };
    }
  }
  return { error: defaultMessage };
};

export const getGroupMembers = async () => {
  try {
    const response = await groupAxios.get('');
    console.log('그룹원 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    return handleErrors(error, '그룹원 조회 실패');
  }
};

export const leaveGroup = async () => {
  try {
    const response = await groupAxios.delete('');
    console.log('그룹 탈퇴 성공:', response.data);
    return response.data;
  } catch (error) {
    return handleErrors(error, '그룹 탈퇴 실패');
  }
};

export const inviteToGroup = async (inviteeNickname) => {
  try {
    const response = await groupAxios.patch('', { inviteeNickname });
    console.log('그룹 초대 성공:', response.data);
    return response.data;
  } catch (error) {
    return handleErrors(error, '그룹 초대 실패');
  }
};

export const acceptGroupInvitation = async (notificationId, isAccepted) => {
  try {
    const response = await groupAxios.patch('/members', { notificationId, isAccepted });
    console.log('그룹원 추가 성공:', response.data);
    return response.data;
  } catch (error) {
    return handleErrors(error, '그룹원 추가 실패');
  }
};

export const expelGroupMember = async (memberId) => {
  try {
    const response = await groupAxios.patch(`/members/${memberId}`);
    console.log('그룹원 추방 성공:', response.data);
    return response.data;
  } catch (error) {
    return handleErrors(error, '그룹원 추방 실패');
  }
};

export const inviteClubMembersToGroup = async () => {
  try {
    const response = await groupAxios.patch('/club-members');
    console.log('클럽원 초대 성공:', response.data);
    return response.data;
  } catch (error) {
    return handleErrors(error, '클럽원 초대 실패');
  }
};