import refreshTokens from "./refreshTokens";
import userAxios from "./userAxios";
import { axios } from "axios";

const getUsers = async () => {
  try {
    const result = await userAxios.get();
    return result.data;
  } catch (error) {
    if (error.response.status === 401) {
      await refreshTokens();

      error.config.headers.Auth = localStorage.getItem("accessToken");
      return (await axios.get(error.config.url, error.config)).data;
    }
    console.error(error);
    console.error("getUser 실패");
  }
};
export default getUsers;
