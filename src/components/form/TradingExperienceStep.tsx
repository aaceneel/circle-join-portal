
import React from 'react';
import FormSelect from '@/components/FormSelect';
import { tradingExperienceOptions, earningsOptions } from '@/utils/formOptions';
import { FormData } from '@/types/formTypes';

interface TradingExperienceStepProps {
  formData: FormData;
  formErrors: Partial<Record<keyof FormData, string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const TradingExperienceStep: React.FC<TradingExperienceStepProps> = ({
  formData,
  formErrors,
  handleChange
}) => {
  return (
    <>
      <h3 className="text-xl font-space font-medium text-white/90 mb-4">Your Trading Experience</h3>
      
      <FormSelect
        label="Have you ever tried trading? What's your current level?"
        name="tradingExperience"
        value={formData.tradingExperience}
        onChange={handleChange}
        options={tradingExperienceOptions}
        required
        error={formErrors.tradingExperience}
      />
      
      <FormSelect
        label="How much would you like to earn per year within the next 12 months?"
        name="expectedEarnings"
        value={formData.expectedEarnings}
        onChange={handleChange}
        options={earningsOptions}
        required
        error={formErrors.expectedEarnings}
      />
    </>
  );
};

export default TradingExperienceStep;
