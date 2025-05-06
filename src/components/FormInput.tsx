
import React from 'react';
import { cn } from '@/lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  wrapperClassName?: string;
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  error, 
  className,
  wrapperClassName,
  ...props 
}) => {
  return (
    <div className={cn('mb-4', wrapperClassName)}>
      <label className="block text-white/70 mb-2 font-space">{label}</label>
      <input
        className={cn(
          'input-field w-full text-white bg-dark-lighter placeholder:text-white/30',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default FormInput;
