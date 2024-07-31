import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CrimeDoughnutChart = ({ data, title }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        backgroundColor: [
          "#3399FF",
          "#4DA6FF",
          "#66B2FF",
          "#80BFFF",
          "#99CCFF",
          "#B3D9FF",
          "#CCE5FF",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "left",
        align: "center",
        labels: {
          boxWidth: 18,
        },
      },
    },
  };

  return (
    <div
      style={{
        height: "300px",
        width: "350px",
      }}
    >
      <h2 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#333" }}>
        {title}
      </h2>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default CrimeDoughnutChart;
