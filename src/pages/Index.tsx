
import React, { useState } from 'react';
import Background from '@/components/Background';
import FormHeader from '@/components/FormHeader';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import FormSelect from '@/components/FormSelect';
import FormToggle from '@/components/FormToggle';
import FormStep from '@/components/FormStep';
import ProgressBar from '@/components/ProgressBar';
import SubmitButton from '@/components/SubmitButton';
import RecentApplicants from '@/components/RecentApplicants';
import SuccessPage from '@/components/SuccessPage';
import { toast } from '@/components/ui/sonner';

// Form data interface
interface FormData {
  fullName: string;
  age: string;
  location: string;
  whatsapp: string;
  occupation: string;
  description: string;
  income: string;
  goal: string;
  expectedEarnings: string;
  mainChallenge: string;
  openToCall: boolean;
}

// Initial form data
const initialFormData: FormData = {
  fullName: '',
  age: '',
  location: '',
  whatsapp: '',
  occupation: '',
  description: '',
  income: '',
  goal: '',
  expectedEarnings: '',
  mainChallenge: '',
  openToCall: true,
};

// Options for select inputs
const ageOptions = Array.from({ length: 58 }, (_, i) => {
  const age = i + 13;
  return { value: age.toString(), label: age.toString() };
});

const occupationOptions = [
  { value: 'student', label: 'Student' },
  { value: 'job', label: 'Employed' },
  { value: 'business', label: 'Business Owner' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'other', label: 'Other' },
];

const incomeOptions = [
  { value: 'less-1k', label: 'Less than $1,000' },
  { value: '1k-3k', label: '$1,000 - $3,000' },
  { value: '3k-10k', label: '$3,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: 'more-25k', label: '$25,000+' },
];

const challengeOptions = [
  { value: 'capital', label: 'Lack of capital' },
  { value: 'skills', label: 'Need to improve skills' },
  { value: 'strategy', label: 'No clear strategy' },
  { value: 'time', label: 'Not enough time' },
  { value: 'mentorship', label: 'Need mentorship' },
];

const earningsOptions = [
  { value: '50k', label: '$50,000' },
  { value: '100k', label: '$100,000' },
  { value: '250k', label: '$250,000' },
  { value: '500k', label: '$500,000' },
  { value: '1m+', label: '$1,000,000+' },
];

// Main application component
const Index = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const totalSteps = 4;
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle toggle changes
  const handleToggleChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, openToCall: checked }));
  };
  
  // Handle next step
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
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
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Show success
      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
      
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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
                <h3 className="text-xl font-space font-medium text-white/90 mb-4">Basic Information</h3>
                
                <FormInput
                  label="Full Name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelect
                    label="Age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    options={ageOptions}
                    required
                  />
                  
                  <FormInput
                    label="Where are you based?"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    required
                  />
                </div>
                
                <FormInput
                  label="WhatsApp Number"
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Include country code (e.g., +1234567890)"
                  required
                />
              </FormStep>
              
              {/* Step 2: Occupation Information */}
              <FormStep
                isActive={currentStep === 2}
                isCompleted={currentStep > 2}
              >
                <h3 className="text-xl font-space font-medium text-white/90 mb-4">Your Occupation</h3>
                
                <FormSelect
                  label="What's your current occupation?"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  options={occupationOptions}
                  required
                />
                
                <FormTextArea
                  label="Tell us briefly what you do for a living"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your current role and responsibilities (100-200 words)"
                  required
                />
                
                <FormSelect
                  label="What is your current monthly income (USD)?"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  options={incomeOptions}
                  required
                />
              </FormStep>
              
              {/* Step 3: Trading Goals */}
              <FormStep
                isActive={currentStep === 3}
                isCompleted={currentStep > 3}
              >
                <h3 className="text-xl font-space font-medium text-white/90 mb-4">Your Trading Goals</h3>
                
                <FormTextArea
                  label="What is your goal with your trading journey?"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  placeholder="Share your short and long-term trading objectives"
                  required
                />
                
                <FormSelect
                  label="How much would you like to earn per year in the next 12 months?"
                  name="expectedEarnings"
                  value={formData.expectedEarnings}
                  onChange={handleChange}
                  options={earningsOptions}
                  required
                />
              </FormStep>
              
              {/* Step 4: Final Questions */}
              <FormStep
                isActive={currentStep === 4}
                isCompleted={currentStep > 4}
              >
                <h3 className="text-xl font-space font-medium text-white/90 mb-4">One Last Thing</h3>
                
                <FormSelect
                  label="What's the #1 thing holding you back from hitting that goal?"
                  name="mainChallenge"
                  value={formData.mainChallenge}
                  onChange={handleChange}
                  options={challengeOptions}
                  required
                />
                
                <FormToggle
                  label="Would you be open to a free strategy call?"
                  checked={formData.openToCall}
                  onCheckedChange={handleToggleChange}
                  description="Our team may reach out to schedule a call to discuss your trading goals"
                  wrapperClassName="mt-6"
                />
              </FormStep>
              
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
