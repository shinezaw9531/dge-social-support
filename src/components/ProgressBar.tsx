import React from 'react';
import { useFormStore } from '../store/useFormStore';
import { translations } from '../locales/translations';

export const ProgressBar: React.FC = () => {
  const { step, lang } = useFormStore();
  const t = translations[lang];
  const progressPercent = step === 1 ? '33%' : step === 2 ? '66%' : '100%';

  return (
    <div className="w-full mb-8" aria-hidden="true">
      <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        <span className={step >= 1 ? "text-blue-600 font-bold" : ""}>{t.step1}</span>
        <span className={step >= 2 ? "text-blue-600 font-bold" : ""}>{t.step2}</span>
        <span className={step >= 3 ? "text-blue-600 font-bold" : ""}>{t.step3}</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: progressPercent }} />
      </div>
    </div>
  );
};