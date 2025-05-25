import React from 'react';
import { Link } from 'react-router-dom';
import Background from '@/components/Background';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <Background />
      <div className="glass-card p-8 text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gradient">Thank You!</h1>
        <p className="text-xl text-white/80 mb-6">
          Your application has been submitted successfully. We will review your information and get back to you soon.
        </p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-glow-blue hover:bg-glow-purple transition-colors rounded-lg text-white font-medium"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou; 