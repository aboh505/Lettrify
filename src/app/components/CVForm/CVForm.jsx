'use client';

import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function CVForm({ data, setData, lang, template }) {
  const updateField = (field, value) => setData(prev => ({ ...prev, [field]: value }));
  const addItem = (listName, newItem) => setData(prev => ({ ...prev, [listName]: [...(prev[listName] || []), newItem] }));
  const updateItem = (listName, index, field, value) => {
    const updatedList = [...(data[listName] || [])];
    updatedList[index][field] = value;
    setData(prev => ({ ...prev, [listName]: updatedList }));
  };
  const removeItem = (listName, index) => {
    const updatedList = [...(data[listName] || [])];
    updatedList.splice(index, 1);
    setData(prev => ({ ...prev, [listName]: updatedList }));
  };

  const inputClass = `w-full px-3 py-1.5 rounded border focus:ring-2 transition text-sm
    ${template === 'modern' ? 'border-blue-300 bg-white focus:ring-blue-400 focus:border-blue-400' : ''}
    ${template === 'minimal' ? 'border-gray-200 bg-gray-50 focus:ring-green-300 focus:border-green-300' : ''}
    ${template === 'elegant' ? 'border-indigo-200 bg-indigo-50 focus:ring-violet-400 focus:border-violet-400' : ''}
    ${template === 'creative' ? 'border-pink-300 bg-pink-50 focus:ring-pink-400 focus:border-pink-400' : ''}
    ${template === 'classic' ? 'border-gray-300 bg-white focus:ring-blue-200 focus:border-blue-200' : ''}`;

  return (
    <form className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-bold mb-2 tracking-tight">
        {lang === 'fr' ? 'CV - Informations Personnelles' : 'CV - Personal Information'}
      </h2>

      <div className="grid gap-3">
        <div>
          <label className="block text-xs font-semibold mb-1">Nom complet</label>
          <input type="text" value={data.name} onChange={e => updateField('name', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Email</label>
          <input type="email" value={data.email} onChange={e => updateField('email', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Téléphone</label>
          <input type="tel" value={data.phone} onChange={e => updateField('phone', e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-1 text-blue-600">Expériences professionnelles</h3>
        {(data.experience || []).map((exp, i) => (
          <div key={i} className="mb-4 p-3 border rounded bg-white">
            <input type="text" placeholder="Poste" value={exp.position} onChange={e => updateItem('experience', i, 'position', e.target.value)} className={inputClass + ' mb-2'} />
            <input type="text" placeholder="Entreprise" value={exp.company} onChange={e => updateItem('experience', i, 'company', e.target.value)} className={inputClass + ' mb-2'} />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input type="month" value={exp.from} onChange={e => updateItem('experience', i, 'from', e.target.value)} className={inputClass} />
              <input type="month" value={exp.to} onChange={e => updateItem('experience', i, 'to', e.target.value)} className={inputClass} />
            </div>
            <textarea rows={3} placeholder="Description" value={exp.description} onChange={e => updateItem('experience', i, 'description', e.target.value)} className={inputClass + ' resize-none mb-2'} />
            <button type="button" onClick={() => removeItem('experience', i)} className="text-sm text-red-500 flex items-center gap-1">
              <Trash2 size={16} /> Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addItem('experience', { position: '', company: '', from: '', to: '', description: '' })} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2">
          <PlusCircle size={18} /> Ajouter une expérience
        </button>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-1 text-blue-600">Formations</h3>
        {(data.education || []).map((edu, i) => (
          <div key={i} className="mb-4 p-3 border rounded bg-white">
            <input type="text" placeholder="École / Université" value={edu.school} onChange={e => updateItem('education', i, 'school', e.target.value)} className={inputClass + ' mb-2'} />
            <input type="text" placeholder="Diplôme / Spécialité" value={edu.degree} onChange={e => updateItem('education', i, 'degree', e.target.value)} className={inputClass + ' mb-2'} />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input type="month" value={edu.from} onChange={e => updateItem('education', i, 'from', e.target.value)} className={inputClass} />
              <input type="month" value={edu.to} onChange={e => updateItem('education', i, 'to', e.target.value)} className={inputClass} />
            </div>
            <button type="button" onClick={() => removeItem('education', i)} className="text-sm text-red-500 flex items-center gap-1">
              <Trash2 size={16} /> Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addItem('education', { school: '', degree: '', from: '', to: '' })} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2">
          <PlusCircle size={18} /> Ajouter une formation
        </button>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-1 text-blue-600">Compétences</h3>
        {(data.skills || []).map((skill, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input type="text" value={skill} onChange={e => {
              const newSkills = [...data.skills];
              newSkills[i] = e.target.value;
              setData(prev => ({ ...prev, skills: newSkills }));
            }} className={inputClass + ' flex-grow'} placeholder="Compétence" />
            <button type="button" onClick={() => {
              const newSkills = [...data.skills];
              newSkills.splice(i, 1);
              setData(prev => ({ ...prev, skills: newSkills }));
            }} className="text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addItem('skills', '')} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2">
          <PlusCircle size={18} /> Ajouter une compétence
        </button>
      </div>
    </form>
  );
}
