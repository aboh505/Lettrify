'use client';
import React from 'react';
// Sauvegarder une lettre avec un identifiant
export const saveLetter = (letterData, id = Date.now()) => {
  const savedLetters = JSON.parse(localStorage.getItem("savedLetters")) || {};
  savedLetters[id] = letterData;
  localStorage.setItem("savedLetters", JSON.stringify(savedLetters));
};

// Charger toutes les lettres
export const loadLetters = () => {
  return JSON.parse(localStorage.getItem("savedLetters")) || {};
};

// Supprimer une lettre spécifique
export const deleteLetter = (id) => {
  const saved = loadLetters();
  delete saved[id];
  localStorage.setItem("savedLetters", JSON.stringify(saved));
};
