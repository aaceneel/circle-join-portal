
import React from 'react';
import { cn } from '@/lib/utils';

interface FormStepProps {
  children: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
}

const FormStep: React.FC<FormStepProps> = ({ children, isActive, isCompleted }) => {
  return (
    <div
      className={cn(
        'transition-all duration-500 ease-in-out transform',
        isActive ? 'opacity-100 translate-y-0 h-auto' : 'opacity-0 translate-y-8 h-0 overflow-hidden',
        isCompleted ? 'opacity-0 -translate-y-8 h-0 overflow-hidden' : ''
      )}
    >
      {isActive && (
        <div className="animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

export default FormStep;
