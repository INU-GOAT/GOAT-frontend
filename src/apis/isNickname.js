import userAxios from "./userAxios";

const isNickname = async (nickname) => {
  try {
    const result = await userAxios.post(
      "/nickname",
      { nickname: nickname },
      {}
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    console.error("닉네임 중복 체크 실패");
  }
};

export default isNickname;
