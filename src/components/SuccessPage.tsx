
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
      
      <div className="glass-card p-4 max-w-md mx-auto">
        <p className="text-white/80">Follow us on Instagram:</p>
        <a 
          href="https://instagram.com/tradingcircle.hq" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-glow-blue font-medium hover:underline flex items-center justify-center space-x-2 mt-2"
        >
          <span>@tradingcircle.hq</span>
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
        </a>
        <p className="text-white/50 text-sm mt-3">
          Send us a DM with "APPLIED" to get a faster response!
        </p>
      </div>
      
      <div className="text-sm text-white/50">
        Over 9,800+ ambitious traders have already applied
      </div>
    </div>
  );
};

export default SuccessPage;
