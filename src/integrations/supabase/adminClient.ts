
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cvvjiodqarscubcbbxbt.supabase.co";
// This is a service role key with higher privileges - only use in admin components
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2dmppb2RxYXJzY3ViY2JieGJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzY0NzQ0NSwiZXhwIjoyMDYzMjIzNDQ1fQ.8NvBjBSuIwGnOm7HnOjM1gLEnmzSfODkPLFmR7WMNOY";

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

// Function to check if a user is an admin
export async function isUserAdmin(userId: string): Promise<boolean> {
  if (!userId) return false;
  
  try {
    const { data, error } = await adminSupabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
    
    return !!data;
  } catch (e) {
    console.error("Failed to check admin status:", e);
    return false;
  }
}
