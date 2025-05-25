import React from 'react';
import { DocumentTextIcon } from './Icons';

interface AnalysisDisplayProps {
  analysis: string | null;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  if (!analysis) {
    return null;
  }

  // Split by one or more newlines to handle various spacing in AI response
  const paragraphs = analysis.split(/\n+/).filter(p => p.trim() !== '');

  return (
    <div className="mt-8 p-4 sm:p-6 bg-gray-800/70 rounded-lg shadow-inner">
      <h2 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-4 flex items-center">
        <DocumentTextIcon className="w-6 h-6 sm:w-7 sm:h-7 mr-2 text-purple-400" />
        Analysis Results &amp; Treatment Plan:
      </h2>
      <div 
        dir="rtl" 
        lang="ar" 
        className="space-y-3 text-gray-200 leading-relaxed whitespace-pre-wrap text-right"
        aria-label="Skin analysis and treatment plan in Arabic"
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};