import React, { useState } from 'react';

const TeamInvite = () => {
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddUser = () => {
    setInvitedUsers([...invitedUsers, inputValue]);
    setInputValue('');
  };

  const handleRemoveUser = (index) => {
    const updatedUsers = [...invitedUsers];
    updatedUsers.splice(index, 1);
    setInvitedUsers(updatedUsers);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} placeholder="유저 닉네임 입력" />
      <button onClick={handleAddUser}>추가</button>
      <ul>
        {invitedUsers.map((user, index) => (
          <li key={index}>
            {user} <button onClick={() => handleRemoveUser(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamInvite;