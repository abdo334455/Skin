import React from 'react';
import { ExclamationTriangleIcon } from './Icons';

interface ErrorMessageProps {
  message: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div role="alert" className="mt-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-md flex items-start">
      <ExclamationTriangleIcon className="h-6 w-6 mr-3 text-red-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-red-300">An Error Occurred</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};