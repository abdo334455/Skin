import React, { useState, useCallback } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { analyzeSkinImage } from './services/geminiService';
import { SparklesIcon } from './components/Icons';
import { LandingPage } from './components/LandingPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'app'>('landing');
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((file: File) => {
    setSelectedImageFile(file);
    setAnalysisResult(null);
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
  }, [previewUrl]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitForAnalysis = async () => {
    if (!selectedImageFile) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const imageBase64 = await fileToBase64(selectedImageFile);
      const result = await analyzeSkinImage(imageBase64);
      setAnalysisResult(result);
    } catch (err) {
      console.error("Analysis error:", err);
      if (err instanceof Error) {
        setError(`Failed to analyze image: ${err.message}. Ensure your API key is correctly configured if issues persist.`);
      } else {
        setError("An unknown error occurred during analysis. Ensure your API key is correctly configured if issues persist.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (currentPage === 'landing') {
    return <LandingPage onStart={() => setCurrentPage('app')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black text-gray-200 flex flex-col items-center p-4 sm:p-8 pt-12 sm:pt-16">
      <button 
        onClick={() => setCurrentPage('landing')}
        className="absolute top-4 left-4 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        aria-label="Back to Home"
      >
        &larr; Back to Home
      </button>
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
            AI Skin Analyzer
          </span>
        </h1>
        <p className="text-lg text-gray-400">
          Upload a photo of your skin for AI-powered analysis.
          <br />Receive a detailed treatment plan in Arabic, featuring products available in Egypt.
        </p>
      </header>

      <main className="w-full max-w-2xl glassmorphic-card shadow-2xl rounded-xl p-6 sm:p-8">
        <ImageUpload onImageSelect={handleImageSelect} previewUrl={previewUrl} />

        {previewUrl && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSubmitForAnalysis}
              disabled={isLoading}
              aria-label="Analyze Skin Now"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center mx-auto"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="w-5 h-5 mr-2 text-white"/>
                  Analyzing...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Analyze Skin Now
                </>
              )}
            </button>
          </div>
        )}

        {error && <ErrorMessage message={error} />}
        
        {analysisResult && !isLoading && (
          <AnalysisDisplay analysis={analysisResult} />
        )}
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>
          Powered by Gemini API. This tool is for informational purposes only and not a substitute for professional medical advice.
        </p>
        <p className="mt-1">
          تحليل البشرة وخطة العلاج باللغة العربية.
        </p>
      </footer>
    </div>
  );
};

export default App;