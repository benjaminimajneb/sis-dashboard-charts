import React from "react";
import ReactECharts from "echarts-for-react";

const Dashboard: React.FC = () => {
  // Gender Distribution Pie Chart
  const pieOption = {
    title: {
      text: "Gender Distribution",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "0%",
    },
    series: [
      {
        data: [
          { value: 44.6, name: "Female" },
          { value: 55.4, name: "Male" },
        ],
        name: "Gender",
        type: "pie",
        radius: "50%",
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  // Ethnicity Distribution Bar Chart
  const barOption = {
    title: {
      text: "Ethnicity Distribution",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: [
        "Ethnicity 1",
        "Ethnicity 2",
        "Ethnicity 3",
        "Ethnicity 4",
        "Ethnicity 5",
        "Ethnicity 6",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [
          { value: 25, url: "url.com/ID1" },
          { value: 15, url: "url.com/ID2" },
          { value: 20, url: "url.com/ID3" },
          { value: 10, url: "url.com/ID4" },
          { value: 18, url: "url.com/ID5" },
          { value: 12, url: "url.com/ID6" },
        ],
        type: "bar",
        barWidth: "50%",
        itemStyle: {
          color: "#4CAF50",
        },
      },
    ],
  };

  // Monthly Attendance Line Chart
  const lineOption = {
    title: {
      text: "Monthly Attendance",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Attendance 1",
        type: "line",
        data: [
          { value: 90 }, { value: 91 }, { value: 89 }, { value: 92 },
          { value: 90 }, { value: 91 }, { value: 88 }, { value: 90 },
          { value: 91 }, { value: 89 }, { value: 90 }, { value: 92 }
        ],
        color: "blue",
      },
      {
        name: "Attendance 2",
        type: "bar",
        data: [
          { value: 85 }, { value: 87 }, { value: 88 }, { value: 86 },
          { value: 89 }, { value: 85 }, { value: 86 }, { value: 88 },
          { value: 85 }, { value: 87 }, { value: 86 }, { value: 88 }
        ],
        color: "red",
      },
      {
        name: "Attendance 3",
        type: "line",
        data: [
          { value: 65 }, { value: 67 }, { value: 78 }, { value: 76 },
          { value: 79 }, { value: 75 }, { value: 76 }, { value: 85 },
          { value: 81 }, { value: 89 }, { value: 96 }, { value: 98 }
        ],
        color: "yellow",
        itemStyle: {
          color: "blue",
        },
      },
    ],
  };
  const onChartClick = (params: any) => {
    alert(`Value: ${params.value}`);
  };
  const onBarClick = (params: any) => {
    alert(`Value: ${params.data.url}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Apache Echarts</h2>

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
          <ReactECharts
            option={pieOption}
            style={{ height: 300, width: "100%" }}
            onEvents={{ click: onChartClick }}
          />
        </div>

        <div style={{ flex: "1", marginRight: "20px", textAlign: "center" }}>
          <ReactECharts
            option={barOption}
            style={{ height: 300, width: "100%" }}
            onEvents={{ click: onBarClick }}
          />
        </div>

        <div style={{ flex: "1", textAlign: "center" }}>
          <ReactECharts
            option={lineOption}
            style={{ height: 300, width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
