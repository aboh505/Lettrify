'use client';

import React from "react";

export default function CVForm({ data, setData, lang, type }) {
  // Fonctions communes d’update générique
  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  // Gestion dynamique des listes (éducation, experience, skills, projets)
  // Ajout
  const addItem = (listName, newItem) => {
    setData(prev => ({
      ...prev,
      [listName]: [...(prev[listName] || []), newItem]
    }));
  };

  // Mise à jour
  const updateItem = (listName, index, field, value) => {
    const updatedList = [...(data[listName] || [])];
    updatedList[index][field] = value;
    setData(prev => ({ ...prev, [listName]: updatedList }));
  };

  // Suppression
  const removeItem = (listName, index) => {
    const updatedList = [...(data[listName] || [])];
    updatedList.splice(index, 1);
    setData(prev => ({ ...prev, [listName]: updatedList }));
  };

  // Components de formulaire réutilisables

  const Input = ({ label, value, onChange, type="text", placeholder }) => (
    <div className="mb-2">
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded px-2 py-1"
      />
    </div>
  );

  const TextArea = ({ label, value, onChange, placeholder }) => (
    <div className="mb-2">
      <label className="block font-semibold mb-1">{label}</label>
      <textarea
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full border rounded px-2 py-1"
      />
    </div>
  );

  // Formulaires spécifiques par type CV

  // CV Chronologique = focus sur expériences + formations (date obligatoire)
  if(type === "chronologique") {
    return (
      <div>
        <Input label="Nom complet" value={data.name} onChange={v => updateField("name", v)} />
        <Input label="Email" type="email" value={data.email} onChange={v => updateField("email", v)} />
        <Input label="Téléphone" type="tel" value={data.phone} onChange={v => updateField("phone", v)} />
        <TextArea label="Résumé" value={data.summary} onChange={v => updateField("summary", v)} placeholder="Résumé professionnel" />

        <section>
          <h3 className="font-bold mt-4 mb-2">Expériences professionnelles</h3>
          {(data.experience || []).map((exp, i) => (
            <div key={i} className="mb-3 border p-2 rounded">
              <Input label="Poste" value={exp.position} onChange={v => updateItem("experience", i, "position", v)} />
              <Input label="Entreprise" value={exp.company} onChange={v => updateItem("experience", i, "company", v)} />
              <div className="flex gap-2">
                <Input label="Début" type="month" value={exp.from} onChange={v => updateItem("experience", i, "from", v)} />
                <Input label="Fin" type="month" value={exp.to} onChange={v => updateItem("experience", i, "to", v)} />
              </div>
              <TextArea label="Description" value={exp.description} onChange={v => updateItem("experience", i, "description", v)} />
              <button
                onClick={() => removeItem("experience", i)}
                className="text-red-600 text-sm mt-1"
              >Supprimer expérience</button>
            </div>
          ))}
          <button
            onClick={() => addItem("experience", { position: "", company: "", from: "", to: "", description: "" })}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >Ajouter expérience</button>
        </section>

        <section>
          <h3 className="font-bold mt-4 mb-2">Formations</h3>
          {(data.education || []).map((edu, i) => (
            <div key={i} className="mb-3 border p-2 rounded">
              <Input label="École / Université" value={edu.school} onChange={v => updateItem("education", i, "school", v)} />
              <Input label="Diplôme / Spécialité" value={edu.degree} onChange={v => updateItem("education", i, "degree", v)} />
              <div className="flex gap-2">
                <Input label="Début" type="month" value={edu.from} onChange={v => updateItem("education", i, "from", v)} />
                <Input label="Fin" type="month" value={edu.to} onChange={v => updateItem("education", i, "to", v)} />
              </div>
              <button
                onClick={() => removeItem("education", i)}
                className="text-red-600 text-sm mt-1"
              >Supprimer formation</button>
            </div>
          ))}
          <button
            onClick={() => addItem("education", { school: "", degree: "", from: "", to: "" })}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >Ajouter formation</button>
        </section>
      </div>
    );
  }

  // CV Fonctionnel = focus sur compétences + projets (pas forcément dates)
  if(type === "fonctionnel") {
    return (
      <div>
        <Input label="Nom complet" value={data.name} onChange={v => updateField("name", v)} />
        <Input label="Email" type="email" value={data.email} onChange={v => updateField("email", v)} />
        <Input label="Téléphone" type="tel" value={data.phone} onChange={v => updateField("phone", v)} />
        <TextArea label="Résumé" value={data.summary} onChange={v => updateField("summary", v)} placeholder="Résumé des compétences" />

        <section>
          <h3 className="font-bold mt-4 mb-2">Compétences</h3>
          {(data.skills || []).map((skill, i) => (
            <div key={i} className="mb-2 flex gap-2 items-center">
              <input
                type="text"
                value={skill}
                onChange={e => {
                  const newSkills = [...data.skills];
                  newSkills[i] = e.target.value;
                  setData(prev => ({ ...prev, skills: newSkills }));
                }}
                className="border rounded px-2 py-1 flex-grow"
              />
              <button
                onClick={() => {
                  const newSkills = [...data.skills];
                  newSkills.splice(i,1);
                  setData(prev => ({ ...prev, skills: newSkills }));
                }}
                className="text-red-600 text-sm"
              >X</button>
            </div>
          ))}
          <button
            onClick={() => addItem("skills", "")}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >Ajouter compétence</button>
        </section>

        <section>
          <h3 className="font-bold mt-4 mb-2">Projets</h3>
          {(data.projects || []).map((proj, i) => (
            <div key={i} className="mb-3 border p-2 rounded">
              <Input label="Titre" value={proj.title} onChange={v => updateItem("projects", i, "title", v)} />
              <TextArea label="Description" value={proj.description} onChange={v => updateItem("projects", i, "description", v)} />
              <button
                onClick={() => removeItem("projects", i)}
                className="text-red-600 text-sm mt-1"
              >Supprimer projet</button>
            </div>
          ))}
          <button
            onClick={() => addItem("projects", { title:"", description:"" })}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >Ajouter projet</button>
        </section>
      </div>
    );
  }

  // CV Mixte = expériences + compétences
  if(type === "mixte") {
    return (
      <div>
        <Input label="Nom complet" value={data.name} onChange={v => updateField("name", v)} />
        <Input label="Email" type="email" value={data.email} onChange={v => updateField("email", v)} />
        <Input label="Téléphone" type="tel" value={data.phone} onChange={v => updateField("phone", v)} />
        <TextArea label="Résumé" value={data.summary} onChange={v => updateField("summary", v)} placeholder="Résumé professionnel" />

        <section>
          <h3 className="font-bold mt-4 mb-2">Expériences professionnelles</h3>
          {(data.experience || []).map((exp, i) => (
            <div key={i} className="mb-3 border p-2 rounded">
              <Input label="Poste" value={exp.position} onChange={v => updateItem("experience", i, "position", v)} />
              <Input label="Entreprise" value={exp.company} onChange={v => updateItem("experience", i, "company", v)} />
              <div className="flex gap-2">
                <Input label="Début" type="month" value={exp.from} onChange={v => updateItem("experience", i, "from", v)} />
                <Input label="Fin" type="month" value={exp.to} onChange={v => updateItem("experience", i, "to", v)} />
              </div>
              <TextArea label="Description" value={exp.description} onChange={v => updateItem("experience", i, "description", v)} />
              <button
                onClick={() => removeItem("experience", i)}
                className="text-red-600 text-sm mt-1"
              >Supprimer expérience</button>
            </div>
          ))}
          <button
            onClick={() => addItem("experience", { position: "", company: "", from: "", to: "", description: "" })}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >Ajouter expérience</button>
        </section>

        <section>
          <h3 className="font-bold mt-4 mb-2">Compétences</h3>
          {(data.skills || []).map((skill, i) => (
            <div key={i} className="mb-2 flex gap-2 items-center">
              <input
                type="text"
                value={skill}
                onChange={e => {
                  const newSkills = [...data.skills];
                  newSkills[i] = e.target.value;
                  setData(prev => ({ ...prev, skills: newSkills }));
                }}
                className="border rounded px-2 py-1 flex-grow"
              />
              <button
                onClick={() => {
                  const newSkills = [...data.skills];
                  newSkills.splice(i,1);
                  setData(prev => ({ ...prev, skills: newSkills }));
                }}
                className="text-red-600 text-sm"
              >X</button>
            </div>
          ))}
          <button
            onClick={() => addItem("skills", "")}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >Ajouter compétence</button>
        </section>
      </div>
    );
  }

  // CV Classique, Moderne, Créatif, Étudiant, International (formulaire complet générique)

  return (
    <div>
      <Input label="Nom complet" value={data.name} onChange={v => updateField("name", v)} />
      <Input label="Email" type="email" value={data.email} onChange={v => updateField("email", v)} />
      <Input label="Téléphone" type="tel" value={data.phone} onChange={v => updateField("phone", v)} />
      <TextArea label="Résumé" value={data.summary} onChange={v => updateField("summary", v)} placeholder="Résumé professionnel" />

      <section>
        <h3 className="font-bold mt-4 mb-2">Formations</h3>
        {(data.education || []).map((edu, i) => (
          <div key={i} className="mb-3 border p-2 rounded">
            <Input label="École / Université" value={edu.school} onChange={v => updateItem("education", i, "school", v)} />
            <Input label="Diplôme / Spécialité" value={edu.degree} onChange={v => updateItem("education", i, "degree", v)} />
            <div className="flex gap-2">
              <Input label="Début" type="month" value={edu.from} onChange={v => updateItem("education", i, "from", v)} />
              <Input label="Fin" type="month" value={edu.to} onChange={v => updateItem("education", i, "to", v)} />
            </div>
            <button
              onClick={() => removeItem("education", i)}
              className="text-red-600 text-sm mt-1"
            >Supprimer formation</button>
          </div>
        ))}
        <button
          onClick={() => addItem("education", { school: "", degree: "", from: "", to: "" })}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >Ajouter formation</button>
      </section>

      <section>
        <h3 className="font-bold mt-4 mb-2">Expériences professionnelles</h3>
        {(data.experience || []).map((exp, i) => (
          <div key={i} className="mb-3 border p-2 rounded">
            <Input label="Poste" value={exp.position} onChange={v => updateItem("experience", i, "position", v)} />
            <Input label="Entreprise" value={exp.company} onChange={v => updateItem("experience", i, "company", v)} />
            <div className="flex gap-2">
              <Input label="Début" type="month" value={exp.from} onChange={v => updateItem("experience", i, "from", v)} />
              <Input label="Fin" type="month" value={exp.to} onChange={v => updateItem("experience", i, "to", v)} />
            </div>
            <TextArea label="Description" value={exp.description} onChange={v => updateItem("experience", i, "description", v)} />
            <button
              onClick={() => removeItem("experience", i)}
              className="text-red-600 text-sm mt-1"
            >Supprimer expérience</button>
          </div>
        ))}
        <button
          onClick={() => addItem("experience", { position: "", company: "", from: "", to: "", description: "" })}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >Ajouter expérience</button>
      </section>

      <section>
        <h3 className="font-bold mt-4 mb-2">Compétences</h3>
        {(data.skills || []).map((skill, i) => (
          <div key={i} className="mb-2 flex gap-2 items-center">
            <input
              type="text"
              value={skill}
              onChange={e => {
                const newSkills = [...data.skills];
                newSkills[i] = e.target.value;
                setData(prev => ({ ...prev, skills: newSkills }));
              }}
              className="border rounded px-2 py-1 flex-grow"
            />
            <button
              onClick={() => {
                const newSkills = [...data.skills];
                newSkills.splice(i,1);
                setData(prev => ({ ...prev, skills: newSkills }));
              }}
              className="text-red-600 text-sm"
            >X</button>
          </div>
        ))}
        <button
          onClick={() => addItem("skills", "")}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >Ajouter compétence</button>
      </section>
    </div>
  );
}
