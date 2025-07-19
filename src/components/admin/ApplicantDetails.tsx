
import React from 'react';

interface Applicant {
  id: string;
  full_name: string;
  age: string;
  location: string;
  whatsapp: string;
  instagram: string;
  content_topic: string;
  proud_link: string;
  follower_count: string;
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
          <p className="text-white/60 mb-1">Instagram</p>
          <p className="text-white/90">{applicant.instagram || 'Not provided'}</p>
        </div>
        <div>
          <p className="text-white/60 mb-1">Follower Count</p>
          <p className="text-white/90">{applicant.follower_count}</p>
        </div>
        <div>
          <p className="text-white/60 mb-1">Proud Link</p>
          <a 
            href={applicant.proud_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline break-all"
          >
            {applicant.proud_link}
          </a>
        </div>
        <div className="col-span-1 md:col-span-2">
          <p className="text-white/60 mb-1">Content Topic</p>
          <p className="text-white/90">{applicant.content_topic}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetails;
