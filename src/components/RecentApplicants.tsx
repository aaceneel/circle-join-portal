
import React from 'react';
import { cn } from '@/lib/utils';
import useRecentApplicants from '@/hooks/useRecentApplicants';

interface RecentApplicantsProps {
  className?: string;
}

const RecentApplicants: React.FC<RecentApplicantsProps> = ({ className }) => {
  const { applicants, loading } = useRecentApplicants();
  
  // Default data to show while loading or if there's no data yet
  const defaultApplicants = [
    { full_name: 'Sarah J.', location: 'New York, USA', created_at: new Date().toISOString() },
    { full_name: 'Michael T.', location: 'London, UK', created_at: new Date().toISOString() },
    { full_name: 'David K.', location: 'Toronto, Canada', created_at: new Date().toISOString() },
    { full_name: 'Anna P.', location: 'Sydney, Australia', created_at: new Date().toISOString() },
    { full_name: 'Thomas R.', location: 'Berlin, Germany', created_at: new Date().toISOString() },
  ];

  const displayApplicants = loading || applicants.length === 0 ? defaultApplicants : applicants;
  
  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <div className="animate-marquee whitespace-nowrap flex space-x-6">
        {displayApplicants.map((applicant, index) => (
          <div 
            key={index}
            className="inline-flex items-center bg-dark-lighter px-3 py-1.5 rounded-full"
          >
            <div className="h-2.5 w-2.5 bg-glow-green rounded-full mr-2 animate-pulse"></div>
            <span className="text-white/70 text-sm">
              {applicant.full_name}, {applicant.location}
            </span>
          </div>
        ))}
        
        {/* Duplicate items to ensure continuous scroll */}
        {displayApplicants.map((applicant, index) => (
          <div 
            key={`dup-${index}`}
            className="inline-flex items-center bg-dark-lighter px-3 py-1.5 rounded-full"
          >
            <div className="h-2.5 w-2.5 bg-glow-green rounded-full mr-2 animate-pulse"></div>
            <span className="text-white/70 text-sm">
              {applicant.full_name}, {applicant.location}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentApplicants;
