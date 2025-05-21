
import React from 'react';
import FormSelect from '@/components/FormSelect';
import FormTextArea from '@/components/FormTextArea';
import FormInput from '@/components/FormInput';
import { occupationOptions, incomeOptions } from '@/utils/formOptions';
import { FormData } from '@/types/formTypes';

interface OccupationStepProps {
  formData: FormData;
  formErrors: Partial<Record<keyof FormData, string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  customIncome: string;
  setCustomIncome: (value: string) => void;
}

const OccupationStep: React.FC<OccupationStepProps> = ({
  formData,
  formErrors,
  handleChange,
  customIncome,
  setCustomIncome
}) => {
  return (
    <>
      <h3 className="text-xl font-space font-medium text-white/90 mb-4">Your Occupation</h3>
      
      <FormSelect
        label="Current Occupation"
        name="occupation"
        value={formData.occupation}
        onChange={handleChange}
        options={occupationOptions}
        required
        error={formErrors.occupation}
      />
      
      <FormTextArea
        label="What exactly do you do for a living?"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe your current role and responsibilities"
        hint="e.g., 'I run an online dropshipping business' instead of just 'work'"
        error={formErrors.description}
      />
      
      <FormSelect
        label="Current Monthly Income"
        name="income"
        value={formData.income}
        onChange={handleChange}
        options={incomeOptions}
        required
        error={formErrors.income}
      />
      
      {formData.income === 'other' && (
        <FormInput
          label="Please specify your income"
          type="text"
          value={customIncome}
          onChange={(e) => setCustomIncome(e.target.value)}
          placeholder="Your custom income amount"
          required
        />
      )}
    </>
  );
};

export default OccupationStep;
