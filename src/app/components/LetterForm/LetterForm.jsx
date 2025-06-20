'use client';
import React from 'react';

export default function LetterForm({ data, setData, template = 'classic', lang = 'fr' }) {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Styles dynamiques selon le template
  const base =
    "w-full max-w-md mx-auto p-4 md:p-6 rounded-xl ";
  const styleByTemplate = {
    classic: base + "bg-white border border-gray-200 shadow space-y-4",
    modern:
      base +
      "bg-gradient-to-br from-blue-50 to-white border-2 border-blue-400 shadow-lg space-y-4 text-blue-900 font-sans",
    minimal: base + "bg-gray-50 border border-gray-200 shadow-sm space-y-4 text-gray-700 font-light",
    elegant: base + "bg-indigo-50 border border-indigo-200 shadow space-y-4 text-indigo-900 font-serif",
    creative: base + "bg-pink-50 border-2 border-pink-300 shadow-lg space-y-4 text-pink-900 font-[Quicksand,sans-serif]",
  };

  return (
    <form className={styleByTemplate[template] || styleByTemplate.classic} style={{fontSize: '0.97rem'}}>
      <h2 className="text-xl font-bold mb-2 tracking-tight">
        {lang === 'fr' ? 'Lettre de motivation' : 'Cover Letter'}
      </h2>
      <div className="grid gap-2">
        <div>
          <label className="block text-xs font-semibold mb-1">
            {lang === 'fr' ? 'Destinataire' : 'Recipient'}
          </label>
          <input
            type="text"
            name="recipient"
            value={data.recipient}
            onChange={handleChange}
            className={`w-full px-3 py-1.5 rounded border focus:ring-2 transition text-sm
                ${template === 'modern' ? 'border-blue-300 bg-white focus:ring-blue-400 focus:border-blue-400' : ''}
                ${template === 'minimal' ? 'border-gray-200 bg-gray-50 focus:ring-green-300 focus:border-green-300' : ''}
                ${template === 'elegant' ? 'border-indigo-200 bg-indigo-50 focus:ring-violet-400 focus:border-violet-400' : ''}
                ${template === 'creative' ? 'border-pink-300 bg-pink-50 focus:ring-pink-400 focus:border-pink-400' : ''}
                ${template === 'classic' ? 'border-gray-300 bg-white focus:ring-blue-200 focus:border-blue-200' : ''}`}
            placeholder={lang === 'fr' ? "Nom de l'entreprise ou du recruteur" : 'Company or recruiter name'}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">
            {lang === 'fr' ? 'Objet' : 'Subject'}
          </label>
          <input
            type="text"
            name="subject"
            value={data.subject}
            onChange={handleChange}
            className={`w-full px-3 py-1.5 rounded border focus:ring-2 transition text-sm
                ${template === 'modern' ? 'border-blue-300 bg-white focus:ring-blue-400 focus:border-blue-400' : ''}
                ${template === 'minimal' ? 'border-gray-200 bg-gray-50 focus:ring-green-300 focus:border-green-300' : ''}
                ${template === 'elegant' ? 'border-indigo-200 bg-indigo-50 focus:ring-violet-400 focus:border-violet-400' : ''}
                ${template === 'creative' ? 'border-pink-300 bg-pink-50 focus:ring-pink-400 focus:border-pink-400' : ''}
                ${template === 'classic' ? 'border-gray-300 bg-white focus:ring-blue-200 focus:border-blue-200' : ''}`}
            placeholder={lang === 'fr' ? 'Ex: Candidature pour le poste de...' : 'Ex: Application for the position of...'}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">
            {lang === 'fr' ? 'Corps de la lettre' : 'Message Body'}
          </label>
          <textarea
            rows={5}
            name="body"
            value={data.body}
            onChange={handleChange}
            className={`w-full px-3 py-1.5 rounded border focus:ring-2 transition text-sm resize-none
                ${template === 'modern' ? 'border-blue-300 bg-white focus:ring-blue-400 focus:border-blue-400' : ''}
                ${template === 'minimal' ? 'border-gray-200 bg-gray-50 focus:ring-green-300 focus:border-green-300' : ''}
                ${template === 'elegant' ? 'border-indigo-200 bg-indigo-50 focus:ring-violet-400 focus:border-violet-400' : ''}
                ${template === 'creative' ? 'border-pink-300 bg-pink-50 focus:ring-pink-400 focus:border-pink-400' : ''}
                ${template === 'classic' ? 'border-gray-300 bg-white focus:ring-blue-200 focus:border-blue-200' : ''}`}
            placeholder={lang === 'fr' ? 'Écrivez votre lettre de motivation ici...' : 'Write your cover letter here...'}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">
            {lang === 'fr' ? 'Signature' : 'Signature'}
          </label>
          <input
            type="text"
            name="sender"
            value={data.sender}
            onChange={handleChange}
            className={`w-full px-3 py-1.5 rounded border focus:ring-2 transition text-sm
                ${template === 'modern' ? 'border-blue-300 bg-white focus:ring-blue-400 focus:border-blue-400' : ''}
                ${template === 'minimal' ? 'border-gray-200 bg-gray-50 focus:ring-green-300 focus:border-green-300' : ''}
                ${template === 'elegant' ? 'border-indigo-200 bg-indigo-50 focus:ring-violet-400 focus:border-violet-400' : ''}
                ${template === 'creative' ? 'border-pink-300 bg-pink-50 focus:ring-pink-400 focus:border-pink-400' : ''}
                ${template === 'classic' ? 'border-gray-300 bg-white focus:ring-blue-200 focus:border-blue-200' : ''}`}
            placeholder={lang === 'fr' ? 'Votre nom complet' : 'Your full name'}
          />
        </div>
      </div>
    </form>
  );
}
