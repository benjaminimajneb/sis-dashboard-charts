import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";

const Dashboard: React.FC = () => {
  // Data for Pie Chart
  const genderData = [
    { id: "Female", label: "Female", value: 44.6, color: "#FF69B4" },
    { id: "Male", label: "Male", value: 55.4, color: "#1E90FF" },
  ];

  // Data for Bar Chart
  const ethnicityData = [
    { ethnicity: "Ethnicity 1", percentage: 25, url: "url.com/ID1" },
    { ethnicity: "Ethnicity 2", percentage: 15, url: "url.com/ID2" },
    { ethnicity: "Ethnicity 3", percentage: 20, url: "url.com/ID3" },
    { ethnicity: "Ethnicity 4", percentage: 10, url: "url.com/ID4" },
    { ethnicity: "Ethnicity 5", percentage: 18, url: "url.com/ID5" },
    { ethnicity: "Ethnicity 6", percentage: 12, url: "url.com/ID6" },
  ];

  // Data for Line Chart (Attendance for each month)
  const attendanceData = [
    {
      id: "Attendance 1",
      data: [
        { x: "Jan", y: 90 },
        { x: "Feb", y: 91 },
        { x: "Mar", y: 89 },
        { x: "Apr", y: 92 },
        { x: "May", y: 90 },
        { x: "Jun", y: 91 },
        { x: "Jul", y: 88 },
        { x: "Aug", y: 90 },
        { x: "Sep", y: 91 },
        { x: "Oct", y: 89 },
        { x: "Nov", y: 90 },
        { x: "Dec", y: 92 },
      ],
    },
    {
      id: "Attendance 2",
      data: [
        { x: "Jan", y: 85 },
        { x: "Feb", y: 87 },
        { x: "Mar", y: 88 },
        { x: "Apr", y: 86 },
        { x: "May", y: 89 },
        { x: "Jun", y: 85 },
        { x: "Jul", y: 86 },
        { x: "Aug", y: 88 },
        { x: "Sep", y: 85 },
        { x: "Oct", y: 87 },
        { x: "Nov", y: 86 },
        { x: "Dec", y: 88 },
      ],
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Nivo</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "300px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Total Students: <strong>5606</strong>
        </div>

        {/* Gender Pie Chart */}
        <div style={{ flex: "1", marginRight: "20px" }}>
          <h2 style={{ textAlign: "center" }}>Gender Distribution</h2>
          <ResponsivePie
            data={genderData}
            margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ datum: "data.color" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="#333333"
            onClick={(data) => alert(`Value: ${data.value}`)}
          />
        </div>

        <div style={{ flex: "1", marginRight: "20px" }}>
          <h2 style={{ textAlign: "center" }}>Ethnicity Distribution</h2>
          <ResponsiveBar
            data={ethnicityData}
            keys={["percentage"]}
            indexBy="ethnicity"
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Ethnicity",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Percentage",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            onClick={(data) => alert(`Ethnicity ID: ${data.data.url}`)}
          />
        </div>

        <div style={{ flex: "1" }}>
          <h2 style={{ textAlign: "center" }}>Monthly Attendance</h2>
          <ResponsiveLine
            data={attendanceData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Month",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Attendance (%)",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            colors={{ scheme: "nivo" }}
            lineWidth={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
