import React from 'react';
import { cn } from '@/lib/utils';

interface SuccessPageProps {
  className?: string;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ className }) => {
  return (
    <div className={cn('text-center space-y-6 animate-fade-in', className)}>
      <div className="w-16 h-16 rounded-full bg-glow-gradient/10 flex items-center justify-center mx-auto">
        <svg 
          className="w-8 h-8 text-glow-purple" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold font-sora text-gradient">Application Received</h2>
      
      <p className="text-white/70 max-w-md mx-auto">
        Your application has been successfully submitted. We'll review it and reach out within 24-48 hours.
      </p>
      
      <div className="text-sm text-white/50">
        Over 9,800+ ambitious traders have already applied
      </div>
    </div>
  );
};

export default SuccessPage;
