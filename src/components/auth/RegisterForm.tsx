
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await signUp(email, password);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="input-field w-full"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-white/80 mb-2">Password</label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="input-field w-full"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-lg text-white font-medium transition-all"
        variant="default"
      >
        {isSubmitting ? 'Signing up...' : 'Sign Up'}
      </Button>
      <div className="text-center text-white/60 text-sm">
        <p>By registering, you'll need admin access to view applications.</p>
      </div>
    </form>
  );
};

export default RegisterForm;
