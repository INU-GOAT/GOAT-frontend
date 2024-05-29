import axios from 'axios';

const matchingAxios = axios.create({
  baseURL: "http://15.165.113.9:8080/api/matching",
});

matchingAxios.interceptors.request.use(
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

const handleErrors = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 404) {
      console.error('[NO_JOINING_GROUP] 가입된 그룹을 찾을 수 없습니다.');
      return { data: -1, msg: '가입된 그룹을 찾을 수 없습니다.' };
    } else {
      console.error('매칭 조회 실패:', data);
      return data;
    }
  } else {
    console.error('매칭 조회 실패:', error.message);
    return { msg: error.message };
  }
};

export const getMatching = async () => {
  try {
    const result = await matchingAxios.get();
    console.log('매칭 조회 성공:', result.data);
    return result.data;
  } catch (error) {
    return handleErrors(error);
  }
};

export const startMatching = async (data) => {
  try {
    const result = await matchingAxios.post('/', data);
    console.log('매칭 시작 성공:', result.data);
    return result.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        console.error('[NOT_ENOUGH_GROUP_MEMBERS] 그룹원의 수가 해당 스포츠의 한 팀 최소 인원보다 적습니다.');
      } else if (status === 404) {
        console.error('[USER_NOT_FOUND] 사용자를 찾을 수 없습니다.');
      } else if (status === 409) {
        console.error('[GROUP_INVITING_ON_GOING] 그룹원을 초대 중이므로 매칭 시작이 불가능합니다.');
      }
      console.error('매칭 시작 실패:', data);
    } else {
      console.error('매칭 시작 실패:', error.message);
    }
    return null;
  }
};

export const cancelMatching = async () => {
  try {
    const result = await matchingAxios.delete();
    console.log('매칭 중단 성공:', result.data);
    return result.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 404) {
        console.error('[NO_MATCHING] 매칭 중이 아닙니다.');
      }
      console.error('매칭 중단 실패:', data);
    } else {
      console.error('매칭 중단 실패:', error.message);
    }
    return null;
  }
};