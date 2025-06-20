'use client'

import React from 'react';

export default function CVPreview({ data, template, type }) {
  const renderEducation = () => (
    data.education?.map((item, idx) => (
      <div key={idx} className="mb-1">
        <strong>{item.degree}</strong> - {item.school} ({item.year})
      </div>
    ))
  );

  const renderExperience = () => (
    data.experience?.map((item, idx) => (
      <div key={idx} className="mb-1">
        <strong>{item.title}</strong> - {item.company} ({item.start} - {item.end})
      </div>
    ))
  );

  const renderSkills = () => (
    <ul className="list-disc list-inside">
      {data.skills?.map((skill, idx) => (
        <li key={idx}>{skill}</li>
      ))}
    </ul>
  );

  const baseStyle = 'p-6 rounded shadow bg-white';

  const templateStyle = {
    classic: 'border',
    modern: 'border-l-8 border-blue-500',
    creative: 'bg-gradient-to-r from-pink-100 to-purple-100',
    infographique: 'border-dashed border-2 border-green-400',
  }[template] || 'border';

  return (
    <div id="cv-preview" className={`${baseStyle} ${templateStyle}`}>
      <h2 className="text-2xl font-bold text-blue-800 mb-1">{data.name || 'Nom Prénom'}</h2>
      <p className="text-gray-700">{data.email} | {data.phone}</p>

      <hr className="my-3" />

      <h3 className="font-semibold text-lg text-blue-700">À propos</h3>
      <p className="mb-3 text-sm text-gray-800">{data.summary}</p>

      {(type === 'fonctionnel') && (
        <>
          <h3 className="font-semibold text-lg text-blue-700">Compétences Clés</h3>
          {renderSkills()}
        </>
      )}

      <h3 className="font-semibold text-lg text-blue-700 mt-3">Formation</h3>
      {renderEducation()}

      {(type !== 'fonctionnel') && (
        <>
          <h3 className="font-semibold text-lg text-blue-700 mt-3">Expérience</h3>
          {renderExperience()}

          <h3 className="font-semibold text-lg text-blue-700 mt-3">Compétences</h3>
          {renderSkills()}
        </>
      )}
    </div>
  );
}
