import React, { useState, useEffect } from 'react';
import { getGroupMembers, acceptGroupInvite, leaveGroup, getInvites } from '../apis/group';
import './TeamMemberActions.css';

const TeamMemberActions = ({ disabled }) => {
  const [invites, setInvites] = useState([]);
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

  useEffect(() => {
    const fetchInvites = async () => {
      const invites = await getInvites();
      if (invites && Array.isArray(invites)) {
        setInvites(invites);
      } else {
        setInvites([]);
      }
    };

    fetchInvites();
  }, []);

  const handleAcceptInvite = async (groupId, sendTime) => {
    const result = await acceptGroupInvite(groupId, sendTime, true);
    if (result) {
      setInvites(invites.filter(invite => invite.groupId !== groupId));
      setGroupMembers([...groupMembers, result]);
    }
  };

  const handleLeaveGroup = async () => {
    const result = await leaveGroup();
    if (result) {
      setGroupMembers([]);
    }
  };

  return (
    <div className="team-member-actions-container">
      {invites.length > 0 && (
        <>
          <h3>그룹 초대</h3>
          <ul className="group-invite-list">
            {invites.map((invite) => (
              <li key={invite.groupId} className="group-invite-list-item">
                {invite.groupName}
                <button onClick={() => handleAcceptInvite(invite.groupId, invite.sendTime)} disabled={disabled}>수락</button>
              </li>
            ))}
          </ul>
        </>
      )}
      <h3>그룹원 목록</h3>
      <ul className="group-member-list">
        {groupMembers.map((member) => (
          <li key={member.id} className="group-member-list-item">
            {member.username}
          </li>
        ))}
      </ul>
      <button onClick={handleLeaveGroup} disabled={disabled} className="group-leave-button">그룹 탈퇴</button>
    </div>
  );
};

export default TeamMemberActions;