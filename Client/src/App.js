import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/RewardDetails";
import Dashboard from "./pages/Dashboard";
import PerformanceChart from "./components/PerformanceChart";
import NetworkGraph from "./components/NetworkGraph";
import RewardsDashboard from "./components/RewardsDashboard";
import WalletBalance from "./components/WalletBalance";
import Portfolio from "./components/Portfolio";
import Earnings from "./components/Earnings";
import TeamList from "./components/TeamList";
import Messaging from "./components/Messaging";
import Profile from "./pages/Profile"; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/performance" element={<PerformanceChart />} />
          <Route path="/network" element={<NetworkGraph />} />
          <Route path="/rewards" element={<RewardsDashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/team" element={<TeamList />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/profile" element={<Profile />} />{" "}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
