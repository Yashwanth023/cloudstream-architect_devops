
import { createClient } from '@supabase/supabase-js';

// For Vite applications, we need to use import.meta.env instead of process.env
// These environment variables are automatically provided by the Lovable platform
// when connecting to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client when environment variables aren't available
let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Using a mock client.');
  
  // Create a mock client that doesn't make actual API calls
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
      signUp: async () => ({ error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: new Error('Supabase not configured') }),
          order: () => ({ data: [], error: null })
        }),
        order: () => ({ data: [], error: null })
      }),
      insert: () => ({
        select: () => ({
          single: async () => ({ data: null, error: new Error('Supabase not configured') })
        })
      }),
      update: () => ({
        eq: () => ({
          select: () => ({
            single: async () => ({ data: null, error: new Error('Supabase not configured') })
          })
        })
      }),
      delete: () => ({
        eq: () => ({ error: null })
      })
    }),
    storage: {
      from: () => ({
        upload: async () => ({ error: new Error('Supabase not configured') }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    },
    functions: {
      invoke: async () => ({ data: null, error: new Error('Supabase not configured') })
    }
  };
} else {
  // Create a real Supabase client when environment variables are available
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

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
