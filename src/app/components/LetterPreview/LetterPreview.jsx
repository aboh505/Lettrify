
'use client';
import React from 'react';
export default function LetterPreview({ data, template }) {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div id="cv-preview" className="bg-white p-6 rounded shadow border min-h-[70vh]">
      {template === 'classic' && (
        <>
          <p className="text-right">{currentDate}</p>
          <p>À l’attention de : {data.recipient || 'Destinataire'}</p>
          <h2 className="text-xl font-semibold mt-4 underline">{data.subject || 'Objet'}</h2>
          <p className="mt-4 whitespace-pre-line">{data.body || 'Votre message...'}</p>
          <p className="mt-6">Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>
          <p className="mt-4 font-bold">{data.sender || 'Votre nom'}</p>
        </>
      )}

      {template === 'modern' && (
        <>
          <div className="flex justify-between">
            <p>{data.sender || 'Votre nom'}</p>
            <p>{currentDate}</p>
          </div>
          <div className="my-4 border-t border-b py-2">
            <p className="font-bold">Objet :</p>
            <p>{data.subject || 'Candidature spontanée'}</p>
          </div>
          <p>À {data.recipient || 'la personne concernée'},</p>
          <p className="mt-4 whitespace-pre-line">{data.body || 'Votre message...'}</p>
          <p className="mt-6">Cordialement,</p>
          <p className="mt-2 font-bold">{data.sender || 'Votre nom'}</p>
        </>
      )}

      {template === 'minimal' && (
        <>
          <h1 className="text-2xl font-bold text-center mb-2">{data.subject || 'Lettre de motivation'}</h1>
          <p className="text-center mb-6">{currentDate}</p>
          <p className="italic mb-4">Destinataire : {data.recipient || 'Nom de l’entreprise'}</p>
          <p className="whitespace-pre-line">{data.body || 'Votre texte...'}</p>
          <p className="mt-6">Sincèrement,</p>
          <p className="mt-2 font-bold">{data.sender || 'Votre nom'}</p>
        </>
      )}
    </div>
  );
}
