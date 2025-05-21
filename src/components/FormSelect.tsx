
import React from 'react';
import { cn } from '@/lib/utils';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  wrapperClassName?: string;
  hint?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ 
  label, 
  options,
  error, 
  className,
  wrapperClassName,
  hint,
  ...props 
}) => {
  return (
    <div className={cn('mb-4', wrapperClassName)}>
      <label className="block text-white/70 mb-2 font-space">{label}</label>
      <select
        className={cn(
          'input-field w-full text-white bg-dark-lighter appearance-none',
          error && 'border-red-500',
          className
        )}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.length > 50 ? (
          <optgroup label="All Options">
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ) : (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </select>
      {hint && <p className="mt-1 text-sm text-white/50 italic">{hint}</p>}
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default FormSelect;
