import userAxios from "./userAxios";

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
