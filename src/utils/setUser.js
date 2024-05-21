const setUser = (data) => {
  localStorage.setItem("age", data.age);
  localStorage.setItem("badminton_tier", data.badminton_tier);
  localStorage.setItem("basketball_tier", data.basketball_tier);
  localStorage.setItem("club", data.club);
  localStorage.setItem("gender", data.gender);
  localStorage.setItem("id", data.id);
  localStorage.setItem("nickname", data.nickname);
  localStorage.setItem("prefer_sport", data.prefer_sport);
  localStorage.setItem("soccer_tier", data.soccer_tier);
  localStorage.setItem("tableTennis_tier", data.tableTennis_tier);
  localStorage.setItem("status", data.status);
  localStorage.setItem("isVoted", data.isVoted);
};

export default setUser;
