
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminSupabase } from '@/integrations/supabase/adminClient';
import { toast } from 'sonner';
import UserAdminTable from './UserAdminTable';

const AdminUserManager = () => {
  const [email, setEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddAdmin = async () => {
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      setIsAdding(true);
      const { data, error } = await adminSupabase.rpc('add_admin_user', {
        user_email: email.trim()
      });

      if (error) {
        throw error;
      }

      toast.success(`Successfully added ${email} as admin`);
      setEmail('');
    } catch (error: any) {
      console.error('Error adding admin:', error);
      toast.error(error.message || 'Failed to add admin user');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <div className="glass-card p-6 mb-6">
        <h3 className="text-xl font-bold text-white/90 mb-4">Add Admin by Email</h3>
        <div className="flex gap-4">
          <Input
            type="email"
            placeholder="Enter email to make admin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleAddAdmin()}
          />
          <Button
            onClick={handleAddAdmin}
            disabled={isAdding}
            className="px-6 py-2 rounded-lg text-white font-medium transition-all"
          >
            {isAdding ? 'Adding...' : 'Add Admin'}
          </Button>
        </div>
        <p className="text-white/60 text-sm mt-2">
          Enter the email address of a registered user to grant them admin access.
        </p>
      </div>
      
      <UserAdminTable />
    </div>
  );
};

export default AdminUserManager;
