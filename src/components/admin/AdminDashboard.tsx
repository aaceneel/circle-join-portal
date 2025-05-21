
import React, { useState, useEffect } from 'react';
import { adminSupabase } from '@/integrations/supabase/adminClient';
import { toast } from 'sonner';
import ApplicantCard from './ApplicantCard';
import ApplicantDetails from './ApplicantDetails';
import { useAuth } from '@/contexts/AuthContext';

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

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadApplicants = async () => {
    try {
      setIsLoadingData(true);
      setError(null);
      console.log("Starting to fetch applications...");
      
      // Attempt to fetch applications
      const { data, error } = await adminSupabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        setError(`Failed to load data: ${error.message}. Please check your service role key and network connection.`);
        toast.error("Failed to access applications data");
        return;
      }

      console.log("Fetched applications:", data);
      console.log("Number of applications:", data ? data.length : 0);
      
      if (data && data.length > 0) {
        console.log("First application:", data[0]);
        setApplicants(data);
        toast.success(`Loaded ${data.length} applications successfully`);
      } else {
        console.log("No applications found in the database");
        setApplicants([]);
        toast.info("No applications found in the database");
      }
    } catch (error: any) {
      console.error('Error fetching applicants:', error);
      setError(`Unexpected error: ${error.message}`);
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
    loadApplicants();
  }, []);

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white/90">Application Dashboard</h2>
        <div className="flex space-x-3">
          <button
            onClick={loadApplicants}
            className="px-4 py-2 rounded-lg text-white/90 bg-dark-medium hover:bg-dark-lighter transition-colors"
            disabled={isLoadingData}
          >
            {isLoadingData ? 'Loading...' : 'Refresh'}
          </button>
          <button
            onClick={signOut}
            className="px-4 py-2 rounded-lg text-white/90 bg-dark-medium hover:bg-dark-lighter transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      
      {error && (
        <div className="p-4 mb-6 bg-red-500/20 border border-red-500/50 rounded-md">
          <p className="text-white/90">{error}</p>
          <p className="text-white/70 text-sm mt-2">
            Check that your Supabase service role key has proper permissions to access the applications table.
          </p>
        </div>
      )}
      
      {selectedApplicant ? (
        <ApplicantDetails applicant={selectedApplicant} onClose={handleCloseDetails} />
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
                <ApplicantCard 
                  key={applicant.id} 
                  applicant={applicant} 
                  onViewDetails={handleViewDetails} 
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
