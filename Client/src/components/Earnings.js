import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import io from "socket.io-client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const socket = io("http://localhost:5000"); 

const Earnings = () => {
  const [earnings, setEarnings] = useState({
    sales: 0,
    commissions: 0,
    bonuses: 0,
  });
  const [earningsHistory, setEarningsHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("earningsUpdate", (newEarnings) => {
      setEarnings(newEarnings);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        `New earnings update: Sales $${newEarnings.sales}, Commissions $${newEarnings.commissions}, Bonuses $${newEarnings.bonuses}`,
      ]);
    });

    return () => {
      socket.off("earningsUpdate");
    };
  }, []);

  useEffect(() => {
    const fetchEarningsHistory = () => {
      const dummyData = [
        { date: "2024-08-01", sales: 500, commissions: 200, bonuses: 50 },
        { date: "2024-08-02", sales: 600, commissions: 250, bonuses: 70 },
      ];
      setEarningsHistory(dummyData);
    };

    fetchEarningsHistory();
  }, []);

  const chartData = {
    labels: earningsHistory.map((entry) => entry.date),
    datasets: [
      {
        label: "Sales",
        data: earningsHistory.map((entry) => entry.sales),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Commissions",
        data: earningsHistory.map((entry) => entry.commissions),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
      {
        label: "Bonuses",
        data: earningsHistory.map((entry) => entry.bonuses),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">My Earnings</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Current Earnings</h3>
        <div className="space-y-2">
          <div className="p-4 bg-gray-100 rounded-md">
            <div className="font-semibold">
              Sales: ${earnings.sales.toFixed(2)}
            </div>
            <div className="font-semibold">
              Commissions: ${earnings.commissions.toFixed(2)}
            </div>
            <div className="font-semibold">
              Bonuses: ${earnings.bonuses.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Earnings History</h3>
        <div className="w-full h-[300px]">
          <Line
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Notifications</h3>
        <ul className="space-y-2">
          {notifications.map((notification, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-md">
              {notification}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Earnings;
