'use client';
import React from 'react';

export const downloadPdf = async () => {
  const html2pdf = (await import('html2pdf.js')).default;

  const element = document.getElementById('cv-preview');
  if (!element) return;

  html2pdf()
    .from(element)
    .set({
      margin: 0.5,
      filename: 'document.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    })
    .save();
};
