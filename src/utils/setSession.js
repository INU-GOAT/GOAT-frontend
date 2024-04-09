const setSession = (data) => {
  sessionStorage.setItem("age", data.age);
  sessionStorage.setItem("badminton_tier", data.badminton_tier);
  sessionStorage.setItem("basketball_tier", data.basketball_tier);
  sessionStorage.setItem("club", data.club);
  sessionStorage.setItem("gender", data.gender);
  sessionStorage.setItem("id", data.id);
  sessionStorage.setItem("nickname", data.nickname);
  sessionStorage.setItem("prefer_sport", data.prefer_sport);
  sessionStorage.setItem("soccer_tier", data.soccer_tier);
  sessionStorage.setItem("tableTennis_tier", data.tableTennis_tier);
};

export default setSession;
