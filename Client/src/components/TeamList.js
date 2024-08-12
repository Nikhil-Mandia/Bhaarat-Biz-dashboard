import React, { useState, useEffect } from "react";
import { Tree } from "react-d3-tree"; 

const TeamList = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [networkTreeData, setNetworkTreeData] = useState({});
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchTeamData = () => {
      const dummyMembers = [
        {
          id: 1,
          name: "John Doe",
          performance: "Top Performer",
          contact: "john.doe@example.com",
        },
        {
          id: 2,
          name: "Jane Smith",
          performance: "Average Performer",
          contact: "jane.smith@example.com",
        },
      ];
      setTeamMembers(dummyMembers);

      const dummyTreeData = {
        name: "Root Member",
        children: [
          {
            name: "John Doe",
            children: [{ name: "Sub Member 1" }, { name: "Sub Member 2" }],
          },
          {
            name: "Jane Smith",
            children: [{ name: "Sub Member 3" }, { name: "Sub Member 4" }],
          },
        ],
      };
      setNetworkTreeData(dummyTreeData);
    };

    fetchTeamData();
  }, []);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">My Team</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Team Members</h3>
        <ul className="space-y-2">
          {teamMembers.map((member) => (
            <li
              key={member.id}
              className="p-4 bg-gray-100 rounded-md cursor-pointer"
              onClick={() => handleMemberClick(member)}
            >
              <div className="font-semibold">{member.name}</div>
              <div className="text-gray-600">
                Performance: {member.performance}
              </div>
              <div className="text-gray-600">Contact: {member.contact}</div>
            </li>
          ))}
        </ul>
      </div>

      {selectedMember && (
        <div className="mb-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-xl font-semibold mb-2">Selected Member</h3>
          <div className="font-semibold">{selectedMember.name}</div>
          <div className="text-gray-600">
            Performance: {selectedMember.performance}
          </div>
          <div className="text-gray-600">Contact: {selectedMember.contact}</div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-2">Network Structure</h3>
        <div className="w-full h-[500px]">
          <Tree data={networkTreeData} />
        </div>
      </div>
    </div>
  );
};

export default TeamList;
