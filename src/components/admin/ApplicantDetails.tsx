
import React from 'react';

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

interface ApplicantDetailsProps {
  applicant: Applicant;
  onClose: () => void;
}

const ApplicantDetails: React.FC<ApplicantDetailsProps> = ({ applicant, onClose }) => {
  return (
    <div className="glass-card p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white/90">{applicant.full_name}'s Application</h3>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white px-3 py-1 rounded-md bg-dark-medium"
        >
          Back to List
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-white/60 mb-1">Age</p>
          <p className="text-white/90">{applicant.age}</p>
        </div>
        <div>
          <p className="text-white/60 mb-1">Location</p>
          <p className="text-white/90">{applicant.location}</p>
        </div>
        <div>
          <p className="text-white/60 mb-1">WhatsApp</p>
          <p className="text-white/90">{applicant.whatsapp}</p>
        </div>
        <div>
          <p className="text-white/60 mb-1">Occupation</p>
          <p className="text-white/90">{applicant.occupation}</p>
        </div>
        <div>
          <p className="text-white/60 mb-1">Income</p>
          <p className="text-white/90">{applicant.income}</p>
        </div>
        <div>
          <p className="text-white/60 mb-1">Expected Earnings</p>
          <p className="text-white/90">{applicant.expected_earnings}</p>
        </div>
        <div>
          <p className="text-white/60 mb-1">Goal</p>
          <p className="text-white/90">{applicant.goal}</p>
        </div>
        <div>
          <p className="text-white/60 mb-1">Open to Call</p>
          <p className="text-white/90">
            {applicant.open_to_call ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="col-span-1 md:col-span-2">
          <p className="text-white/60 mb-1">Description</p>
          <p className="text-white/90">{applicant.description}</p>
        </div>
        <div className="col-span-1 md:col-span-2">
          <p className="text-white/60 mb-1">Main Challenge</p>
          <p className="text-white/90">{applicant.main_challenge}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetails;
