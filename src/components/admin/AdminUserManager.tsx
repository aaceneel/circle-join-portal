
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminSupabase } from '@/integrations/supabase/adminClient';
import { toast } from 'sonner';
import UserAdminTable from './UserAdminTable';
import { makeArcrxxAdmin } from '@/utils/makeAdmin';

const AdminUserManager = () => {
  const [email, setEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isMakingArcrxxAdmin, setIsMakingArcrxxAdmin] = useState(false);

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

  const handleMakeArcrxxAdmin = async () => {
    try {
      setIsMakingArcrxxAdmin(true);
      const result = await makeArcrxxAdmin();
      
      if (result.success) {
        toast.success('Successfully made arcrxx@gmail.com an admin!');
      } else {
        toast.error(result.error || 'Failed to make arcrxx@gmail.com admin');
      }
    } catch (error: any) {
      console.error('Error making arcrxx admin:', error);
      toast.error('Failed to make arcrxx@gmail.com admin');
    } finally {
      setIsMakingArcrxxAdmin(false);
    }
  };

  return (
    <div>
      <div className="glass-card p-6 mb-6">
        <h3 className="text-xl font-bold text-white/90 mb-4">Quick Admin Setup</h3>
        <div className="mb-4">
          <Button
            onClick={handleMakeArcrxxAdmin}
            disabled={isMakingArcrxxAdmin}
            className="px-6 py-2 rounded-lg text-white font-medium transition-all bg-green-600 hover:bg-green-700"
          >
            {isMakingArcrxxAdmin ? 'Adding...' : 'Make arcrxx@gmail.com Admin'}
          </Button>
          <p className="text-white/60 text-sm mt-2">
            Click this button to grant admin access to arcrxx@gmail.com
          </p>
        </div>
      </div>

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
