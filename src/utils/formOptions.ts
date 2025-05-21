
// Form select options

// Age options - from 13 to 80+
export const ageOptions = Array.from({ length: 68 }, (_, i) => {
  const age = i + 13;
  return { value: age.toString(), label: age.toString() };
}).concat([{ value: '80+', label: '80+' }]);

// Occupation options
export const occupationOptions = [
  { value: 'student', label: 'Student' },
  { value: 'employee', label: 'Employee' },
  { value: 'business', label: 'Self-employed / Business Owner' },
  { value: 'unemployed', label: 'Currently not working' },
  { value: 'other', label: 'Other' },
];

// Income options
export const incomeOptions = [
  { value: 'less-500', label: 'Less than $500/month USD' },
  { value: '500-1k', label: '$500 – $1,000/month USD' },
  { value: '1k-4k', label: '$1,000 – $4,000/month USD' },
  { value: '4k-7k', label: '$4,000 – $7,000/month USD' },
  { value: '7k-10k', label: '$7,000 – $10,000/month USD' },
  { value: '10k+', label: '$10,000+ USD' },
  { value: 'other', label: 'Other' },
];

// Trading experience options
export const tradingExperienceOptions = [
  { value: 'never', label: 'Never tried' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'profitable', label: 'I\'ve made significant profits' },
];

// Expected earnings options
export const earningsOptions = [
  { value: '50k', label: '$50,000' },
  { value: '100k', label: '$100,000' },
  { value: '250k', label: '$250,000' },
  { value: '500k', label: '$500,000' },
  { value: '1m+', label: '$1,000,000+' },
];
