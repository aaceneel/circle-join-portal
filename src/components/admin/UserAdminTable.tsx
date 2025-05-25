
import React, { useState, useEffect } from 'react';
import { adminSupabase } from '@/integrations/supabase/adminClient';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface UserAdminStatus {
  id: string;
  email: string;
  user_created_at: string;
  is_admin: boolean;
  admin_granted_at: string | null;
}

const UserAdminTable = () => {
  const [users, setUsers] = useState<UserAdminStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingUsers, setUpdatingUsers] = useState<Set<string>>(new Set());

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      console.log("Loading all users with admin status...");
      
      const { data, error } = await adminSupabase
        .from('user_admin_status')
        .select('*');

      if (error) {
        console.error("Error loading users:", error);
        toast.error("Failed to load users");
        return;
      }

      console.log("Loaded users:", data);
      setUsers(data || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    setUpdatingUsers(prev => new Set(prev).add(userId));
    
    try {
      const newStatus = !currentStatus;
      console.log(`Toggling admin status for user ${userId} to ${newStatus}`);
      
      const { data, error } = await adminSupabase.rpc('toggle_admin_status', {
        user_id: userId,
        grant_admin: newStatus
      });

      if (error) {
        throw error;
      }

      // Update the local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, is_admin: newStatus, admin_granted_at: newStatus ? new Date().toISOString() : null }
            : user
        )
      );

      toast.success(`User admin access ${newStatus ? 'granted' : 'removed'} successfully`);
    } catch (error: any) {
      console.error('Error toggling admin status:', error);
      toast.error(error.message || 'Failed to update admin status');
    } finally {
      setUpdatingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white/90 mb-4">User Management</h3>
        <div className="text-center py-8">
          <p className="text-white/70">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white/90">User Management</h3>
        <button
          onClick={loadUsers}
          className="px-4 py-2 rounded-lg text-white/90 bg-dark-medium hover:bg-dark-lighter transition-colors text-sm"
        >
          Refresh
        </button>
      </div>
      
      {users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white/60">No users found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-white/80">Email</TableHead>
                <TableHead className="text-white/80">Registered</TableHead>
                <TableHead className="text-white/80">Admin Status</TableHead>
                <TableHead className="text-white/80">Admin Since</TableHead>
                <TableHead className="text-white/80">Toggle Admin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-white/90 font-medium">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-white/70">
                    {new Date(user.user_created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.is_admin 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {user.is_admin ? 'Admin' : 'User'}
                    </span>
                  </TableCell>
                  <TableCell className="text-white/70">
                    {user.admin_granted_at 
                      ? new Date(user.admin_granted_at).toLocaleDateString()
                      : '-'
                    }
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={user.is_admin}
                      onCheckedChange={() => toggleAdminStatus(user.id, user.is_admin)}
                      disabled={updatingUsers.has(user.id)}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <p className="text-white/60 text-sm mt-4">
        Toggle the switches to grant or remove admin access for users. Changes take effect immediately.
      </p>
    </div>
  );
};

export default UserAdminTable;
