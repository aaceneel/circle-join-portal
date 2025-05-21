
import { supabase } from '@/integrations/supabase/client';
import { adminSupabase } from '@/integrations/supabase/adminClient';

/**
 * Test Supabase connection and table access
 */
export async function testSupabaseConnection() {
  try {
    console.log("Testing Supabase connection...");
    
    // Test basic connection with regular client
    console.log("Testing with regular client:");
    const { data: regularData, error: regularError } = await supabase
      .from('applications')
      .select('count()', { count: 'exact' });
      
    if (regularError) {
      console.error("Error connecting to Supabase (regular client):", regularError);
    } else {
      console.log("Supabase connection successful (regular client):", regularData);
    }

    // Test with admin client
    console.log("Testing with admin client:");
    const { data: adminData, error: adminError } = await adminSupabase
      .from('applications')
      .select('count()', { count: 'exact' });
      
    if (adminError) {
      console.error("Error connecting to Supabase (admin client):", adminError);
    } else {
      console.log("Supabase connection successful (admin client):", adminData);
    }
    
    // Test applications table access with regular client
    console.log("Testing applications table access with regular client:");
    const { data: appCount, error: appError } = await supabase
      .from('applications')
      .select('count()', { count: 'exact' });
      
    if (appError) {
      console.error("Error accessing applications table (regular client):", appError);
    } else {
      console.log("Applications table access successful (regular client):", appCount);
    }

    // Test applications table access with admin client
    console.log("Testing applications table access with admin client:");
    const { data: adminAppCount, error: adminAppError } = await adminSupabase
      .from('applications')
      .select('count()', { count: 'exact' });
      
    if (adminAppError) {
      console.error("Error accessing applications table (admin client):", adminAppError);
    } else {
      console.log("Applications table access successful (admin client):", adminAppCount);
    }
    
    // Get a sample of application data rather than trying to access system tables
    console.log("Fetching sample data with admin client:");
    const { data: sampleData, error: sampleError } = await adminSupabase
      .from('applications')
      .select('id, full_name, location, created_at')
      .limit(5);
      
    if (sampleError) {
      console.error("Error fetching sample data:", sampleError);
    } else {
      console.log("Available sample data:", sampleData);
    }
    
    // Test direct query with admin client
    console.log("Testing direct applications query with admin client:");
    const { data, error } = await adminSupabase
      .from('applications')
      .select('*')
      .limit(5);
      
    if (error) {
      console.error("Error querying applications:", error);
    } else {
      console.log(`Found ${data?.length || 0} applications:`, data);
    }
    
  } catch (err) {
    console.error("Test failed with exception:", err);
  }
}
