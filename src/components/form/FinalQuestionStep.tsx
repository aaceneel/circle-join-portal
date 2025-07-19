
import React from 'react';
import FormSelect from '@/components/FormSelect';
import { FormData } from '@/types/formTypes';

interface FinalQuestionStepProps {
  formData: FormData;
  formErrors: Partial<Record<keyof FormData, string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FinalQuestionStep: React.FC<FinalQuestionStepProps> = ({
  formData,
  formErrors,
  handleChange
}) => {
  const followerOptions = [
    { value: '0-1k', label: '0 - 1k followers' },
    { value: '1k-5k', label: '1k - 5k followers' },
    { value: '5k-10k', label: '5k - 10k followers' },
    { value: '10k+', label: '10k+ followers' }
  ];

  return (
    <>
      <h3 className="text-xl font-space font-medium text-white/90 mb-4">One Last Thing</h3>
      
      <FormSelect
        label="How many followers do you have?"
        name="followerCount"
        value={formData.followerCount}
        onChange={handleChange}
        options={followerOptions}
        required
        error={formErrors.followerCount}
      />
    </>
  );
};

export default FinalQuestionStep;
