
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use the same URL as the regular client to avoid network issues
const SUPABASE_URL = "https://fkcxycubjaxovkicfzzv.supabase.co";
// This is a service role key with higher privileges - only use in admin components
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrY3h5Y3ViamF4b3ZraWNmenp2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjkzOTA2MywiZXhwIjoyMDY4NTE1MDYzfQ.kxPqo5ExrtNLn2TgPhBATKVrOGMgyohsqDNEUC_qH50";

// Admin client with higher privileges - ONLY use for admin functions
export const adminSupabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_SERVICE_KEY,
  {
    auth: {
      persistSession: false, // Don't persist this session
      autoRefreshToken: false
    }
  }
); 

// Function to check if a user is an admin - with fallback for arcrxx@gmail.com
export async function isUserAdmin(userId: string): Promise<boolean> {
  if (!userId) return false;
  
  try {
    console.log("Checking admin status for user ID:", userId);
    
    // First, try to get the user's email to check if it's arcrxx@gmail.com
    let userEmail = null;
    try {
      const { data: userData, error: userError } = await adminSupabase.auth.admin.getUserById(userId);
      if (!userError && userData?.user?.email) {
        userEmail = userData.user.email;
        console.log("Found user email:", userEmail);
      }
    } catch (e) {
      console.log("Could not fetch user email, continuing with admin table check");
    }
    
    // Special case for arcrxx@gmail.com - always grant admin access
    if (userEmail === 'arcrxx@gmail.com') {
      console.log("Granting admin access to arcrxx@gmail.com");
      return true;
    }
    
    // Then check the admin_users table
    const { data, error } = await adminSupabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error("Error checking admin table:", error);
      // If there's an error but the user is arcrxx@gmail.com, grant access anyway
      if (userEmail === 'arcrxx@gmail.com') {
        console.log("Fallback: granting admin access to arcrxx@gmail.com despite error");
        return true;
      }
      return false;
    }
    
    console.log("Admin table check result:", !!data);
    return !!data;
  } catch (e) {
    console.error("Failed to check admin status:", e);
    return false;
  }
}
