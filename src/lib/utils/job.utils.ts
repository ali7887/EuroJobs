export function mapJobType(type: string | null): string {
  if (!type) return "Full-time";

  const mapping: Record<string, string> = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    "contract": "Contract",
    "freelance": "Freelance",
  };

  return mapping[type.toLowerCase()] ?? type;
}
