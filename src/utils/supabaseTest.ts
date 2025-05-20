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
    const { data: versionData, error: versionError } = await supabase
      .rpc('version');
      
    if (versionError) {
      console.error("Error connecting to Supabase (regular client):", versionError);
    } else {
      console.log("Supabase connection successful (regular client):", versionData);
    }

    // Test with admin client
    console.log("Testing with admin client:");
    const { data: adminVersionData, error: adminVersionError } = await adminSupabase
      .rpc('version');
      
    if (adminVersionError) {
      console.error("Error connecting to Supabase (admin client):", adminVersionError);
    } else {
      console.log("Supabase connection successful (admin client):", adminVersionData);
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
    
    // Get all tables with admin client
    console.log("Fetching table list with admin client:");
    const { data: tables, error: tablesError } = await adminSupabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
      
    if (tablesError) {
      console.error("Error fetching tables:", tablesError);
    } else {
      console.log("Available tables:", tables);
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