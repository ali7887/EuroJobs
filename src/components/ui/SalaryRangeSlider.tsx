"use client";

import { useState, useEffect } from "react";
import styles from "./salary-range-slider.module.css";

type Props = {
  min?: number;
  max?: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

export default function SalaryRangeSlider({
  min = 0,
  max = 50,
  step = 1,
  value,
  onChange,
}: Props) {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);

  useEffect(() => {
    onChange([minVal, maxVal]);
  }, [minVal, maxVal]);

  const getPercent = (val: number) =>
    ((val - min) / (max - min)) * 100;

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  return (
    <div className={styles.wrapper}>
      
      <div className={styles.header}>
        <span>Salary Range</span>
        <span className={styles.value}>
          {minVal}k – {maxVal}k / mo
        </span>
      </div>

      <div className={styles.sliderContainer}>

        <div
          className={styles.range}
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), maxVal - 1);
            setMinVal(val);
          }}
          className={styles.thumb}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), minVal + 1);
            setMaxVal(val);
          }}
          className={styles.thumb}
        />

        <div
          className={styles.tooltip}
          style={{ left: `${minPercent}%` }}
        >
          {minVal}k
        </div>

        <div
          className={styles.tooltip}
          style={{ left: `${maxPercent}%` }}
        >
          {maxVal}k
        </div>

      </div>

      <div className={styles.inputs}>
        <input
          type="number"
          value={minVal}
          onChange={(e) =>
            setMinVal(Math.min(Number(e.target.value), maxVal - 1))
          }
        />

        <input
          type="number"
          value={maxVal}
          onChange={(e) =>
            setMaxVal(Math.max(Number(e.target.value), minVal + 1))
          }
        />
      </div>

    </div>
  );
}
