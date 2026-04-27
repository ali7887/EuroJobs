"use client";

import { useEffect } from "react";

export default function Charts() {
  useEffect(() => {
    const ctx1 = document.getElementById("lineChart") as HTMLCanvasElement;
    const ctx2 = document.getElementById("barChart") as HTMLCanvasElement;

    // @ts-ignore
    const line = new Chart(ctx1, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Users Growth",
            data: [120, 240, 360, 510, 700],
            borderColor: "#4F46E5",
            borderWidth: 2,
          },
        ],
      },
      options: { responsive: true }
    });

    // @ts-ignore
    const bar = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: ["Jobs", "Users", "Companies"],
        datasets: [
          {
            label: "Statistics",
            data: [189, 4123, 74],
            backgroundColor: "#6366F1",
          },
        ],
      },
      options: { responsive: true }
    });

    return () => {
      line.destroy();
      bar.destroy();
    };
  }, []);

  return (
    <div className="charts-grid">
      <div className="card">
        <h3 className="card-title">Users Growth</h3>
        <canvas id="lineChart" height="120"></canvas>
      </div>

      <div className="card">
        <h3 className="card-title">General Stats</h3>
        <canvas id="barChart" height="120"></canvas>
      </div>
    </div>
  );
}
