
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  children, 
  className,
  isLoading = false,
  ...props 
}) => {
  return (
    <button
      className={cn(
        'relative overflow-hidden px-6 py-3 rounded-lg font-bold text-white transition-all',
        'bg-dark-lighter border border-transparent hover:border-glow-purple/30',
        'group hover:shadow-lg hover:shadow-glow-purple/20',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isLoading && 'cursor-wait',
        className
      )}
      disabled={isLoading}
      {...props}
    >
      <div className="absolute inset-0 bg-glow-gradient opacity-0 group-hover:opacity-10 transition-opacity" />
      
      <div className="flex items-center justify-center space-x-2">
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <span>{children}</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </div>
    </button>
  );
};

export default SubmitButton;
