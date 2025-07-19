
import { adminSupabase } from '@/integrations/supabase/adminClient';

export const makeUserAdmin = async (email: string) => {
  try {
    console.log(`Adding ${email} as admin...`);
    
    const { data, error } = await adminSupabase.rpc('add_admin_user', {
      user_email: email
    });

    if (error) {
      console.error('Error adding admin:', error);
      return { success: false, error: error.message };
    }

    console.log(`Successfully added ${email} as admin`);
    return { success: true };
  } catch (error: any) {
    console.error('Failed to add admin:', error);
    return { success: false, error: error.message };
  }
};

// One-time function to make arcrxx@gmail.com admin
export const makeArcrxxAdmin = () => makeUserAdmin('arcrxx@gmail.com');
