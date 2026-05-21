import React from 'react';
import { useForm } from 'react-hook-form';
import { useFormStore } from '../store/useFormStore';
import type { FormData } from '../store/useFormStore';
import { translations } from '../locales/translations';

export const Step1PersonalInfo: React.FC = () => {
  const { formData, updateFormData, setStep, lang } = useFormStore();
  const t = translations[lang];
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ 
    defaultValues: formData 
  });

  const onSubmit = (data: FormData) => {
    updateFormData(data);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <h2 className="text-xl font-semibold text-gray-800">{t.step1}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.name} *</label>
          <input type="text" {...register('name', { required: true })} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{t.required}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.nationalId} *</label>
          <input type="text" {...register('nationalId', { required: true })} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          {errors.nationalId && <p className="text-red-500 text-xs mt-1">{t.required}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.dob} *</label>
          <input type="date" {...register('dob', { required: true })} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          {errors.dob && <p className="text-red-500 text-xs mt-1">{t.required}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.gender} *</label>
          <select {...register('gender', { required: true })} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <option value="">--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{t.required}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">{t.address} *</label>
          <input type="text" {...register('address', { required: true })} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" />
        </div>
        <div><label className="block text-sm font-medium text-gray-700">{t.city} *</label><input type="text" {...register('city', { required: true })} className="mt-1 block w-full rounded-md border p-2" /></div>
        <div><label className="block text-sm font-medium text-gray-700">{t.state} *</label><input type="text" {...register('state', { required: true })} className="mt-1 block w-full rounded-md border p-2" /></div>
        <div><label className="block text-sm font-medium text-gray-700">{t.country} *</label><input type="text" {...register('country', { required: true })} className="mt-1 block w-full rounded-md border p-2" /></div>
        <div><label className="block text-sm font-medium text-gray-700">{t.phone} *</label><input type="tel" {...register('phone', { required: true })} className="mt-1 block w-full rounded-md border p-2" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">{t.email} *</label><input type="email" {...register('email', { required: true })} className="mt-1 block w-full rounded-md border p-2" /></div>
      </div>
      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">{t.next}</button>
      </div>
    </form>
  );
};