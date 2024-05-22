import React, { useState, useEffect } from 'react';
import { getUser } from '../apis/getUser';
import { inviteToGroup, expelGroupMember, getGroupMembers, createGroup } from '../apis/group';
import './Teaminvite.css';

const Teaminvite = ({ disabled, onGroupCreated }) => {
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    if (groupId) {
      const fetchGroupMembers = async () => {
        const members = await getGroupMembers();
        if (members && Array.isArray(members)) {
          setGroupMembers(members);
        } else {
          setGroupMembers([]);
        }
      };

      fetchGroupMembers();
    }
  }, [groupId]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddUser = async () => {
    if (inputValue.trim() === '') {
      setError('유저 닉네임을 입력하세요.');
      return;
    }

    const users = await getUser();
    if (!Array.isArray(users)) {
      setError('유저 목록을 가져오는 데 실패했습니다.');
      return;
    }

    const user = users.find(u => u.nickname === inputValue.trim());
    if (!user) {
      setError('유저 닉네임이 존재하지 않습니다.');
      return;
    }

    const result = await inviteToGroup(inputValue.trim());
    if (!result) {
      setError('그룹 초대 실패.');
      return;
    }

    setInvitedUsers([...invitedUsers, inputValue.trim()]);
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

  useEffect(() => {
    const createNewGroup = async () => {
      const groupData = await createGroup();
      if (groupData) {
        setGroupId(groupData.id);
        if (onGroupCreated) {
          onGroupCreated(groupData.id);
        }
      } else {
        setError('그룹 생성 실패');
      }
    };

    createNewGroup();
  }, [onGroupCreated]);

  return (
    <div className="team-invite-container">
      <div className="team-invite-input-group">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="유저 닉네임 입력"
          disabled={disabled || !groupId}
          className="team-invite-input"
        />
        <button onClick={handleAddUser} disabled={disabled || !groupId} className="team-invite-button">추가</button>
      </div>
      {error && <div className="team-invite-error">{error}</div>}
      <ul className="team-invite-list">
        {groupMembers.map((member) => (
          <li key={member.id} className="team-invite-list-item">
            {member.nickname}
            <button onClick={() => handleRemoveUser(member.id)} disabled={disabled}>추방</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teaminvite;