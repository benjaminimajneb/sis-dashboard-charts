import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard: React.FC = () => {
  const rechartsGenderData = [
    { name: "Female", value: 44.6 },
    { name: "Male", value: 55.4 },
  ];

  const COLORS = ["#FF69B4", "#1E90FF"];

  // Data for Bar Chart
  const rechartsEthnicityData = [
    { name: "Ethnicity 1", percentage: 25, url: "url.com/ID1" },
    { name: "Ethnicity 2", percentage: 15, url: "url.com/ID2" },
    { name: "Ethnicity 3", percentage: 20, url: "url.com/ID3" },
    { name: "Ethnicity 4", percentage: 10, url: "url.com/ID4" },
    { name: "Ethnicity 5", percentage: 18, url: "url.com/ID5" },
    { name: "Ethnicity 6", percentage: 12, url: "url.com/ID6" },
  ];

  const rechartsAttendanceData = [
    { name: "Jan", attendance1: 90, attendance2: 85 },
    { name: "Feb", attendance1: 91, attendance2: 87 },
    { name: "Mar", attendance1: 89, attendance2: 88 },
    { name: "Apr", attendance1: 92, attendance2: 86 },
    { name: "May", attendance1: 90, attendance2: 89 },
    { name: "Jun", attendance1: 91, attendance2: 85 },
    { name: "Jul", attendance1: 88, attendance2: 86 },
    { name: "Aug", attendance1: 90, attendance2: 88 },
    { name: "Sep", attendance1: 91, attendance2: 85 },
    { name: "Oct", attendance1: 89, attendance2: 87 },
    { name: "Nov", attendance1: 90, attendance2: 86 },
    { name: "Dec", attendance1: 92, attendance2: 88 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Recharts</h2>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            flex: "1",
            fontSize: "24px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Total Students: <strong>5606</strong>
        </div>

        <div style={{ flex: "1", marginRight: "20px", textAlign: "center" }}>
          <h2>Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={rechartsGenderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
                onClick={(data) => alert(`Value: ${data.value}`)}
              >
                {rechartsGenderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: "1", marginRight: "20px", textAlign: "center" }}>
          <h2>Ethnicity Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={rechartsEthnicityData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="percentage"
                fill="#82ca9d"
                onClick={(data) => alert(`Ethnicity ID: ${data.url}`)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: "1", textAlign: "center" }}>
          <h2>Monthly Attendance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={rechartsAttendanceData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Line type="monotone" dataKey="attendance1" stroke="blue" />
              <Line
                type="monotone"
                dataKey="attendance2"
                stroke="red"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
