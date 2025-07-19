
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';

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
            <TableHead className="text-white/80">Instagram</TableHead>
            <TableHead className="text-white/80">Followers</TableHead>
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
                {applicant.instagram || 'Not provided'}
              </TableCell>
              <TableCell className="text-white/70">
                {applicant.follower_count}
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
