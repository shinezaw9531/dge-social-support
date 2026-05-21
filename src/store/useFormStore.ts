import { create } from 'zustand';

export interface FormData {
  name: string;
  nationalId: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  maritalStatus: string;
  dependents: number;
  employmentStatus: string;
  monthlyIncome: number;
  housingStatus: string;
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

interface FormState {
  step: number;
  lang: 'en' | 'ar';
  formData: FormData;
  setStep: (step: number) => void;
  setLang: (lang: 'en' | 'ar') => void;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
}

const initialFormData: FormData = {
  name: '', nationalId: '', dob: '', gender: '', address: '', city: '', state: '', country: '', phone: '', email: '',
  maritalStatus: '', dependents: 0, employmentStatus: '', monthlyIncome: 0, housingStatus: '',
  financialSituation: '', employmentCircumstances: '', reasonForApplying: ''
};

export const useFormStore = create<FormState>((set) => ({
  step: JSON.parse(localStorage.getItem('dge_step') || '1'),
  lang: (localStorage.getItem('dge_lang') as 'en' | 'ar') || 'en',
  formData: JSON.parse(localStorage.getItem('dge_data') || JSON.stringify(initialFormData)),
  
  setStep: (step) => {
    localStorage.setItem('dge_step', JSON.stringify(step));
    set({ step });
  },
  setLang: (lang) => {
    localStorage.setItem('dge_lang', lang);
    set({ lang });
  },
  updateFormData: (data) => set((state) => {
    const updatedData = { ...state.formData, ...data };
    localStorage.setItem('dge_data', JSON.stringify(updatedData));
    return { formData: updatedData };
  }),
  resetForm: () => {
    localStorage.removeItem('dge_step');
    localStorage.removeItem('dge_data');
    set({ step: 1, formData: initialFormData });
  }
}));