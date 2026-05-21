import React from 'react';
import { useForm } from 'react-hook-form';
import { useFormStore } from '../store/useFormStore';
import type { FormData } from '../store/useFormStore';
import { translations } from '../locales/translations'

export const Step2FinancialInfo: React.FC = () => {
  const { formData, updateFormData, setStep, lang } = useFormStore();
  const t = translations[lang];
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ 
    defaultValues: formData 
  });

  const onSubmit = (data: FormData) => {
    updateFormData(data);
    setStep(3);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{t.step2}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.maritalStatus} *</label>
          <select {...register('maritalStatus', { required: true })} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm">
            <option value="">--</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </select>
          {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{t.required}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.dependents} *</label>
          <input type="number" min="0" {...register('dependents', { required: true, min: 0 })} className="mt-1 block w-full rounded-md border p-2 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.employmentStatus} *</label>
          <select {...register('employmentStatus', { required: true })} className="mt-1 block w-full rounded-md border border-gray-300 p-2">
            <option value="">--</option>
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="retired">Retired</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.monthlyIncome} *</label>
          <input type="number" min="0" {...register('monthlyIncome', { required: true })} className="mt-1 block w-full rounded-md border p-2 shadow-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">{t.housingStatus} *</label>
          <select {...register('housingStatus', { required: true })} className="mt-1 block w-full rounded-md border p-2">
            <option value="">--</option>
            <option value="own">Own</option>
            <option value="rent">Rented</option>
            <option value="social">Social Housing</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <button type="button" onClick={() => setStep(1)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition">{t.back}</button>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">{t.next}</button>
      </div>
    </form>
  );
};