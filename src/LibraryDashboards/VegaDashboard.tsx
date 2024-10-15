import React from "react";

import { VegaLite } from "react-vega";
import { VisualizationSpec } from "vega-embed";

const Dashboard: React.FC = () => {
  const genderSpec: VisualizationSpec = {
    width: 300,
    height: 300,
    mark: "arc",
    encoding: {
      theta: { field: "percentage", type: "quantitative" },
      color: { field: "gender", type: "nominal" },
    },
    signals: [
      {
        name: "clickedValue",
        on: [
          {
            events: "*:click",
            update: "warn(datum.percentage)",
          },
        ],
      },
      {
        name: "alertSignal",
        on: [
          {
            events: { signal: "clickedValue" },
            update: "alert('Value: ' + clickedValue)",
          },
        ],
      },
    ],
    data: {
      values: [
        { gender: "Female", percentage: 44.6 },
        { gender: "Male", percentage: 55.4 },
      ],
    },
  };

  // Specification for Ethnicity Bar Chart
  const ethnicitySpec: VisualizationSpec = {
    width: 300,
    height: 300,
    mark: "bar",
    encoding: {
      x: { field: "ethnicity", type: "ordinal", axis: { labelAngle: -40 } },
      y: { field: "percentage", type: "quantitative" },
    },
    data: {
      values: [
        { ethnicity: "Ethnicity 1", percentage: 25, url: "url.com/ID1" },
        { ethnicity: "Ethnicity 2", percentage: 15, url: "url.com/ID1" },
        { ethnicity: "Ethnicity 3", percentage: 20, url: "url.com/ID1" },
        { ethnicity: "Ethnicity 4", percentage: 10, url: "url.com/ID1" },
        { ethnicity: "Ethnicity 5", percentage: 18, url: "url.com/ID1" },
        { ethnicity: "Ethnicity 6", percentage: 12, url: "url.com/ID1" },
      ],
    },
    signals: [
      {
        name: "ethnicityUrl",
        on: [
          {
            events: "rect:click",
            update: "datum.ethnicityUrl",
          },
        ],
      },
      {
        name: "alertSignal",
        on: [
          {
            events: { signal: "ethnicityUrl" },
            update: "alert('url: ' + ethnicityUrl)",
          },
        ],
      },
    ],
  };

  // Specification for Attendance Line Chart
  const attendanceSpec: VisualizationSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: 300,
    height: 300,
    layer: [
      {
        mark: "line",
        encoding: {
          x: { field: "month", type: "ordinal" },
          y: { field: "attendance1", type: "quantitative" },
          color: { value: "blue" },
        },
      },
      {
        mark: "line",
        encoding: {
          x: { field: "month", type: "ordinal" },
          y: { field: "attendance2", type: "quantitative" },
          color: { value: "red" },
        },
      },
    ],
    data: {
      values: [
        { month: "Jan", attendance1: 90, attendance2: 85 },
        { month: "Feb", attendance1: 91, attendance2: 87 },
        { month: "Mar", attendance1: 89, attendance2: 88 },
        { month: "Apr", attendance1: 92, attendance2: 86 },
        { month: "May", attendance1: 90, attendance2: 89 },
        { month: "Jun", attendance1: 91, attendance2: 85 },
        { month: "Jul", attendance1: 88, attendance2: 86 },
        { month: "Aug", attendance1: 90, attendance2: 88 },
        { month: "Sep", attendance1: 91, attendance2: 85 },
        { month: "Oct", attendance1: 89, attendance2: 87 },
        { month: "Nov", attendance1: 90, attendance2: 86 },
        { month: "Dec", attendance1: 92, attendance2: 88 },
      ],
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Vega Lite</h2>
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
          <VegaLite
            spec={genderSpec}
            //this doesn't seem to be the accepted way but only thing I can find that works.
            onNewView={(view) => {
              view.addEventListener("click", (_e, item) => console.log(item));
            }}
          />
        </div>

        {/* Ethnicity Bar Chart */}
        <div style={{ flex: "1", marginRight: "20px", textAlign: "center" }}>
          <h2>Ethnicity Distribution</h2>
          <VegaLite spec={ethnicitySpec} />
        </div>

        {/* Attendance Line Chart */}
        <div style={{ flex: "1", textAlign: "center" }}>
          <h2>Monthly Attendance</h2>
          <VegaLite spec={attendanceSpec} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
