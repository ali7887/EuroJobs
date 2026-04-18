type SalaryRangeSliderProps = {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
};

export default function SalaryRangeSlider({
  min,
  max,
  onChange,
}: SalaryRangeSliderProps) {
  return (
    <div>
      <label>Salary Range: {min}K - {max}K</label>
      <input
        type="range"
        min={0}
        max={200}
        value={min}
        onChange={(e) => onChange(Number(e.target.value), max)}
      />
      <input
        type="range"
        min={0}
        max={200}
        value={max}
        onChange={(e) => onChange(min, Number(e.target.value))}
      />
    </div>
  );
}
