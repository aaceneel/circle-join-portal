
import React from 'react';
import { cn } from '@/lib/utils';

interface RecentApplicantsProps {
  className?: string;
}

const RecentApplicants: React.FC<RecentApplicantsProps> = ({ className }) => {
  // Fake applicants data for the ticker
  const fakeApplicants = [
    { full_name: 'Sarah J.', location: 'New York, USA', created_at: new Date().toISOString() },
    { full_name: 'Michael T.', location: 'London, UK', created_at: new Date().toISOString() },
    { full_name: 'David K.', location: 'Toronto, Canada', created_at: new Date().toISOString() },
    { full_name: 'Anna P.', location: 'Sydney, Australia', created_at: new Date().toISOString() },
    { full_name: 'Thomas R.', location: 'Berlin, Germany', created_at: new Date().toISOString() },
    { full_name: 'Emma L.', location: 'Paris, France', created_at: new Date().toISOString() },
    { full_name: 'James W.', location: 'Tokyo, Japan', created_at: new Date().toISOString() },
    { full_name: 'Olivia S.', location: 'Cape Town, South Africa', created_at: new Date().toISOString() },
    { full_name: 'Noah R.', location: 'Dubai, UAE', created_at: new Date().toISOString() },
    { full_name: 'Sofia M.', location: 'Mumbai, India', created_at: new Date().toISOString() },
    { full_name: 'Lucas B.', location: 'São Paulo, Brazil', created_at: new Date().toISOString() },
    { full_name: 'Isabella C.', location: 'Barcelona, Spain', created_at: new Date().toISOString() },
    { full_name: 'Chen W.', location: 'Singapore', created_at: new Date().toISOString() },
    { full_name: 'Marie D.', location: 'Montreal, Canada', created_at: new Date().toISOString() },
    { full_name: 'Ahmed H.', location: 'Cairo, Egypt', created_at: new Date().toISOString() },
  ];
  
  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <div className="animate-marquee whitespace-nowrap flex space-x-6">
        {fakeApplicants.map((applicant, index) => (
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
        {fakeApplicants.map((applicant, index) => (
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
