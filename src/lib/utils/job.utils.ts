export function mapJobType(type: string | null): string {
  if (!type) return 'Full-time';

  const mapping: Record<string, string> = {
    'Full-time': 'تمام وقت',
    'Part-time': 'پاره وقت',
    'Contract': 'قراردادی',
    'Freelance': 'فریلنس'
  };

  return mapping[type] ?? type;
}
