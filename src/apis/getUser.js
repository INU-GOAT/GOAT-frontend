import refreshTokens from "./refreshTokens";
import userAxios from "./userAxios";
import { axios } from "axios";

const getUser = async () => {
  try {
    const result = await userAxios.get();
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error(error);
    console.error("getUser 실패");
  }
};
export default getUser;
