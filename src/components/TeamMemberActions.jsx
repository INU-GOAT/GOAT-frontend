import React, { useState, useEffect } from 'react';
import { getGroupMembers, acceptGroupInvite, leaveGroup, getGroupDetails } from '../apis/group';
import './TeamMemberActions.css';

const TeamMemberActions = ({ disabled }) => {
  const [invites, setInvites] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const members = await getGroupMembers();
        if (members && Array.isArray(members)) {
          setGroupMembers(members);
        } else {
          setGroupMembers([]);
        }
      } catch (err) {
        setError('그룹원 목록을 가져오는 데 실패했습니다.');
      }
    };

    fetchGroupMembers();
  }, []);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const groupDetails = await getGroupDetails();
        if (groupDetails && groupDetails.invites) {
          setInvites(groupDetails.invites);
        } else {
          setInvites([]);
        }
      } catch (err) {
        setError('초대 목록을 가져오는 데 실패했습니다.');
      }
    };

    fetchGroupDetails();
  }, []);

  const handleAcceptInvite = async (notificationId) => {
    try {
      const result = await acceptGroupInvite(notificationId, true);
      if (result) {
        setInvites(invites.filter(invite => invite.notificationId !== notificationId));
        setGroupMembers([...groupMembers, result]);
      }
    } catch (err) {
      setError('그룹 초대 수락에 실패했습니다.');
    }
  };

  const handleLeaveGroup = async () => {
    try {
      const result = await leaveGroup();
      if (result) {
        setGroupMembers([]);
      }
    } catch (err) {
      setError('그룹 탈퇴에 실패했습니다.');
    }
  };

  return (
    <div className="team-member-actions-container">
      {error && <div className="team-member-actions-error">{error}</div>}
      {invites.length > 0 && (
        <>
          <h3>그룹 초대</h3>
          <ul className="group-invite-list">
            {invites.map((invite) => (
              <li key={invite.notificationId} className="group-invite-list-item">
                {invite.groupName}
                <button onClick={() => handleAcceptInvite(invite.notificationId)} disabled={disabled}>수락</button>
              </li>
            ))}
          </ul>
        </>
      )}
      <h3>그룹원 목록</h3>
      <ul className="group-member-list">
        {groupMembers.map((member) => (
          <li key={member.id} className="group-member-list-item">
            {member.nickname}
          </li>
        ))}
      </ul>
      <button onClick={handleLeaveGroup} disabled={disabled} className="group-leave-button">그룹 탈퇴</button>
    </div>
  );
};

export default TeamMemberActions;