import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormData, initialFormData } from '@/types/formTypes';
import { countries } from '@/utils/countryData';
import useFormValidation from '@/hooks/useFormValidation';

// Components
import Background from '@/components/Background';
import FormHeader from '@/components/FormHeader';
import FormStep from '@/components/FormStep';
import ProgressBar from '@/components/ProgressBar';
import RecentApplicants from '@/components/RecentApplicants';
import SuccessPage from '@/components/SuccessPage';
import FormNavigation from '@/components/form/FormNavigation';

// Form Steps Components
import BasicInfoStep from '@/components/form/BasicInfoStep';
import OccupationStep from '@/components/form/OccupationStep';
import TradingExperienceStep from '@/components/form/TradingExperienceStep';
import FinalQuestionStep from '@/components/form/FinalQuestionStep';

// Main application component
const Index = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [customIncome, setCustomIncome] = useState('');
  
  const totalSteps = 4;
  const { validateStep } = useFormValidation();
  
  // Set country dial code when country changes
  useEffect(() => {
    if (formData.country && !formData.whatsapp) {
      const selectedCountry = countries.find(c => c.code === formData.country);
      if (selectedCountry) {
        setFormData(prev => ({ ...prev, whatsapp: selectedCountry.dialCode + ' ' }));
      }
    }
  }, [formData.country]);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for country selection to update WhatsApp number
    if (name === 'country' && value) {
      const selectedCountry = countries.find(c => c.code === value);
      if (selectedCountry) {
        // If WhatsApp is empty or only contains a dial code, replace it
        // Otherwise, replace the dial code part while keeping the rest of the number
        setFormData(prev => {
          const dialCodeRegex = /^\+\d+\s*/;
          const hasDialCode = dialCodeRegex.test(prev.whatsapp);
          const cleanNumber = hasDialCode ? prev.whatsapp.replace(dialCodeRegex, '') : prev.whatsapp;
          
          return { 
            ...prev, 
            [name]: value,
            whatsapp: selectedCountry.dialCode + (cleanNumber ? ' ' + cleanNumber : ' ')
          };
        });
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is filled
    if (value && formErrors[name as keyof FormData]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormData];
        return newErrors;
      });
    }
  };
  
  // Handle toggle changes
  const handleToggleChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, openToCall: checked }));
  };
  
  // Validate current step and update errors
  const validateCurrentStep = () => {
    const errors = validateStep(currentStep, formData);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle next step
  const goToNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };
  
  // Handle previous step
  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Prepare the final income value
      const finalIncome = formData.income === 'other' ? customIncome : formData.income;
      
      // Insert data into Supabase
      const { error } = await supabase
        .from('applications')
        .insert({
          full_name: formData.fullName,
          age: formData.age,
          location: formData.country,
          whatsapp: formData.whatsapp,
          instagram: formData.instagram,
          occupation: formData.occupation,
          description: formData.description || null,
          income: finalIncome,
          trading_experience: formData.tradingExperience,
          expected_earnings: formData.expectedEarnings,
          main_challenge: formData.mainChallenge,
          open_to_call: formData.openToCall,
          goal: '' // Adding an empty goal field to match the schema
        });
        
      if (error) {
        throw error;
      }
      
      // Show success
      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-8 px-4">
      <Background />
      
      <div className="w-full max-w-2xl mx-auto">
        {!isSubmitted ? (
          <div className="glass-card card-floating p-6 md:p-8">
            <FormHeader className="mb-8" />
            
            <ProgressBar 
              currentStep={currentStep} 
              totalSteps={totalSteps} 
              className="mb-8" 
            />
            
            <div className="space-y-6">
              {/* Step 1: Basic Information */}
              <FormStep
                isActive={currentStep === 1}
                isCompleted={currentStep > 1}
              >
                <BasicInfoStep 
                  formData={formData} 
                  formErrors={formErrors} 
                  handleChange={handleChange} 
                />
              </FormStep>
              
              {/* Step 2: Occupation Information */}
              <FormStep
                isActive={currentStep === 2}
                isCompleted={currentStep > 2}
              >
                <OccupationStep 
                  formData={formData} 
                  formErrors={formErrors} 
                  handleChange={handleChange}
                  customIncome={customIncome}
                  setCustomIncome={setCustomIncome}
                />
              </FormStep>
              
              {/* Step 3: Trading Experience */}
              <FormStep
                isActive={currentStep === 3}
                isCompleted={currentStep > 3}
              >
                <TradingExperienceStep 
                  formData={formData} 
                  formErrors={formErrors} 
                  handleChange={handleChange}
                />
              </FormStep>
              
              {/* Step 4: Final Questions */}
              <FormStep
                isActive={currentStep === 4}
                isCompleted={currentStep > 4}
              >
                <FinalQuestionStep 
                  formData={formData} 
                  formErrors={formErrors} 
                  handleChange={handleChange}
                  handleToggleChange={handleToggleChange}
                />
              </FormStep>
              
              <FormNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                isSubmitting={isSubmitting}
                goToPrevStep={goToPrevStep}
                goToNextStep={goToNextStep}
              />
            </div>
            
            <div className="mt-8 text-center text-white/50 text-sm">
              Over 9,800+ ambitious traders have already applied
            </div>
            
            <RecentApplicants className="mt-6" />
          </div>
        ) : (
          <div className="glass-card card-floating p-6 md:p-8">
            <SuccessPage />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
