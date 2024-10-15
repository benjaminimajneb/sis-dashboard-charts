import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard: React.FC = () => {
  // Gender Distribution Pie Chart
  const pieData = {
    labels: ["Female", "Male"],
    datasets: [
      {
        data: [44.6, 55.4],
        backgroundColor: ["#FF69B4", "#1E90FF"],
        hoverBackgroundColor: ["#FF1493", "#1C86EE"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const, // Explicitly define position as a specific string literal
      },
      title: {
        display: true,
        text: "Gender Distribution",
      },
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const { index } = elements[0];
        alert(`Value: ${pieData.datasets[0].data[index]}`);
      }
    },
  };

  // Ethnicity Distribution Bar Chart
  const barData = {
    labels: [
      "Ethnicity 1",
      "Ethnicity 2",
      "Ethnicity 3",
      "Ethnicity 4",
      "Ethnicity 5",
      "Ethnicity 6",
    ],
    datasets: [
      {
        label: "Percentage",
        data: [
          { value: 25, url: "url.com/ID1" },
          { value: 20, url: "url.com/ID2" },
          { value: 10, url: "url.com/ID5" },
          { value: 18, url: "url.com/ID4" },
          { value: 12, url: "url.com/ID12" },
        ],
        backgroundColor: "#4CAF50",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Ethnicity Distribution",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ethnicity",
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage",
        },
        beginAtZero: true,
      },
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        alert(`Ethnicity ID: ${barData.datasets[0].data[index].url}`);
      }
    },
  };

  const lineData = {
    labels: [
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
    datasets: [
      {
        label: "Attendance 1",
        data: [90, 91, 89, 92, 90, 91, 88, 90, 91, 89, 90, 92],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        tension: 0.4,
      },
      {
        label: "Attendance 2",
        data: [85, 87, 88, 86, 89, 85, 86, 88, 85, 87, 86, 88],
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Explicitly define position as a specific string literal
      },
      title: {
        display: true,
        text: "Monthly Attendance",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Attendance (%)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>React ChartJs 2</h2>

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
          <Pie data={pieData} options={pieOptions} height={"300px"} />
        </div>

        <div style={{ flex: "1", marginRight: "20px", textAlign: "center" }}>
          <Bar data={barData} options={barOptions} height={"300px"} />
        </div>

        <div style={{ flex: "1", textAlign: "center" }}>
          <Line data={lineData} options={lineOptions} height={"300px"} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
