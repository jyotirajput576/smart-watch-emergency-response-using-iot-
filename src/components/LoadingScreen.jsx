import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Initializing Health Monitor...",
    "Connecting to Smartwatch...",
    "Loading Vital Signs...",
    "Calibrating Sensors...",
    "Setting up Alerts...",
    "Ready to Monitor!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete, loadingTexts.length]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-3 h-3 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Loading Container */}
      <div className="text-center z-10">
        {/* Logo/Icon Animation */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-spin">
                <div className="w-8 h-8 bg-white rounded-full animate-bounce"></div>
              </div>
            </div>
            {/* Rotating rings */}
            <div className="absolute inset-0 border-4 border-cyan-400/30 rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
            <div className="absolute inset-2 border-2 border-blue-400/40 rounded-full animate-spin" style={{animationDuration: '2s', animationDirection: 'reverse'}}></div>
          </div>
        </div>

        {/* App Title */}
        <h1 className="text-4xl font-bold text-white mb-2 animate-fadeIn">
          Smartwatch Health
        </h1>
        <p className="text-cyan-300 text-lg mb-8 animate-fadeIn" style={{animationDelay: '0.5s'}}>
          Monitoring System
        </p>

        {/* Loading Text */}
        <div className="mb-6">
          <p className="text-gray-300 text-sm animate-fadeIn" style={{animationDelay: '1s'}}>
            {loadingTexts[currentText]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-4">
          <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress Percentage */}
        <p className="text-cyan-400 text-sm font-mono">
          {progress}%
        </p>

        {/* Floating Health Icons */}
        <div className="absolute top-20 left-20 animate-float">
          <div className="text-4xl text-red-400">❤️</div>
        </div>
        <div className="absolute top-32 right-24 animate-float" style={{animationDelay: '1s'}}>
          <div className="text-4xl text-blue-400">🫁</div>
        </div>
        <div className="absolute bottom-32 left-16 animate-float" style={{animationDelay: '2s'}}>
          <div className="text-4xl text-green-400">🌡️</div>
        </div>
        <div className="absolute bottom-24 right-20 animate-float" style={{animationDelay: '1.5s'}}>
          <div className="text-4xl text-purple-400">🩸</div>
        </div>
      </div>

      {/* Wave Animation at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20">
          <path
            d="M0,60 C300,100 600,20 900,60 C1050,80 1200,40 1200,60 L1200,120 L0,120 Z"
            fill="rgba(6, 182, 212, 0.1)"
            className="animate-wave"
          />
          <path
            d="M0,80 C250,120 500,40 750,80 C900,100 1050,60 1200,80 L1200,120 L0,120 Z"
            fill="rgba(59, 130, 246, 0.1)"
            className="animate-wave-reverse"
          />
        </svg>
      </div>
    </div>
  );
}