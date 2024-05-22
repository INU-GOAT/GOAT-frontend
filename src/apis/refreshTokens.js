import userAxios from "./userAxios";

const refreshTokens = async (config) => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const result = await userAxios.post("/refresh", null, {
      headers: { refresh: refreshToken },
    });
    console.log(result);
    localStorage.setItem("accessToken", result.data.accessToken);
    localStorage.setItem("refreshToken", result.data.refreshToken);
    config.headers.Auth = result.data.accessToken;
  } catch (error) {
    console.error(error);
    console.error("refreshTokens 실패");
    throw error;
  }
};

export default refreshTokens;