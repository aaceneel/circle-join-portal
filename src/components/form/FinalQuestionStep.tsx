
import React from 'react';
import FormTextArea from '@/components/FormTextArea';
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
      
      <FormTextArea
        label="What are the biggest obstacles that keep you from achieving your goal?"
        name="mainChallenge"
        value={formData.mainChallenge}
        onChange={handleChange}
        placeholder="Share your main challenges"
        hint="e.g., Lack of capital, time, knowledge, or strategy"
        required
        error={formErrors.mainChallenge}
      />
      
      <FormToggle
        label="Would you be open to a free strategy call?"
        checked={formData.openToCall}
        onCheckedChange={handleToggleChange}
        description="Our team may reach out to schedule a call to discuss your trading goals"
        wrapperClassName="mt-6"
      />
    </>
  );
};

export default FinalQuestionStep;
