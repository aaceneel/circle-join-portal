
import React from 'react';

const UnauthorizedView = () => {
  return (
    <div className="glass-card p-6">
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-white/90 mb-4">Unauthorized Access</h2>
        <p className="text-white/70 mb-6">
          You are logged in, but you don't have admin permissions to view applications.
        </p>
        <p className="text-white/60 text-sm">
          Please contact the administrator to grant you admin access.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedView;
