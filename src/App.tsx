import React, { useEffect } from 'react';
import { useFormStore } from './store/useFormStore';
import { ProgressBar } from './components/ProgressBar';
import { Step1PersonalInfo } from './components/Step1PersonalInfo';
import { Step2FinancialInfo } from './components/Step2FinancialInfo';
import { Step3Situation } from './components/Step3Situation';
import { translations } from './locales/translations';

export const App: React.FC = () => {
  const { step, lang, setLang } = useFormStore();
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">{t.title}</h1>
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold px-4 py-2 rounded-lg transition">
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
        <ProgressBar />
        <main className="mt-4">
          {step === 1 && <Step1PersonalInfo />}
          {step === 2 && <Step2FinancialInfo />}
          {step === 3 && <Step3Situation />}
        </main>
      </div>
    </div>
  );
};

export default App;