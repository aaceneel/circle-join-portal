
import React from 'react';
import FormToggle from '@/components/FormToggle';
import { FormData } from '@/types/formTypes';

interface FinalQuestionStepProps {
  formData: FormData;
  formErrors: Partial<Record<keyof FormData, string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleToggleChange: (checked: boolean) => void;
}

const FinalQuestionStep: React.FC<FinalQuestionStepProps> = ({
  formData,
  formErrors,
  handleChange,
  handleToggleChange
}) => {
  return (
    <>
      <h3 className="text-xl font-space font-medium text-white/90 mb-4">One Last Thing</h3>
      
      <FormToggle
        label="Would you be open to a free strategy call?"
        checked={formData.openToCall}
        onCheckedChange={handleToggleChange}
        description="Our team may reach out to schedule a call to discuss your goals"
        wrapperClassName="mt-6"
      />
    </>
  );
};

export default FinalQuestionStep;
