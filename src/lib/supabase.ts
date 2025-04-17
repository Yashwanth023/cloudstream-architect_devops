
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

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
