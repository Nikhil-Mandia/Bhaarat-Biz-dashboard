import React from "react";
import { Link } from "react-router-dom";
import PerformanceChart from "../components/PerformanceChart";
import NetworkGraph from "../components/NetworkGraph";
import RewardsDashboard from "../components/RewardsDashboard";
import Messaging from "../components/Messaging";
import WalletBalance from "../components/WalletBalance";
import Portfolio from "../components/Portfolio";
import Earnings from "../components/Earnings";
import TeamList from "../components/TeamList";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        Client Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/performance" className="card">
          <PerformanceChart />
        </Link>
        <Link to="/network" className="card">
          <NetworkGraph />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Link to="/rewards" className="card">
          <RewardsDashboard />
        </Link>
        <Link to="/wallet" className="card">
          <WalletBalance />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Link to="/portfolio" className="card">
          <Portfolio />
        </Link>
        <Link to="/earnings" className="card">
          <Earnings />
        </Link>
      </div>
      <div className="mt-8">
        <Link to="/team" className="card">
          <TeamList />
        </Link>
      </div>
      <div className="mt-8">
        <Link to="/messaging" className="card">
          <Messaging />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
