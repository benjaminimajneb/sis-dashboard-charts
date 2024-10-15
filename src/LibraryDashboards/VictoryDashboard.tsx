import React from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryLine,
} from "victory";

const Dashboard: React.FC = () => {
  // Data for Pie Chart
  const genderData = [
    { x: "Female", y: 44.6 },
    { x: "Male", y: 55.4 },
  ];

  // Data for Bar Chart
  const ethnicityData = [
    { x: "Ethnicity 1", y: 25, url: "url.com/ID1" },
    { x: "Ethnicity 2", y: 15, url: "url.com/ID1" },
    { x: "Ethnicity 3", y: 20, url: "url.com/ID1" },
    { x: "Ethnicity 4", y: 10, url: "url.com/ID1" },
    { x: "Ethnicity 5", y: 18, url: "url.com/ID1" },
    { x: "Ethnicity 6", y: 12, url: "url.com/ID1" },
  ];

  const attdata1 = [
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
  ];

  const attdata2 = [
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
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Victory</h2>

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
          <VictoryPie
            data={genderData}
            colorScale={["#FF69B4", "#1E90FF"]}
            labels={({ datum }) => `${datum.x}: ${datum.y}%`}
            style={{
              labels: { fontSize: 12, fill: "#333" },
              data: { stroke: "#fff", strokeWidth: 2 },
            }}
            width={300}
            height={300}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: (event, props) => {
                    const value = props.datum.x;
                    alert(`Value: ${value}`);
                  },
                },
              },
            ]}
          />
        </div>

        <div style={{ flex: "1", marginRight: "20px", textAlign: "center" }}>
          <h2>Ethnicity Distribution</h2>
          <VictoryChart domainPadding={20} width={300} height={300}>
            <VictoryAxis />
            <VictoryAxis dependentAxis />
            <VictoryBar
              data={ethnicityData}
              style={{
                data: { fill: "#4CAF50", width: 20 },
              }}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onClick: (event, props) => {
                      const ethnicityUrl = props.datum.url;
                      alert(`Ethnicity ID: ${ethnicityUrl}`);
                    },
                  },
                },
              ]}
            />
          </VictoryChart>
        </div>

        <div style={{ flex: "1", textAlign: "center" }}>
          <h2>Monthly Attendance</h2>
          <VictoryChart width={300} height={300}>
            <VictoryAxis />
            <VictoryAxis dependentAxis />

            <VictoryLine data={attdata1} style={{ data: { stroke: "blue" } }} />
            <VictoryLine data={attdata2} style={{ data: { stroke: "red" } }} />
          </VictoryChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
