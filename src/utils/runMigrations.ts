
import { adminSupabase } from '@/integrations/supabase/adminClient';
import fs from 'fs';

export async function runMigrations() {
  try {
    console.log("Running migrations...");

    // Check if admin_users table exists
    const { data: tables, error: tablesError } = await adminSupabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'admin_users');

    if (tablesError) {
      console.error("Error checking tables:", tablesError);
      return;
    }

    // If admin_users doesn't exist, create it
    if (!tables || tables.length === 0) {
      console.log("Admin users table doesn't exist, creating...");
      
      // Read migration SQL directly using adminSupabase to execute
      const { error } = await adminSupabase.rpc('exec_sql', {
        sql: `
        -- Create admin_users table to track which users have admin access
        CREATE TABLE IF NOT EXISTS public.admin_users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          UNIQUE(user_id)
        );
        
        -- Enable RLS on admin_users
        ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
        
        -- Add RLS policy to prevent unauthorized access
        CREATE POLICY "Only admins can read admin_users" 
          ON public.admin_users 
          FOR SELECT 
          USING (auth.uid() IN (SELECT user_id FROM public.admin_users));
        
        -- Create function to add a user as admin
        CREATE OR REPLACE FUNCTION public.add_admin_user(user_email TEXT) 
        RETURNS UUID
        LANGUAGE plpgsql
        SECURITY DEFINER
        AS $$
        DECLARE
          user_id UUID;
          new_admin_id UUID;
        BEGIN
          -- Find the user ID from the email
          SELECT id INTO user_id FROM auth.users WHERE email = user_email;
          
          IF user_id IS NULL THEN
            RAISE EXCEPTION 'User with email % not found', user_email;
          END IF;
          
          -- Insert into admin_users if not already an admin
          INSERT INTO public.admin_users (user_id)
          VALUES (user_id)
          ON CONFLICT (user_id) DO NOTHING
          RETURNING id INTO new_admin_id;
          
          RETURN new_admin_id;
        END;
        $$;
        `
      });
      
      if (error) {
        console.error("Error creating admin_users table:", error);
      } else {
        console.log("Admin users table created successfully");
      }
    } else {
      console.log("Admin users table already exists");
    }
  } catch (error) {
    console.error("Failed to run migrations:", error);
  }
}
