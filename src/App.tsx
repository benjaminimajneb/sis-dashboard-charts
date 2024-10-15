import React, { useState } from "react";
import VegaDashboard from "./LibraryDashboards/VegaDashboard";
import VisDashboard from "./LibraryDashboards/VisDashboard";
import RechartsDashboard from "./LibraryDashboards/RechartsDashboard";
import VictoryDashboard from "./LibraryDashboards/VictoryDashboard";
import NivoDashboard from "./LibraryDashboards/NivoDashboard";
import EchartsDashboard from "./LibraryDashboards/EchartsDashboard";
import ReactChartJs2Dashboard from "./LibraryDashboards/ReactChartJs2Dashboard";
import DataDashboard from "./Components/EchartsDashboard";
import "./App.css";
import "./Tabs.css";
import "./Chart.css";
import "./Chart.css";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { title: "Libraries", content: <LibrariesDashboard /> },
    { title: "Data Dashboard", content: <DataDashboard theme="dark"/> },
  ];

  return (
      <div className="tabs-container">
        <div className="tab-titles">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab-title ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className="tab-content">{tabs[activeTab].content}</div>
      </div>
  );
};

const LibrariesDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Student Dashboard</h1>
      <VegaDashboard />
      <VisDashboard />
      <RechartsDashboard />
      <VictoryDashboard />
      <NivoDashboard />
      <EchartsDashboard />
      <ReactChartJs2Dashboard />
    </div>
  );
};

export default App;
