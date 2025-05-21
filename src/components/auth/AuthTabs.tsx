
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="w-full">
      <div className="flex border-b border-white/20 mb-6">
        <button
          className={`flex-1 py-3 text-center font-medium transition-all ${
            activeTab === 'login' ? 'text-white border-b-2 border-white' : 'text-white/60'
          }`}
          onClick={() => setActiveTab('login')}
        >
          Sign In
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium transition-all ${
            activeTab === 'register' ? 'text-white border-b-2 border-white' : 'text-white/60'
          }`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>

      {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthTabs;
