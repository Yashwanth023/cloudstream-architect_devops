
import { createClient } from '@supabase/supabase-js';

// Instead of using environment variables, we'll use the Supabase connection details 
// that are automatically provided by the Lovable platform when connecting to Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ArchitectureConfig = {
  id?: string;
  user_id: string;
  name: string;
  description: string;
  components: Record<string, any>;
  created_at?: string;
  updated_at?: string;
};

export type UserProfile = {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  company?: string;
  role?: string;
};
