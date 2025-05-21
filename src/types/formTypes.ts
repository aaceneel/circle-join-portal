
// Form data interface
export interface FormData {
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
export const initialFormData: FormData = {
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
