
import React from 'react';
import SubmitButton from '@/components/SubmitButton';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  goToPrevStep: () => void;
  goToNextStep: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  isSubmitting,
  goToPrevStep,
  goToNextStep
}) => {
  return (
    <div className="flex justify-between pt-4">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={goToPrevStep}
          className="text-white/70 hover:text-white underline text-sm"
        >
          Back
        </button>
      )}
      
      <div className="ml-auto">
        <SubmitButton
          onClick={goToNextStep}
          isLoading={isSubmitting}
        >
          {currentStep < totalSteps ? 'Continue' : 'Apply to Join Circle'}
        </SubmitButton>
      </div>
    </div>
  );
};

export default FormNavigation;
