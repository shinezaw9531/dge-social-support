import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFormStore, type FormData } from '../store/useFormStore';
import { translations } from '../locales/translations';
import { AiHelpModal } from './AiHelpModal'; 

type SituationField = 'financialSituation' | 'employmentCircumstances' | 'reasonForApplying';

export const Step3Situation: React.FC = () => {
  const { formData, updateFormData, setStep, lang, resetForm } = useFormStore();
  const t = translations[lang];
  
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({ 
    defaultValues: formData 
  });
  
  const [aiField, setAiField] = useState<SituationField | null>(null);
  const [aiLabel, setAiLabel] = useState<string>('');
  const currentValues = watch();

  const handleFinalSubmit = (data: FormData) => {
    updateFormData(data);
    alert(lang === 'en' ? 'Application submitted successfully to Abu Dhabi DGE.' : 'تم تقديم الطلب بنجاح إلى دائرة التمكين الحكومي.');
    resetForm();
  };

  const fields: SituationField[] = ['financialSituation', 'employmentCircumstances', 'reasonForApplying'];

  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">{t.step3}</h2>
      
      {fields.map((field) => (
        <div key={field} className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field === 'financialSituation' ? t.financialSituation : field === 'employmentCircumstances' ? t.employmentCircumstances : t.reasonForApplying} *
          </label>
          
          <textarea 
            {...register(field, { required: true })} 
            rows={3} 
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500" 
          />
          
          <button 
            type="button" 
            onClick={() => { 
              setAiField(field); 
              setAiLabel(field === 'financialSituation' ? t.financialSituation : field === 'employmentCircumstances' ? t.employmentCircumstances : t.reasonForApplying); 
            }} 
            className="mt-1 inline-flex items-center text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1.5 rounded border border-indigo-200 hover:bg-indigo-100"
          >
            ✨ {t.helpWrite}
          </button>
        </div>
      ))}

      <div className="flex justify-between pt-4">
        <button type="button" onClick={() => setStep(2)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition">{t.back}</button>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition font-bold">{t.submit}</button>
      </div>

      {aiField && (
        <AiHelpModal 
          fieldLabel={aiLabel} 
          currentValue={currentValues[aiField] || ''} 
          onAccept={(text: string) => { 
            setValue(aiField, text); 
            setAiField(null); 
          }} 
          onClose={() => setAiField(null)} 
        />
      )}
    </form>
  );
};