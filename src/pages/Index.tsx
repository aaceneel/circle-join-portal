
import React, { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
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

// Form data interface
interface FormData {
  fullName: string;
  age: string;
  country: string;
  whatsapp: string;
  instagram: string;
  occupation: string;
  description: string;
  income: string;
  tradingExperience: string;
  expectedEarnings: string;
  mainChallenge: string;
  openToCall: boolean;
}

// Initial form data
const initialFormData: FormData = {
  fullName: '',
  age: '',
  country: '',
  whatsapp: '',
  instagram: '',
  occupation: '',
  description: '',
  income: '',
  tradingExperience: '',
  expectedEarnings: '',
  mainChallenge: '',
  openToCall: true,
};

// Options for select inputs
const ageOptions = Array.from({ length: 68 }, (_, i) => {
  const age = i + 13;
  return { value: age.toString(), label: age.toString() };
}).concat([{ value: '80+', label: '80+' }]);

const countryOptions = [
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'IN', label: 'India' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'BR', label: 'Brazil' },
  { value: 'MX', label: 'Mexico' },
  { value: 'JP', label: 'Japan' },
  { value: 'CN', label: 'China' },
  { value: 'RU', label: 'Russia' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'SG', label: 'Singapore' },
  { value: 'MY', label: 'Malaysia' },
  // Add more countries as needed
];

const occupationOptions = [
  { value: 'student', label: 'Student' },
  { value: 'employee', label: 'Employee' },
  { value: 'business', label: 'Self-employed / Business Owner' },
  { value: 'unemployed', label: 'Currently not working' },
  { value: 'other', label: 'Other' },
];

const incomeOptions = [
  { value: 'less-500', label: 'Less than $500/month USD' },
  { value: '500-1k', label: '$500 – $1,000/month USD' },
  { value: '1k-4k', label: '$1,000 – $4,000/month USD' },
  { value: '4k-7k', label: '$4,000 – $7,000/month USD' },
  { value: '7k-10k', label: '$7,000 – $10,000/month USD' },
  { value: '10k+', label: '$10,000+ USD' },
  { value: 'other', label: 'Other' },
];

const tradingExperienceOptions = [
  { value: 'never', label: 'Never tried' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'profitable', label: 'I\'ve made significant profits' },
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
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [customIncome, setCustomIncome] = useState('');
  
  const totalSteps = 4;
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is filled
    if (value && formErrors[name as keyof FormData]) {
      setFormErrors((prev) => {
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
  
  // Validate name format (only letters and at least 2 chars per name part)
  const validateName = (name: string): boolean => {
    const nameParts = name.trim().split(/\s+/);
    const validFormat = /^[A-Za-z]+$/;
    
    if (nameParts.length < 2) return false;
    
    return nameParts.every(part => {
      return validFormat.test(part) && part.length >= 2;
    });
  };
  
  // Validate phone number format
  const validatePhone = (phone: string): boolean => {
    // Check for country code (must start with +)
    const phoneRegex = /^\+[0-9]{1,4}[0-9\s]{5,14}$/;
    return phoneRegex.test(phone);
  };
  
  // Validate current step
  const validateCurrentStep = () => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    
    if (currentStep === 1) {
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
    } else if (currentStep === 2) {
      if (!formData.occupation) errors.occupation = 'Occupation is required';
      if (!formData.income) errors.income = 'Income is required';
      
      // Description is optional but suggested to have more than 1 word
      if (formData.description && formData.description.trim().split(/\s+/).length < 2) {
        errors.description = 'Please provide more details (at least 2 words)';
      }
    } else if (currentStep === 3) {
      if (!formData.tradingExperience) errors.tradingExperience = 'Trading experience is required';
      if (!formData.expectedEarnings) errors.expectedEarnings = 'Expected earnings is required';
    } else if (currentStep === 4) {
      if (!formData.mainChallenge) errors.mainChallenge = 'Please share your main challenge';
    }
    
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
              </FormStep>
              
              {/* Step 2: Occupation Information */}
              <FormStep
                isActive={currentStep === 2}
                isCompleted={currentStep > 2}
              >
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
              </FormStep>
              
              {/* Step 3: Trading Experience */}
              <FormStep
                isActive={currentStep === 3}
                isCompleted={currentStep > 3}
              >
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
              </FormStep>
              
              {/* Step 4: Final Questions */}
              <FormStep
                isActive={currentStep === 4}
                isCompleted={currentStep > 4}
              >
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
