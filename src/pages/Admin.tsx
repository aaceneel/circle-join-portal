
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Background from '@/components/Background';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Applicant {
  id: string;
  full_name: string;
  age: string;
  location: string;
  whatsapp: string;
  occupation: string;
  description: string;
  income: string;
  goal: string;
  expected_earnings: string;
  main_challenge: string;
  open_to_call: boolean;
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const navigate = useNavigate();

  const hardcodedCredentials = {
    username: 'admin',
    password: 'Sur@jc0113'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (username === hardcodedCredentials.username && password === hardcodedCredentials.password) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_authenticated', 'true');
        toast.success('Login successful');
        loadApplicants();
      } else {
        toast.error('Invalid credentials');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    navigate('/admin');
  };

  const loadApplicants = async () => {
    try {
      setIsLoadingData(true);
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setApplicants(data || []);
    } catch (error: any) {
      console.error('Error fetching applicants:', error);
      toast.error('Failed to load applicants');
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('admin_authenticated') === 'true';
      setIsAuthenticated(isAuth);
      if (isAuth) {
        loadApplicants();
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Background />
      
      <div className="container mx-auto px-4 py-12">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto glass-card p-8">
            <h2 className="text-2xl font-bold text-white/90 mb-6 text-center">Admin Login</h2>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-white/80 mb-2">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field w-full"
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-white/80 mb-2">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field w-full"
                  placeholder="Enter password"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg text-white font-medium transition-all
                  ${isLoading ? 'bg-gray-500' : 'bg-glow-gradient hover:opacity-90'}`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        ) : (
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white/90">Application Dashboard</h2>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-white/90 bg-dark-medium hover:bg-dark-lighter transition-colors"
              >
                Logout
              </button>
            </div>
            
            {isLoadingData ? (
              <div className="text-center py-12">
                <p className="text-white/70">Loading applicants...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-dark-medium text-white/80">
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Location</th>
                      <th className="p-4 text-left">Age</th>
                      <th className="p-4 text-left">WhatsApp</th>
                      <th className="p-4 text-left">Occupation</th>
                      <th className="p-4 text-left">Open to Call</th>
                      <th className="p-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-4 text-center text-white/60">No applicants found</td>
                      </tr>
                    ) : (
                      applicants.map((applicant) => (
                        <tr key={applicant.id} className="border-b border-dark-medium hover:bg-dark-lighter/30">
                          <td className="p-4 text-white/90">{applicant.full_name}</td>
                          <td className="p-4 text-white/70">{applicant.location}</td>
                          <td className="p-4 text-white/70">{applicant.age}</td>
                          <td className="p-4 text-white/70">{applicant.whatsapp}</td>
                          <td className="p-4 text-white/70">{applicant.occupation}</td>
                          <td className="p-4 text-white/70">
                            {applicant.open_to_call ? (
                              <span className="bg-gray-500/20 text-white/80 px-2 py-1 rounded text-xs">Yes</span>
                            ) : (
                              <span className="bg-gray-700/20 text-white/60 px-2 py-1 rounded text-xs">No</span>
                            )}
                          </td>
                          <td className="p-4 text-white/70">
                            {new Date(applicant.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
