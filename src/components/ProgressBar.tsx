
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps,
  className
}) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className={cn('w-full h-1 bg-white/10 rounded-full overflow-hidden', className)}>
      <div 
        className="h-full bg-glow-gradient transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
