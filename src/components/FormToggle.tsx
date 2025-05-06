
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { cn } from '@/lib/utils';

interface FormToggleProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  description?: string;
  wrapperClassName?: string;
}

const FormToggle: React.FC<FormToggleProps> = ({ 
  label, 
  checked, 
  onCheckedChange,
  description,
  wrapperClassName
}) => {
  return (
    <div className={cn('flex items-start space-x-3 mb-4', wrapperClassName)}>
      <Switch 
        checked={checked} 
        onCheckedChange={onCheckedChange}
        className="mt-1 data-[state=checked]:bg-glow-purple"
      />
      <div>
        <label className="block text-white/70 font-space">{label}</label>
        {description && (
          <p className="text-white/50 text-sm mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default FormToggle;
