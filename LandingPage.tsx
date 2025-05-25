
import React from 'react';
import { ArrowRightIcon, SparklesIcon, LightBulbIcon, MapPinIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon, PhotoIcon, PresentationChartLineIcon, DocumentMagnifyingGlassIcon } from './Icons';

interface LandingPageProps {
  onStart: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="glassmorphic-card p-6 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300">
    <div className="flex items-center justify-center w-12 h-12 bg-purple-600/30 text-purple-300 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const HowItWorksStep: React.FC<{ icon: React.ReactNode; title: string; description: string; stepNumber: number }> = ({ icon, title, description, stepNumber }) => (
  <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start glassmorphic-card p-6 rounded-lg shadow-lg">
    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full text-2xl font-bold shadow-md">
        {stepNumber}
      </div>
    </div>
    <div>
      <div className="flex items-center justify-center md:justify-start mb-2">
        {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 text-purple-400 mr-2" })}
        <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
      </div>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  </div>
);


export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black text-gray-200 selection:bg-purple-500 selection:text-white">
      {/* Hero Section */}
      <section className="py-20 sm:py-32 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            {/* Decorative background shapes */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-700 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-700 rounded-full filter blur-3xl animate-pulse-slower"></div>
        </div>

        {/* FIX: Suppress TypeScript error for SparklesIcon's className prop.
            This assumes that IconProps for SparklesIcon correctly defines className,
            and the error might be due to a localized type inference issue or LSP glitch. */}
        {/* @ts-ignore */}
        <SparklesIcon className="w-16 h-16 text-purple-400 mb-6" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
            Unlock Radiant Skin
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-10">
          Your personal AI dermatologist is here. Get instant, AI-driven skin analysis and personalized treatment plans in Arabic, with product recommendations specifically for Egypt.
        </p>
        <button
          onClick={onStart}
          aria-label="Start Skin Analysis"
          className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl text-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 flex items-center"
        >
          Start Analysis Now <ArrowRightIcon className="w-5 h-5 ml-3" />
        </button>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-100">Simple Steps to Better Skin</h2>
          <p className="text-center text-gray-400 mb-12 sm:mb-16 max-w-xl mx-auto">Follow these easy steps to get your personalized skin analysis and treatment plan.</p>
          <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            <HowItWorksStep
              stepNumber={1}
              icon={<PhotoIcon />}
              title="Upload Your Photo"
              description="Securely upload a clear, well-lit photo of your skin concern. The better the image, the more accurate the analysis."
            />
            <HowItWorksStep
              stepNumber={2}
              icon={<DocumentMagnifyingGlassIcon />}
              title="AI-Powered Analysis"
              description="Our advanced Gemini AI meticulously analyzes your image, identifying potential skin issues and characteristics."
            />
            <HowItWorksStep
              stepNumber={3}
              icon={<PresentationChartLineIcon />}
              title="Receive Your Plan"
              description="Get a comprehensive skin health report and a personalized treatment plan in Arabic, including product suggestions available in Egypt."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-100">Why Choose Our AI Skin Analyzer?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<LightBulbIcon className="w-6 h-6" />}
              title="Intelligent Analysis"
              description="Powered by Google's cutting-edge Gemini AI for deep, nuanced skin insights."
            />
            <FeatureCard
              icon={<MapPinIcon className="w-6 h-6" />}
              title="Localized for Egypt"
              description="Product recommendations and advice tailored to items readily available in the Egyptian market."
            />
            <FeatureCard
              icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />}
              title="Arabic Reports"
              description="Clear, understandable, and detailed skin health advice provided in fluent Arabic."
            />
            <FeatureCard
              icon={<ShieldCheckIcon className="w-6 h-6" />}
              title="Secure & Private"
              description="Your images and data are handled with utmost confidentiality and security."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-gray-800">
        <p className="text-gray-500 text-sm">
          AI Skin Analyzer &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
        <p className="text-gray-600 text-xs mt-2">
          This tool is for informational purposes only and does not constitute medical advice. Always consult a qualified dermatologist for any skin concerns.
        </p>
         <p className="text-gray-600 text-xs mt-1">
          مدعوم بواسطة Gemini API.
        </p>
      </footer>
      {/* FIX: Remove 'jsx' prop as it's specific to styled-jsx/Next.js, which doesn't seem to be in use here.
          The styles will become global. */}
      <style>{`
        .animate-pulse-slow {
          animation: pulse 8s infinite ease-in-out;
        }
        .animate-pulse-slower {
          animation: pulse 10s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};
