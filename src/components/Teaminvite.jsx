import React, { useState } from "react";
import getUser from "../apis/getUser";
import { inviteToGroup, expelGroupMember } from "../apis/group";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./Teaminvite.css";

const Teaminvite = ({ disabled }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddUser = async () => {
    if (inputValue.trim() === "") {
      setError("유저 닉네임을 입력하세요.");
      return;
    }

    setLoading(true);
    const user = await getUser(inputValue.trim());
    if (!user) {
      setError("유저 닉네임이 존재하지 않습니다.");
      setLoading(false);
      return;
    }

    const result = await inviteToGroup(inputValue.trim());
    if (!result) {
      setError("그룹 초대 실패.");
      setLoading(false);
      return;
    }

    setInvitedUsers([...invitedUsers, { id: user.id, nickname: inputValue.trim(), loading: true }]);
    setInputValue("");
    setError("");
    setLoading(false);
  };

  const handleRemoveUser = async (memberId) => {
    const result = await expelGroupMember(memberId);
    if (result) {
      setInvitedUsers(invitedUsers.filter((user) => user.id !== memberId));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddUser();
    }
  };

  return (
    <div className="team-invite-container">
      <div className="team-invite-input-group">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="유저 닉네임 입력"
          disabled={disabled || loading}
          className="team-invite-input"
        />
        <button
          onClick={handleAddUser}
          disabled={disabled || loading}
          className="team-invite-button"
        >
          추가
        </button>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', ml: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </div>
      {error && <div className="team-invite-error">{error}</div>}
      <ul className="team-invite-list">
        {invitedUsers.map((user) => (
          <li key={user.id} className="team-invite-list-item">
            {user.nickname}
            {user.loading ? (
              <CircularProgress size={24} />
            ) : (
              <button onClick={() => handleRemoveUser(user.id)} disabled={disabled}>
                추방
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teaminvite;