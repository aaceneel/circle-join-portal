
import { useCallback } from 'react';
import { FormData } from '@/types/formTypes';
import { validateName, validatePhone } from '@/utils/formValidation';

export const useFormValidation = () => {
  // Validate current step
  const validateStep = useCallback((
    step: number,
    formData: FormData
  ): Partial<Record<keyof FormData, string>> => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    
    if (step === 1) {
      if (!formData.fullName) {
        errors.fullName = 'Full name is required';
      } else if (!validateName(formData.fullName)) {
        errors.fullName = 'Name must contain only letters, with at least 2 characters per name part';
      }
      
      if (!formData.age) errors.age = 'Age is required';
      if (!formData.country) errors.country = 'Country is required';
      
      if (!formData.whatsapp) {
        errors.whatsapp = 'WhatsApp number is required';
      } else if (!validatePhone(formData.whatsapp)) {
        errors.whatsapp = 'Please enter a valid WhatsApp number with country code (e.g., +1 123 456 7890)';
      }
      
      // Instagram is optional, no validation needed
    } else if (step === 2) {
      if (!formData.occupation) errors.occupation = 'Occupation is required';
      if (!formData.income) errors.income = 'Income is required';
      
      // Description is optional but suggested to have more than 1 word
      if (formData.description && formData.description.trim().split(/\s+/).length < 2) {
        errors.description = 'Please provide more details (at least 2 words)';
      }
    } else if (step === 3) {
      if (!formData.tradingExperience) errors.tradingExperience = 'Trading experience is required';
      if (!formData.expectedEarnings) errors.expectedEarnings = 'Expected earnings is required';
    } else if (step === 4) {
      if (!formData.mainChallenge) errors.mainChallenge = 'Please share your main challenge';
    }
    
    return errors;
  }, []);

  return { validateStep };
};

export default useFormValidation;
