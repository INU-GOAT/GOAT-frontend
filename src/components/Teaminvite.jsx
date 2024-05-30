import React, { useState, useEffect } from "react";
import getUser from "../apis/getUser";
import { inviteToGroup, expelGroupMember, getGroupMembers } from "../apis/group";
import CircularProgress from '@mui/material/CircularProgress';
import './Teaminvite.css';

const Teaminvite = ({ disabled }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGroupMaster, setIsGroupMaster] = useState(false);

  useEffect(() => {
    const checkGroupMaster = async () => {
      const user = await getUser();
      const group = await getGroupMembers();
      if (group && group.members[0] === user.nickname) {
        setIsGroupMaster(true);
      } else {
        setIsGroupMaster(false);
      }
    };

    checkGroupMaster();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddUser = async () => {
    if (inputValue.trim() === "") {
      setError("유저 닉네임을 입력하세요.");
      return;
    }

    setLoading(true);
    const result = await inviteToGroup(inputValue.trim());
    if (!result) {
      setError("그룹 초대 실패.");
      setLoading(false);
      return;
    }

    setInvitedUsers([...invitedUsers, { id: result.id, nickname: inputValue.trim(), confirmed: false }]);
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
          disabled={disabled || loading || !isGroupMaster}
          className="team-invite-input"
        />
        <button
          onClick={handleAddUser}
          disabled={disabled || loading || !isGroupMaster}
          className="team-invite-button"
        >
          추가
        </button>
        {loading && <CircularProgress size={24} />}
      </div>
      {error && <div className="team-invite-error">{error}</div>}
      <ul className="team-invite-list">
        {invitedUsers.map((user) => (
          <li key={user.id} className="team-invite-list-item">
            {user.nickname}
            {!user.confirmed && <CircularProgress size={16} />}
            <button onClick={() => handleRemoveUser(user.id)} disabled={disabled || !isGroupMaster}>
              추방
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teaminvite;