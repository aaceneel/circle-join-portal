
import { adminSupabase } from '@/integrations/supabase/adminClient';

export async function runMigrations() {
  try {
    console.log("Running migrations...");

    // Check if admin_users table exists using raw SQL query instead of information_schema
    const { data: tablesCheck, error: tablesCheckError } = await adminSupabase
      .rpc('get_recent_applicants')
      .then(() => ({ data: true, error: null }))
      .catch(() => ({ data: null, error: 'Table might not exist' }));

    // If we can't query get_recent_applicants function, it probably means our tables aren't set up
    if (tablesCheckError) {
      console.log("Database might not be fully set up, creating tables...");
      
      // Execute SQL directly using fetch instead of .rpc
      const supabaseUrl = "https://cvvjiodqarscubcbbxbt.supabase.co";
      const supabaseKey = adminSupabase.supabaseKey;
      
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({
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
          DO $$
          BEGIN
            IF NOT EXISTS (
              SELECT 1 FROM pg_policy WHERE tablename = 'admin_users' AND policyname = 'Only admins can read admin_users'
            ) THEN
              CREATE POLICY "Only admins can read admin_users" 
                ON public.admin_users 
                FOR SELECT 
                USING (auth.uid() IN (SELECT user_id FROM public.admin_users));
            END IF;
          END;
          $$;
          
          -- Create function to add a user as admin if it doesn't exist
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
        })
      });
      
      const result = await response.json();
      if (response.ok) {
        console.log("Migration successful:", result);
      } else {
        console.error("Migration failed:", result);
      }
    } else {
      console.log("Admin users table already exists");
    }
  } catch (error) {
    console.error("Failed to run migrations:", error);
  }
}
