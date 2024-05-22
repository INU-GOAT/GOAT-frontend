import userAxios from "./userAxios";

export const getUser = async () => {
  try {
    const result = await userAxios.get('/');
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error(error);
    console.error("getUser 실패");
    // 디버깅 확인용 기본 사용자 데이터 반환
    return {
      id: 0,
      nickname: "debug-user",
      status: "WAITING",
    };
  }
};