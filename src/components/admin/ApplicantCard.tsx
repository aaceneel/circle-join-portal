
import React from 'react';
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

interface ApplicantCardProps {
  applicant: Applicant;
  onViewDetails: (applicant: Applicant) => void;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({ applicant, onViewDetails }) => {
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return "Unknown date";
    }
  };

  return (
    <Card className="bg-dark-lighter border border-white/10 text-white shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium text-white/90">{applicant.full_name}</CardTitle>
            <CardDescription className="text-white/60">
              {applicant.location} • {applicant.age}
            </CardDescription>
          </div>
          <span className={`inline-flex h-2.5 w-2.5 rounded-full ${applicant.open_to_call ? 'bg-green-400' : 'bg-gray-600'}`}></span>
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
          onClick={() => onViewDetails(applicant)}
          className="text-sm px-3 py-1 rounded bg-dark-medium hover:bg-gray-700 transition-colors"
        >
          View Details
        </button>
      </CardFooter>
    </Card>
  );
};

export default ApplicantCard;
