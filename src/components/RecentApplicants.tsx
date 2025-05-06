
import React from 'react';
import { cn } from '@/lib/utils';

// Fake data for recent applicants
const recentApplicants = [
  { id: 1, name: 'Alex S.', location: 'New York', time: '2 mins ago' },
  { id: 2, name: 'Maria L.', location: 'London', time: '5 mins ago' },
  { id: 3, name: 'John D.', location: 'Toronto', time: '8 mins ago' },
  { id: 4, name: 'Sara K.', location: 'Berlin', time: '12 mins ago' },
  { id: 5, name: 'Thomas R.', location: 'Sydney', time: '15 mins ago' },
];

interface RecentApplicantsProps {
  className?: string;
}

const RecentApplicants: React.FC<RecentApplicantsProps> = ({ className }) => {
  return (
    <div className={cn('overflow-hidden glass-card px-4 py-3', className)}>
      <h3 className="text-sm text-white/50 mb-2">Recent Applicants:</h3>
      <div className="flex space-x-4 animate-[scroll_20s_linear_infinite]">
        {recentApplicants.map((applicant) => (
          <div key={applicant.id} className="flex-shrink-0 px-3 py-2">
            <div className="font-medium text-white/90">{applicant.name}</div>
            <div className="text-xs text-white/50">{applicant.location} • {applicant.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentApplicants;
