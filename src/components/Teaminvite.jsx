import React, { useState, useEffect } from 'react';
import { inviteToGroup, expelGroupMember, getGroupMembers } from '../apis/group';
import './Teaminvite.css';

const Teaminvite = ({ disabled }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      const members = await getGroupMembers();
      if (members && Array.isArray(members)) {
        setGroupMembers(members);
      } else {
        setGroupMembers([]);
      }
    };

    fetchGroupMembers();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddUser = async () => {
    if (inputValue.trim() === '') {
      setError('유저 닉네임을 입력하세요.');
      return;
    }

    const result = await inviteToGroup(inputValue.trim());
    if (!result) {
      setError('그룹 초대 실패.');
      return;
    }

    setGroupMembers([...groupMembers, { nickname: inputValue.trim() }]);
    setInputValue('');
    setError('');
  };

  const handleRemoveUser = async (memberId) => {
    const result = await expelGroupMember(memberId);
    if (result) {
      setGroupMembers(groupMembers.filter(member => member.id !== memberId));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
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
          disabled={disabled}
          className="team-invite-input"
        />
        <button onClick={handleAddUser} disabled={disabled} className="team-invite-button">추가</button>
      </div>
      {error && <div className="team-invite-error">{error}</div>}
      <ul className="team-invite-list">
        {groupMembers.map((member) => (
          <li key={member.id || member.nickname} className="team-invite-list-item">
            {member.nickname}
            <button onClick={() => handleRemoveUser(member.id)} disabled={disabled}>추방</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teaminvite;