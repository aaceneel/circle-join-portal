import React, { useState, useEffect } from 'react';
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

// Country data with dial codes
interface CountryData {
  code: string;
  name: string;
  dialCode: string;
}

// Complete country list with dial codes
const countries: CountryData[] = [
  { code: 'AF', name: 'Afghanistan', dialCode: '+93' },
  { code: 'AL', name: 'Albania', dialCode: '+355' },
  { code: 'DZ', name: 'Algeria', dialCode: '+213' },
  { code: 'AS', name: 'American Samoa', dialCode: '+1684' },
  { code: 'AD', name: 'Andorra', dialCode: '+376' },
  { code: 'AO', name: 'Angola', dialCode: '+244' },
  { code: 'AI', name: 'Anguilla', dialCode: '+1264' },
  { code: 'AG', name: 'Antigua and Barbuda', dialCode: '+1268' },
  { code: 'AR', name: 'Argentina', dialCode: '+54' },
  { code: 'AM', name: 'Armenia', dialCode: '+374' },
  { code: 'AW', name: 'Aruba', dialCode: '+297' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'AT', name: 'Austria', dialCode: '+43' },
  { code: 'AZ', name: 'Azerbaijan', dialCode: '+994' },
  { code: 'BS', name: 'Bahamas', dialCode: '+1242' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880' },
  { code: 'BB', name: 'Barbados', dialCode: '+1246' },
  { code: 'BY', name: 'Belarus', dialCode: '+375' },
  { code: 'BE', name: 'Belgium', dialCode: '+32' },
  { code: 'BZ', name: 'Belize', dialCode: '+501' },
  { code: 'BJ', name: 'Benin', dialCode: '+229' },
  { code: 'BM', name: 'Bermuda', dialCode: '+1441' },
  { code: 'BT', name: 'Bhutan', dialCode: '+975' },
  { code: 'BO', name: 'Bolivia', dialCode: '+591' },
  { code: 'BA', name: 'Bosnia and Herzegovina', dialCode: '+387' },
  { code: 'BW', name: 'Botswana', dialCode: '+267' },
  { code: 'BR', name: 'Brazil', dialCode: '+55' },
  { code: 'BN', name: 'Brunei Darussalam', dialCode: '+673' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359' },
  { code: 'BF', name: 'Burkina Faso', dialCode: '+226' },
  { code: 'BI', name: 'Burundi', dialCode: '+257' },
  { code: 'KH', name: 'Cambodia', dialCode: '+855' },
  { code: 'CM', name: 'Cameroon', dialCode: '+237' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'CV', name: 'Cape Verde', dialCode: '+238' },
  { code: 'KY', name: 'Cayman Islands', dialCode: '+1345' },
  { code: 'CF', name: 'Central African Republic', dialCode: '+236' },
  { code: 'TD', name: 'Chad', dialCode: '+235' },
  { code: 'CL', name: 'Chile', dialCode: '+56' },
  { code: 'CN', name: 'China', dialCode: '+86' },
  { code: 'CO', name: 'Colombia', dialCode: '+57' },
  { code: 'KM', name: 'Comoros', dialCode: '+269' },
  { code: 'CG', name: 'Congo', dialCode: '+242' },
  { code: 'CD', name: 'Congo, Democratic Republic', dialCode: '+243' },
  { code: 'CK', name: 'Cook Islands', dialCode: '+682' },
  { code: 'CR', name: 'Costa Rica', dialCode: '+506' },
  { code: 'CI', name: 'Cote d\'Ivoire', dialCode: '+225' },
  { code: 'HR', name: 'Croatia', dialCode: '+385' },
  { code: 'CU', name: 'Cuba', dialCode: '+53' },
  { code: 'CY', name: 'Cyprus', dialCode: '+357' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420' },
  { code: 'DK', name: 'Denmark', dialCode: '+45' },
  { code: 'DJ', name: 'Djibouti', dialCode: '+253' },
  { code: 'DM', name: 'Dominica', dialCode: '+1767' },
  { code: 'DO', name: 'Dominican Republic', dialCode: '+1849' },
  { code: 'EC', name: 'Ecuador', dialCode: '+593' },
  { code: 'EG', name: 'Egypt', dialCode: '+20' },
  { code: 'SV', name: 'El Salvador', dialCode: '+503' },
  { code: 'GQ', name: 'Equatorial Guinea', dialCode: '+240' },
  { code: 'ER', name: 'Eritrea', dialCode: '+291' },
  { code: 'EE', name: 'Estonia', dialCode: '+372' },
  { code: 'ET', name: 'Ethiopia', dialCode: '+251' },
  { code: 'FJ', name: 'Fiji', dialCode: '+679' },
  { code: 'FI', name: 'Finland', dialCode: '+358' },
  { code: 'FR', name: 'France', dialCode: '+33' },
  { code: 'GA', name: 'Gabon', dialCode: '+241' },
  { code: 'GM', name: 'Gambia', dialCode: '+220' },
  { code: 'GE', name: 'Georgia', dialCode: '+995' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'GH', name: 'Ghana', dialCode: '+233' },
  { code: 'GI', name: 'Gibraltar', dialCode: '+350' },
  { code: 'GR', name: 'Greece', dialCode: '+30' },
  { code: 'GL', name: 'Greenland', dialCode: '+299' },
  { code: 'GD', name: 'Grenada', dialCode: '+1473' },
  { code: 'GU', name: 'Guam', dialCode: '+1671' },
  { code: 'GT', name: 'Guatemala', dialCode: '+502' },
  { code: 'GN', name: 'Guinea', dialCode: '+224' },
  { code: 'GW', name: 'Guinea-Bissau', dialCode: '+245' },
  { code: 'GY', name: 'Guyana', dialCode: '+592' },
  { code: 'HT', name: 'Haiti', dialCode: '+509' },
  { code: 'HN', name: 'Honduras', dialCode: '+504' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852' },
  { code: 'HU', name: 'Hungary', dialCode: '+36' },
  { code: 'IS', name: 'Iceland', dialCode: '+354' },
  { code: 'IN', name: 'India', dialCode: '+91' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62' },
  { code: 'IR', name: 'Iran', dialCode: '+98' },
  { code: 'IQ', name: 'Iraq', dialCode: '+964' },
  { code: 'IE', name: 'Ireland', dialCode: '+353' },
  { code: 'IL', name: 'Israel', dialCode: '+972' },
  { code: 'IT', name: 'Italy', dialCode: '+39' },
  { code: 'JM', name: 'Jamaica', dialCode: '+1876' },
  { code: 'JP', name: 'Japan', dialCode: '+81' },
  { code: 'JO', name: 'Jordan', dialCode: '+962' },
  { code: 'KZ', name: 'Kazakhstan', dialCode: '+7' },
  { code: 'KE', name: 'Kenya', dialCode: '+254' },
  { code: 'KI', name: 'Kiribati', dialCode: '+686' },
  { code: 'KP', name: 'Korea, North', dialCode: '+850' },
  { code: 'KR', name: 'Korea, South', dialCode: '+82' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965' },
  { code: 'KG', name: 'Kyrgyzstan', dialCode: '+996' },
  { code: 'LA', name: 'Laos', dialCode: '+856' },
  { code: 'LV', name: 'Latvia', dialCode: '+371' },
  { code: 'LB', name: 'Lebanon', dialCode: '+961' },
  { code: 'LS', name: 'Lesotho', dialCode: '+266' },
  { code: 'LR', name: 'Liberia', dialCode: '+231' },
  { code: 'LY', name: 'Libya', dialCode: '+218' },
  { code: 'LI', name: 'Liechtenstein', dialCode: '+423' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370' },
  { code: 'LU', name: 'Luxembourg', dialCode: '+352' },
  { code: 'MO', name: 'Macao', dialCode: '+853' },
  { code: 'MK', name: 'Macedonia', dialCode: '+389' },
  { code: 'MG', name: 'Madagascar', dialCode: '+261' },
  { code: 'MW', name: 'Malawi', dialCode: '+265' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60' },
  { code: 'MV', name: 'Maldives', dialCode: '+960' },
  { code: 'ML', name: 'Mali', dialCode: '+223' },
  { code: 'MT', name: 'Malta', dialCode: '+356' },
  { code: 'MH', name: 'Marshall Islands', dialCode: '+692' },
  { code: 'MR', name: 'Mauritania', dialCode: '+222' },
  { code: 'MU', name: 'Mauritius', dialCode: '+230' },
  { code: 'MX', name: 'Mexico', dialCode: '+52' },
  { code: 'FM', name: 'Micronesia', dialCode: '+691' },
  { code: 'MD', name: 'Moldova', dialCode: '+373' },
  { code: 'MC', name: 'Monaco', dialCode: '+377' },
  { code: 'MN', name: 'Mongolia', dialCode: '+976' },
  { code: 'ME', name: 'Montenegro', dialCode: '+382' },
  { code: 'MS', name: 'Montserrat', dialCode: '+1664' },
  { code: 'MA', name: 'Morocco', dialCode: '+212' },
  { code: 'MZ', name: 'Mozambique', dialCode: '+258' },
  { code: 'MM', name: 'Myanmar', dialCode: '+95' },
  { code: 'NA', name: 'Namibia', dialCode: '+264' },
  { code: 'NR', name: 'Nauru', dialCode: '+674' },
  { code: 'NP', name: 'Nepal', dialCode: '+977' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31' },
  { code: 'NC', name: 'New Caledonia', dialCode: '+687' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64' },
  { code: 'NI', name: 'Nicaragua', dialCode: '+505' },
  { code: 'NE', name: 'Niger', dialCode: '+227' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234' },
  { code: 'NO', name: 'Norway', dialCode: '+47' },
  { code: 'OM', name: 'Oman', dialCode: '+968' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92' },
  { code: 'PW', name: 'Palau', dialCode: '+680' },
  { code: 'PS', name: 'Palestine', dialCode: '+970' },
  { code: 'PA', name: 'Panama', dialCode: '+507' },
  { code: 'PG', name: 'Papua New Guinea', dialCode: '+675' },
  { code: 'PY', name: 'Paraguay', dialCode: '+595' },
  { code: 'PE', name: 'Peru', dialCode: '+51' },
  { code: 'PH', name: 'Philippines', dialCode: '+63' },
  { code: 'PL', name: 'Poland', dialCode: '+48' },
  { code: 'PT', name: 'Portugal', dialCode: '+351' },
  { code: 'PR', name: 'Puerto Rico', dialCode: '+1939' },
  { code: 'QA', name: 'Qatar', dialCode: '+974' },
  { code: 'RO', name: 'Romania', dialCode: '+40' },
  { code: 'RU', name: 'Russia', dialCode: '+7' },
  { code: 'RW', name: 'Rwanda', dialCode: '+250' },
  { code: 'KN', name: 'Saint Kitts and Nevis', dialCode: '+1869' },
  { code: 'LC', name: 'Saint Lucia', dialCode: '+1758' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', dialCode: '+1784' },
  { code: 'WS', name: 'Samoa', dialCode: '+685' },
  { code: 'SM', name: 'San Marino', dialCode: '+378' },
  { code: 'ST', name: 'Sao Tome and Principe', dialCode: '+239' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966' },
  { code: 'SN', name: 'Senegal', dialCode: '+221' },
  { code: 'RS', name: 'Serbia', dialCode: '+381' },
  { code: 'SC', name: 'Seychelles', dialCode: '+248' },
  { code: 'SL', name: 'Sierra Leone', dialCode: '+232' },
  { code: 'SG', name: 'Singapore', dialCode: '+65' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386' },
  { code: 'SB', name: 'Solomon Islands', dialCode: '+677' },
  { code: 'SO', name: 'Somalia', dialCode: '+252' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27' },
  { code: 'SS', name: 'South Sudan', dialCode: '+211' },
  { code: 'ES', name: 'Spain', dialCode: '+34' },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94' },
  { code: 'SD', name: 'Sudan', dialCode: '+249' },
  { code: 'SR', name: 'Suriname', dialCode: '+597' },
  { code: 'SZ', name: 'Swaziland', dialCode: '+268' },
  { code: 'SE', name: 'Sweden', dialCode: '+46' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41' },
  { code: 'SY', name: 'Syria', dialCode: '+963' },
  { code: 'TW', name: 'Taiwan', dialCode: '+886' },
  { code: 'TJ', name: 'Tajikistan', dialCode: '+992' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255' },
  { code: 'TH', name: 'Thailand', dialCode: '+66' },
  { code: 'TL', name: 'Timor-Leste', dialCode: '+670' },
  { code: 'TG', name: 'Togo', dialCode: '+228' },
  { code: 'TO', name: 'Tonga', dialCode: '+676' },
  { code: 'TT', name: 'Trinidad and Tobago', dialCode: '+1868' },
  { code: 'TN', name: 'Tunisia', dialCode: '+216' },
  { code: 'TR', name: 'Turkey', dialCode: '+90' },
  { code: 'TM', name: 'Turkmenistan', dialCode: '+993' },
  { code: 'TV', name: 'Tuvalu', dialCode: '+688' },
  { code: 'UG', name: 'Uganda', dialCode: '+256' },
  { code: 'UA', name: 'Ukraine', dialCode: '+380' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'UY', name: 'Uruguay', dialCode: '+598' },
  { code: 'UZ', name: 'Uzbekistan', dialCode: '+998' },
  { code: 'VU', name: 'Vanuatu', dialCode: '+678' },
  { code: 'VA', name: 'Vatican City', dialCode: '+379' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84' },
  { code: 'YE', name: 'Yemen', dialCode: '+967' },
  { code: 'ZM', name: 'Zambia', dialCode: '+260' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263' },
];

// Options for select inputs
const ageOptions = Array.from({ length: 68 }, (_, i) => {
  const age = i + 13;
  return { value: age.toString(), label: age.toString() };
}).concat([{ value: '80+', label: '80+' }]);

// Convert countries array to select options
const countryOptions = countries.map(country => ({
  value: country.code,
  label: country.name
}));

// Rest of the options
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
