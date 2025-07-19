
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

interface ApplicantTableProps {
  applicants: Applicant[];
  onViewDetails: (applicant: Applicant) => void;
}

const ApplicantTable: React.FC<ApplicantTableProps> = ({ applicants, onViewDetails }) => {
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return "Unknown date";
    }
  };

  return (
    <div className="glass-card p-6">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10">
            <TableHead className="text-white/80">Name</TableHead>
            <TableHead className="text-white/80">Age</TableHead>
            <TableHead className="text-white/80">Location</TableHead>
            <TableHead className="text-white/80">WhatsApp</TableHead>
            <TableHead className="text-white/80">Occupation</TableHead>
            <TableHead className="text-white/80">Open to Call</TableHead>
            <TableHead className="text-white/80">Submitted</TableHead>
            <TableHead className="text-white/80">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((applicant) => (
            <TableRow key={applicant.id} className="border-white/10 hover:bg-white/5">
              <TableCell className="text-white/90 font-medium">
                {applicant.full_name}
              </TableCell>
              <TableCell className="text-white/70">
                {applicant.age}
              </TableCell>
              <TableCell className="text-white/70">
                {applicant.location}
              </TableCell>
              <TableCell className="text-white/70">
                {applicant.whatsapp}
              </TableCell>
              <TableCell className="text-white/70">
                {applicant.occupation || 'Not specified'}
              </TableCell>
              <TableCell className="text-white/70">
                <span className={`inline-flex items-center gap-2`}>
                  <span className={`h-2 w-2 rounded-full ${applicant.open_to_call ? 'bg-green-400' : 'bg-gray-600'}`}></span>
                  {applicant.open_to_call ? 'Yes' : 'No'}
                </span>
              </TableCell>
              <TableCell className="text-white/60 text-sm">
                {formatDate(applicant.created_at)}
              </TableCell>
              <TableCell>
                <button 
                  onClick={() => onViewDetails(applicant)}
                  className="text-sm px-3 py-1 rounded bg-dark-medium hover:bg-gray-700 transition-colors text-white/90"
                >
                  View Details
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantTable;
