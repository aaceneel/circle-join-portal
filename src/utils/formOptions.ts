
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

// Follower count options
export const followerCountOptions = [
  { value: 'less-1k', label: 'Less than 1,000' },
  { value: '1k-5k', label: '1,000 - 5,000' },
  { value: '5k-10k', label: '5,000 - 10,000' },
  { value: '10k-50k', label: '10,000 - 50,000' },
  { value: '50k-100k', label: '50,000 - 100,000' },
  { value: '100k-500k', label: '100,000 - 500,000' },
  { value: '500k-1m', label: '500,000 - 1M' },
  { value: '1m+', label: '1M+' },
];

// Trading experience options
export const tradingExperienceOptions = [
  { value: 'never', label: 'Never traded before - Complete beginner' },
  { value: 'tried', label: 'I\'ve tried but haven\'t been successful' },
  { value: 'some-success', label: 'I\'ve had some success but not consistent' },
  { value: 'experienced', label: 'I\'m experienced but want to improve' },
  { value: 'advanced', label: 'I\'m advanced and looking for new strategies' },
];

// Expected earnings options
export const earningsOptions = [
  { value: '1k-5k', label: '$1,000 - $5,000 per year' },
  { value: '5k-15k', label: '$5,000 - $15,000 per year' },
  { value: '15k-50k', label: '$15,000 - $50,000 per year' },
  { value: '50k-100k', label: '$50,000 - $100,000 per year' },
  { value: '100k-250k', label: '$100,000 - $250,000 per year' },
  { value: '250k+', label: '$250,000+ per year' },
];
