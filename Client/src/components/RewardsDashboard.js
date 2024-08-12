import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed

const Recommendations = () => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Personalized Recommendations
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>
          Increase your sales by 20% to achieve the "Quarterly Excellence"
          reward.
        </li>
        <li>
          Engage with more team members to qualify for the "Yearly Champion"
          reward.
        </li>
      </ul>
    </div>
  );
};

const RewardsDashboard = () => {
  const [rewards, setRewards] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const userId = "user-id";

  useEffect(() => {
    const fetchRewardsData = async () => {
      try {
        const [earnedRewardsResponse, upcomingRewardsResponse] =
          await Promise.all([
            axios.get(`/api/rewards/earned/${userId}`),
            axios.get(`/api/rewards/upcoming/${userId}`),
          ]);

        setRewards(earnedRewardsResponse.data);
        setUpcoming(upcomingRewardsResponse.data);
      } catch (error) {
        console.error("Error fetching rewards data", error);
      }
    };

    fetchRewardsData();
  }, [userId]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        Rewards & Incentives
      </h2>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Earned Rewards
        </h3>
        <div className="space-y-6">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <h4 className="text-xl font-semibold text-gray-900">
                {reward.name}
              </h4>
              <p className="text-md text-gray-600 mt-1">{reward.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Earned Date: {new Date(reward.earnedDate).toLocaleDateString()}
              </p>
              <div className="mt-4">
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-teal-600 bg-teal-200">
                      Progress
                    </span>
                  </div>
                  <div className="flex">
                    <div
                      className="relative flex-grow bg-teal-200 rounded"
                      style={{ height: "10px" }}
                    >
                      <div
                        className="absolute top-0 left-0 h-full bg-teal-600 rounded"
                        style={{ width: `${reward.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Upcoming Rewards
        </h3>
        <ul className="list-disc pl-5 space-y-4 text-gray-700">
          {upcoming.map((reward) => (
            <li
              key={reward.id}
              className="py-3 px-4 bg-gray-50 rounded-lg shadow-md"
            >
              <p className="font-semibold text-gray-900">{reward.name}</p>
              <p className="text-sm text-gray-500">
                Deadline: {new Date(reward.deadline).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <Recommendations />
    </div>
  );
};

export default RewardsDashboard;
