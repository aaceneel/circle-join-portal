
import React from 'react';
import Background from '@/components/Background';
import { useAuth } from '@/contexts/AuthContext';
import AuthTabs from '@/components/auth/AuthTabs';
import AdminDashboard from '@/components/admin/AdminDashboard';
import UnauthorizedView from '@/components/admin/UnauthorizedView';
import { testSupabaseConnection } from '@/utils/supabaseTest';

const Admin = () => {
  const { user, isAdmin, isLoading } = useAuth();

  return (
    <div className="min-h-screen w-full">
      <Background />
      
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="max-w-md mx-auto glass-card p-8 text-center">
            <p className="text-white/80">Loading...</p>
          </div>
        ) : !user ? (
          <div className="max-w-md mx-auto glass-card p-8">
            <h2 className="text-2xl font-bold text-white/90 mb-6 text-center">Admin Access</h2>
            <AuthTabs />
          </div>
        ) : !isAdmin ? (
          <UnauthorizedView />
        ) : (
          <AdminDashboard />
        )}
      </div>
    </div>
  );
};

export default Admin;
