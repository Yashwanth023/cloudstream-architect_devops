
import { createClient } from '@supabase/supabase-js';

// For Vite applications, we need to use import.meta.env instead of process.env
// These environment variables are automatically provided by the Lovable platform
// when connecting to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
