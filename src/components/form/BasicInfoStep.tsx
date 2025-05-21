
import React from 'react';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import { ageOptions } from '@/utils/formOptions';
import { countryOptions } from '@/utils/countryData';
import { FormData } from '@/types/formTypes';

interface BasicInfoStepProps {
  formData: FormData;
  formErrors: Partial<Record<keyof FormData, string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  formData,
  formErrors,
  handleChange
}) => {
  return (
    <>
      <h3 className="text-xl font-space font-medium text-white/90 mb-4">Basic Information</h3>
      
      <FormInput
        label="Full Name"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Your full name"
        required
        error={formErrors.fullName}
        hint="Example: John Doe (letters only, minimum 2 characters per name part)"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          options={ageOptions}
          required
          error={formErrors.age}
        />
        
        <FormSelect
          label="Where are you from?"
          name="country"
          value={formData.country}
          onChange={handleChange}
          options={countryOptions}
          required
          error={formErrors.country}
        />
      </div>
      
      <FormInput
        label="WhatsApp Number (for exclusive updates and tips)"
        type="tel"
        name="whatsapp"
        value={formData.whatsapp}
        onChange={handleChange}
        placeholder="Include country code (e.g., +1 123 456 7890)"
        required
        error={formErrors.whatsapp}
      />
      
      <FormInput
        label="Instagram ID (optional)"
        type="text"
        name="instagram"
        value={formData.instagram}
        onChange={handleChange}
        placeholder="Your Instagram username (without @)"
      />
    </>
  );
};

export default BasicInfoStep;
