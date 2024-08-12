import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const PerformanceChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const dummyData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      sales: [30, 45, 60, 50, 70, 85, 90],
      revenue: [20, 35, 50, 45, 60, 80, 95],
      growth: [5, 10, 15, 10, 20, 25, 30],
    };

    setChartData({
      labels: dummyData.labels,
      datasets: [
        {
          label: "Sales",
          data: dummyData.sales,
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          pointRadius: 3,
        },
        {
          label: "Revenue",
          data: dummyData.revenue,
          fill: false,
          borderColor: "rgba(255,99,132,1)",
          pointRadius: 3,
        },
        {
          label: "Growth",
          data: dummyData.growth,
          fill: false,
          borderColor: "rgba(54,162,235,1)",
          pointRadius: 3,
        },
      ],
    });
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md w-[400px] h-[300px] mx-auto">
      <h2 className="text-2xl font-bold mb-4">Performance Overview</h2>
      <div className="relative h-full">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                },
              },
              y: {
                grid: {
                  borderColor: "#ddd",
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
                labels: {
                  font: {
                    size: 14,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                  },
                },
              },
            },
          }}
          height={300}
        />
      </div>
    </div>
  );
};

export default PerformanceChart;
