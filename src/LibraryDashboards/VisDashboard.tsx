import React from "react";
import {
  RadialChart,
  VerticalBarSeries,
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
} from "react-vis";
import "react-vis/dist/style.css";

const Dashboard: React.FC = () => {
  // Data for Pie Chart
  const genderData = [
    { angle: 44.6, label: "Female", color: "#FF69B4" },
    { angle: 55.4, label: "Male", color: "#1E90FF" },
  ];

  // Data for Bar Chart
  const ethnicityData = [
    { x: "Ethnicity 1", y: 25, url: "url.com/ID1" },
    { x: "Ethnicity 2", y: 15, url: "url.com/ID2" },
    { x: "Ethnicity 3", y: 20, url: "url.com/ID3" },
    { x: "Ethnicity 4", y: 10, url: "url.com/ID4" },
    { x: "Ethnicity 5", y: 18, url: "url.com/ID5" },
    { x: "Ethnicity 6", y: 12, url: "url.com/ID6" },
  ];

  const attendanceData = [
    { x: 1, y: 90 },
    { x: 2, y: 91 },
    { x: 3, y: 89 },
    { x: 4, y: 92 },
    { x: 5, y: 90 },
    { x: 6, y: 91 },
    { x: 7, y: 88 },
    { x: 8, y: 90 },
    { x: 9, y: 91 },
    { x: 10, y: 89 },
    { x: 11, y: 90 },
    { x: 12, y: 92 },
  ];

  const attendanceData2 = [
    { x: 1, y: 85 },
    { x: 2, y: 87 },
    { x: 3, y: 88 },
    { x: 4, y: 86 },
    { x: 5, y: 89 },
    { x: 6, y: 85 },
    { x: 7, y: 86 },
    { x: 8, y: 88 },
    { x: 9, y: 85 },
    { x: 10, y: 87 },
    { x: 11, y: 86 },
    { x: 12, y: 88 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>React Vis</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Total Students */}
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

        {/* Gender Pie Chart */}
        <div style={{ flex: "1", marginRight: "20px", textAlign: "center" }}>
          <h2>Gender Distribution</h2>
          <RadialChart
            data={genderData}
            width={300}
            height={300}
            showLabels
            colorType="literal"
            onValueClick={(datapoint) => alert(`Value: ${datapoint.label}`)}
          />
        </div>

        {/* Ethnicity Bar Chart */}
        <div style={{ flex: "1", marginRight: "20px", textAlign: "center" }}>
          <h2>Ethnicity Distribution</h2>
          <XYPlot
            margin={{ bottom: 70 }}
            xType="ordinal"
            width={300}
            height={300}
          >
            <XAxis />
            <YAxis />
            <VerticalBarSeries
              data={ethnicityData}
              barWidth={0.5}
              onValueClick={(datapoint) =>
                alert(`Ethnicity ID: ${datapoint.url}`)
              }
            />
          </XYPlot>
        </div>

        <div style={{ flex: "1", textAlign: "center" }}>
          <div style={{ flex: "1", textAlign: "center" }}>
            <h2>Monthly Attendance</h2>
            <XYPlot height={300} width={500}>
              <XAxis />
              <YAxis />
              <LineSeries
                data={attendanceData}
                style={{ stroke: "blue", strokeWidth: 3 }}
              />
              <LineSeries
                data={attendanceData2}
                style={{ stroke: "red", strokeWidth: 3 }}
              />
            </XYPlot>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
