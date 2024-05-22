import userAxios from "./userAxios";

export const getUser = async () => {
  try {
    const result = await userAxios.get();
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error(error);
    console.error("getUser 실패");
  }
};

export const updateUserStatus = async (status) => {
  try {
    const response = await userAxios.patch('/status', { status });
    return response.data;
  } catch (error) {
    console.error('Status update 실패:', error);
    return null;
  }
};