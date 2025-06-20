// components/TemplateSelector.jsx
import React from "react";
import { translations } from "../../utils/translations";

const templates = [
  { id: 'classic', previewColor: 'bg-gray-200' },
  { id: 'modern', previewColor: 'bg-blue-200' },
  { id: 'minimal', previewColor: 'bg-green-100' },

];

export default function TemplateSelector({ selected, setSelected, lang = 'fr' }) {
  const t = translations[lang];

  return (
    <div className="flex justify-center flex-wrap gap-4 mt-4">
      {templates.map((tmpl) => (
        <div
          key={tmpl.id}
          onClick={() => setSelected(tmpl.id)}
          className={`cursor-pointer rounded-lg p-3 border w-36 text-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${
            tmpl.previewColor
          } ${
            selected === tmpl.id
              ? 'ring-2 ring-blue-600 scale-105'
              : ''
          }`}
        >
          <div className="w-full h-24 rounded bg-white mb-3 shadow-inner"></div>
          <p className="font-medium">{t[tmpl.id]}</p>
        </div>
      ))}
    </div>
  );
}
