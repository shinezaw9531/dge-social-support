import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormStore } from '../store/useFormStore';

interface AiHelpModalProps {
  fieldLabel: string;
  currentValue: string;
  onAccept: (text: string) => void;
  onClose: () => void;
}

export const AiHelpModal: React.FC<AiHelpModalProps> = ({ fieldLabel, currentValue, onAccept, onClose }) => {
  const { lang } = useFormStore();
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [error, setError] = useState<string | null>(null);

  const apiKey = (import.meta.env.VITE_OPENAI_API_KEY as string) || '';

  useEffect(() => {
    const fetchAiData = async () => {
      if (!apiKey) {
        setError(lang === 'en' ? 'OpenAI Secret API Token missing from client configuration cache.' : 'مفتاح واجهة برمجة التطبيقات مفقود.');
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are an AI assistant processing social welfare claims. Help the citizen format their personal account into a professional and cohesive paragraph.' },
              { role: 'user', content: `Refine this note for "${fieldLabel}" field: "${currentValue}". Keep the response under 100 words.` }
            ],
            temperature: 0.7
          },
          {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
            timeout: 10000
          }
        );
        setSuggestion(response.data.choices[0].message.content.trim());
      } catch (err: unknown) { 
        if (axios.isAxiosError(err)) {
          if (err.code === 'ECONNABORTED') {
            setError(lang === 'en' ? 'Connection timed out.' : 'انتهت مهلة الاتصال بالخادم.');
          } else {
            setError(err.response?.data?.error?.message || 'Failed to call OpenAI service endpoint.');
          }
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(lang === 'en' ? 'An unexpected network error occurred.' : 'حدث خطأ غير متوقع.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAiData();
  }, [fieldLabel, currentValue, apiKey, lang]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full space-y-4 shadow-2xl">
        <h3 className="text-lg font-bold text-gray-900">✨ AI Copilot Suggestion</h3>
        {loading && <div className="text-gray-500 animate-pulse text-sm">Drafting formal text representation...</div>}
        {error && <div className="bg-red-50 text-red-700 p-3 rounded text-xs">{error}</div>}
        {!loading && !error && (
          <textarea className="w-full p-2 border rounded text-sm text-gray-700" rows={5} value={suggestion} onChange={(e) => setSuggestion(e.target.value)} />
        )}
        <div className="flex justify-end space-x-2 rtl:space-x-reverse text-sm">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">{lang === 'en' ? 'Discard' : 'تجاهل'}</button>
          <button type="button" disabled={loading || !!error} onClick={() => onAccept(suggestion)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-40">{lang === 'en' ? 'Accept' : 'قبول'}</button>
        </div>
      </div>
    </div>
  );
};