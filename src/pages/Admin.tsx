import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Background from '@/components/Background';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

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
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
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

      console.log("Fetched applications:", data);
      setApplicants(data || []);
    } catch (error: any) {
      console.error('Error fetching applicants:', error);
      toast.error('Failed to load applicants');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleViewDetails = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleCloseDetails = () => {
    setSelectedApplicant(null);
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

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return "Unknown date";
    }
  };

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
                  ${isLoading ? 'bg-gray-500' : 'bg-dark-lighter hover:bg-gray-700'}`}
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
            
            {selectedApplicant ? (
              <div className="glass-card p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white/90">{selectedApplicant.full_name}'s Application</h3>
                  <button
                    onClick={handleCloseDetails}
                    className="text-white/70 hover:text-white px-3 py-1 rounded-md bg-dark-medium"
                  >
                    Back to List
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-white/60 mb-1">Age</p>
                    <p className="text-white/90">{selectedApplicant.age}</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Location</p>
                    <p className="text-white/90">{selectedApplicant.location}</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">WhatsApp</p>
                    <p className="text-white/90">{selectedApplicant.whatsapp}</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Occupation</p>
                    <p className="text-white/90">{selectedApplicant.occupation}</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Income</p>
                    <p className="text-white/90">{selectedApplicant.income}</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Expected Earnings</p>
                    <p className="text-white/90">{selectedApplicant.expected_earnings}</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Goal</p>
                    <p className="text-white/90">{selectedApplicant.goal}</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Open to Call</p>
                    <p className="text-white/90">
                      {selectedApplicant.open_to_call ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-white/60 mb-1">Description</p>
                    <p className="text-white/90">{selectedApplicant.description}</p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-white/60 mb-1">Main Challenge</p>
                    <p className="text-white/90">{selectedApplicant.main_challenge}</p>
                  </div>
                </div>
              </div>
            ) : isLoadingData ? (
              <div className="text-center py-12">
                <p className="text-white/70">Loading applicants...</p>
              </div>
            ) : (
              <div>
                {applicants.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-white/60">No applications found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applicants.map((applicant) => (
                      <Card key={applicant.id} className="bg-dark-lighter border border-white/10 text-white shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg font-medium text-white/90">{applicant.full_name}</CardTitle>
                              <CardDescription className="text-white/60">
                                {applicant.location} • {applicant.age}
                              </CardDescription>
                            </div>
                            <span className={`inline-flex h-2.5 w-2.5 rounded-full ${applicant.open_to_call ? 'bg-gray-400' : 'bg-gray-600'}`}></span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm text-white/70">
                              <span className="font-medium">Occupation:</span> {applicant.occupation}
                            </p>
                            <p className="text-sm text-white/70 line-clamp-2">
                              <span className="font-medium">Description:</span> {applicant.description}
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <span className="text-xs text-white/50">{formatDate(applicant.created_at)}</span>
                          <button 
                            onClick={() => handleViewDetails(applicant)}
                            className="text-sm px-3 py-1 rounded bg-dark-medium hover:bg-gray-700 transition-colors"
                          >
                            View Details
                          </button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
