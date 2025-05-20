import { supabase } from '@/integrations/supabase/client';

/**
 * Test Supabase connection and table access
 */
export async function testSupabaseConnection() {
  try {
    console.log("Testing Supabase connection...");
    
    // Test basic connection
    const { data: versionData, error: versionError } = await supabase
      .rpc('version');
      
    if (versionError) {
      console.error("Error connecting to Supabase:", versionError);
    } else {
      console.log("Supabase connection successful:", versionData);
    }
    
    // Test applications table access
    console.log("Testing applications table access...");
    const { data: appCount, error: appError } = await supabase
      .from('applications')
      .select('count()', { count: 'exact' });
      
    if (appError) {
      console.error("Error accessing applications table:", appError);
    } else {
      console.log("Applications table access successful:", appCount);
    }
    
    // Get all tables
    console.log("Fetching table list...");
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
      
    if (tablesError) {
      console.error("Error fetching tables:", tablesError);
    } else {
      console.log("Available tables:", tables);
    }
    
    // Test direct query
    console.log("Testing direct applications query...");
    const { data, error } = await supabase
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