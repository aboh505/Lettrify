'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { downloadPdf } from "./utils/downloadPdf";

import { translations } from "./utils/translations";
import TemplateSelector from "./components/TemplateSelector/TemplateSelector";
import CVForm from "./components/CVForm/CVForm";
import CVPreview from "./components/CVPreview/CVPreview";
import LetterForm from "./components/LetterForm/LetterForm";
import LetterPreview from "./components/LetterPreview/LetterPreview";
import { saveLetter, loadLetters, deleteLetter } from "./utils/storage";

export default function HomePage() {
  const [mode, setMode] = useState("cv");
  const [template, setTemplate] = useState("classic");
  const [lang, setLang] = useState("fr");
  const [letterType, setLetterType] = useState("motivation");
  const [cvType, setCvType] = useState("chronologique");
  const [showHelp, setShowHelp] = useState(false);
  const t = translations[lang];

  const [cvData, setCvData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: [],
    experience: [],
    skills: []
  });

  const [letterData, setLetterData] = useState({
    recipient: "",
    subject: "",
    body: "",
    sender: ""
  });

  const [savedLetters, setSavedLetters] = useState({});

  const letterTypes = {
    motivation: { label: "Lettre de motivation", icon: "🟦", subject: "Candidature au poste de...", body: "Je me permets de vous adresser ma candidature..." },
    candidature: { label: "Candidature spontanée", icon: "🟧", subject: "Candidature spontanée", body: "Je vous adresse ma candidature spontanée..." },
    stage: {
      label: "Demande de stage",
      icon: "🟨",
      subject: "",
      body:
        `Nom Prénom\nAdresse\nTéléphone\nE-mail\n\\nEntreprise\nService / Responsable\nAdresse de l'entreprise\n\nObjet : Demande de stage en développement web\n\nMadame, Monsieur,\n\nJe suis [Nom], étudiant(e) en développement web à [Établissement]. Je me permets de vous adresser ma candidature pour un stage de [durée] au sein de votre entreprise.\n\nAu cours de ma formation, j’ai acquis des compétences en HTML, CSS, JavaScript, React, Node.js, etc. Je suis motivé(e), curieux(se), et je saurai m’adapter à votre environnement de travail.\n\nVotre entreprise m’intéresse particulièrement pour [raison spécifique liée à l'entreprise].\n\nJe reste à votre disposition pour un entretien. Dans l’attente de votre réponse, je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.\n\n[Signature]`
    },
    ecole: { label: "Candidature à une école", icon: "🟪", subject: "Demande d’admission à [nom de l’école]", body: "Je souhaite intégrer votre établissement..." },
    demission: { label: "Lettre de démission", icon: "🟥", subject: "Démission du poste de...", body: "Par la présente, je vous informe de ma décision..." },
    reclamation: { label: "Lettre de réclamation", icon: "⬛", subject: "Réclamation - [objet]", body: "Je me permets de vous adresser cette lettre de réclamation..." },
    recommandation: { label: "Lettre de recommandation", icon: "🟩", subject: "Recommandation pour [nom]", body: "Je recommande vivement [nom] pour..." },
    administrative: { label: "Lettre administrative", icon: "🔷", subject: "Demande relative à...", body: "Je me permets de solliciter votre attention sur..." }
  };

  const cvTypes = {
    chronologique: "CV Chronologique",
    fonctionnel: "CV Fonctionnel",
    mixte: "CV Mixte",


    etudiant: "CV Étudiant",
    international: "CV International"
  };

  useEffect(() => {
    const savedCV = JSON.parse(localStorage.getItem("cvData"));
    if (savedCV) setCvData(savedCV);
    setSavedLetters(loadLetters());
  }, []);

  useEffect(() => {
    const selected = letterTypes[letterType];
    setLetterData((prev) => ({
      ...prev,
      subject: selected.subject,
      body: selected.body
    }));
  }, [letterType]);

  const handleSaveLetter = () => {
    const payload = { ...letterData, type: letterType, template };
    saveLetter(payload);
    setSavedLetters(loadLetters());
  };

  const handleDeleteLetter = (id) => {
    deleteLetter(id);
    setSavedLetters(loadLetters());
  };

  const handleEditLetter = (letter) => {
    setLetterData(letter);
    setLetterType(letter.type || "motivation");
  };

  const handleEditCV = () => {
    const saved = JSON.parse(localStorage.getItem("cvData"));
    if (saved) setCvData(saved);
  };

  return (
    <motion.div className="p-4 bg-gradient-to-br from-slate-100 via-white to-slate-200 min-h-screen">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3">
          {/* Logo plume stylisée en L */}
          <span className="inline-block">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 40C18 32 28 16 28 8" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M12 40C18 38 28 32 36 24" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="13" cy="39" r="2.5" fill="#2563eb" />
            </svg>
          </span>
          <span>
            <span className="text-4xl md:text-5xl font-extrabold text-blue-700 tracking-tight">Lettrify</span>
          </span>
        </div>
        <span className="mt-2 text-lg md:text-xl text-blue-900 font-medium tracking-wide text-center">
          Écris. Personnalise. Télécharge. Brille.
        </span>
      </div>

      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-4xl font-bold text-blue-700">📝 {t.appTitle}</h1> */}
        <div className="flex gap-2 items-center">

          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="text-sm bg-gray-200 px-4 py-1 rounded hover:bg-gray-300 transition-colors"
          >
            {t.switchLang}
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setMode("cv")}
          className={`px-6 py-2 rounded-full shadow-md transition-all duration-200 ${mode === "cv"
              ? "bg-blue-600 text-white transform scale-105"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {t.cvMode}
        </button>
        <button
          onClick={() => setMode("letter")}
          className={`px-6 py-2 rounded-full shadow-md transition-all duration-200 ${mode === "letter"
              ? "bg-blue-600 text-white transform scale-105"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {t.letterMode}
        </button>
      </div>

      {mode === "cv" && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {Object.entries(cvTypes).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCvType(key)}
              className={`px-4 py-1 rounded-full text-sm border shadow-sm ${cvType === key ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            >
              {label}
            </button>
          ))}
          <p className="text-center text-sm text-gray-600 mt-2 w-full">
            Aperçu du style : <strong>{cvTypes[cvType]}</strong>
          </p>
        </div>
      )}

      {mode === "letter" && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {Object.entries(letterTypes).map(([key, { label, icon }]) => (
            <button
              key={key}
              onClick={() => setLetterType(key)}
              className={`px-4 py-1 rounded-full text-sm border shadow-sm ${letterType === key ? 'bg-green-600 text-white' : 'bg-white text-gray-700'}`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      )}

      {showHelp && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 max-w-3xl mx-auto rounded">
          <p className="text-sm text-gray-700">
            {mode === "letter"
              ? letterTypes[letterType]?.label + " : " + letterTypes[letterType]?.body.slice(0, 100) + "..."
              : "Type de CV sélectionné : " + cvTypes[cvType]}
          </p>
        </div>
      )}

      <TemplateSelector selected={template} setSelected={setTemplate} lang={lang} />

      <motion.div
        className="grid md:grid-cols-2 gap-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {mode === "cv" ? (
          <>
            <CVForm data={cvData} setData={setCvData} lang={lang} type={cvType} />
            <CVPreview data={cvData} template={template} lang={lang} type={cvType} />
          </>
        ) : (
          <>
            <LetterForm data={letterData} setData={setLetterData} autoFill={cvData} lang={lang} type={letterType} />
            <LetterPreview data={letterData} template={template} lang={lang} type={letterType} />
          </>
        )}
      </motion.div>

      {mode === "letter" && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <button onClick={handleSaveLetter} className="bg-green-600 text-white px-4 py-2 rounded">Sauvegarder la lettre</button>
          <div className="w-full max-w-xl">
            <h3 className="font-bold mb-2">Lettres sauvegardées :</h3>
            {Object.entries(savedLetters).map(([id, letter]) => (
              <div key={id} className="flex justify-between items-center bg-white p-2 rounded shadow mb-2">
                <span>{letter.subject || 'Sans titre'} ({letter.type || 'type inconnu'})</span>
                <div className="flex gap-2">
                  <button onClick={() => handleEditLetter(letter)} className="text-green-700">Modifier</button>
                  <button onClick={() => handleDeleteLetter(id)} className="text-red-600">Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "cv" && (
        <div className="mt-6 text-center">
          <button onClick={handleEditCV} className="text-blue-700 underline">Modifier le CV sauvegardé</button>
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={() => downloadPdf()}
          className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-700 transition-colors"
        >
          {t.download}
        </button>
      </div>
    </motion.div>
  );
}
