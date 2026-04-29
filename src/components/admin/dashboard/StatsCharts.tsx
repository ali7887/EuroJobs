"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function StatsCharts({ data }: { data: number[] }) {
  return (
    <div className="card">
      <h3 className="card-title">Users Growth</h3>

      <Line
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            {
              label: "Users",
              data,
              borderColor: "#6c63ff",
              backgroundColor: "rgba(108, 99, 255, 0.2)",
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
        }}
      />
    </div>
  );
}
