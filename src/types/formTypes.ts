
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
  contentTopic: string;
  proudLink: string;
  followerCount: string;
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
  contentTopic: '',
  proudLink: '',
  followerCount: '',
  openToCall: true,
};
