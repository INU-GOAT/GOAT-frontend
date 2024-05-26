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

export const getGroupMembers = async () => {
  try {
    const response = await groupAxios.get('');
    console.log('그룹원 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('그룹원 조회 실패:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 404) {
      console.error('[NO_JOINING_GROUP] 가입된 그룹을 찾을 수 없습니다.');
    }
    return null;
  }
};

export const leaveGroup = async () => {
  try {
    const response = await groupAxios.delete('');
    console.log('그룹 탈퇴 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('그룹 탈퇴 실패:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 404) {
      console.error('[NO_JOINING_GROUP] 가입된 그룹을 찾을 수 없습니다.');
    }
    return null;
  }
};

export const inviteToGroup = async (inviteeNickname) => {
  try {
    const response = await groupAxios.patch('', { inviteeNickname });
    console.log('그룹 초대 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('그룹 초대 실패:', error.response ? error.response.data : error.message);
    if (error.response) {
      if (error.response.status === 404) {
        console.error('[INVITEE_NOT_FOUND] 존재하지 않는 유저입니다. 초대하려는 유저의 닉네임을 다시 확인해주세요.');
      } else if (error.response.status === 409) {
        console.error('[USER_INVITED_GROUP] 그룹에 초대할 수 없습니다. 해당 유저가 그룹 초대를 받는 중입니다.');
      } else if (error.response.status === 400) {
        console.error('[BAD_REQUEST] 유효성 검사 예외 발생');
      }
    }
    return null;
  }
};

export const acceptGroupInvitation = async (notificationId, isAccepted) => {
  try {
    const response = await groupAxios.patch('/members', { notificationId, isAccepted });
    console.log('그룹원 추가 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('그룹원 추가 실패:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 404) {
      console.error('[NO_JOINING_GROUP] 가입된 그룹을 찾을 수 없습니다.');
    } else if (error.response && error.response.status === 400) {
      console.error('[BAD_REQUEST] 유효성 검사 예외 발생');
    }
    return null;
  }
};

export const expelGroupMember = async (memberId) => {
  try {
    const response = await groupAxios.patch(`/members/${memberId}`);
    console.log('그룹원 추방 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('그룹원 추방 실패:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 404) {
      console.error('[NO_JOINING_GROUP] 가입된 그룹을 찾을 수 없습니다.');
    }
    return null;
  }
};

export const inviteClubMembersToGroup = async () => {
  try {
    const response = await groupAxios.patch('/club-members');
    console.log('클럽원 초대 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('클럽원 초대 실패:', error.response ? error.response.data : error.message);
    if (error.response) {
      if (error.response.status === 404) {
        console.error('[USER_NOT_FOUND] 존재하지 않는 유저입니다.');
      } else if (error.response.status === 409) {
        console.error('[NO_AVAILABLE_CLUB_MEMBERS] 현재 초대 가능한 클럽원이 없습니다.');
      }
    }
    return null;
  }
};