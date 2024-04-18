import { createClient } from './node_modules/@supabase/supabase-js'; // Use the correct relative path to the Supabase JS file

// Your Supabase URL and Key
const SupabaseUrl = 'https://xjmheuyoyvjlgfpfwdqs.supabase.co';
const SupabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWhldXlveXZqbGdmcGZ3ZHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTIwMzgsImV4cCI6MjAyODQyODAzOH0.8EcuwtTxa14bvPlVBlW_cseIKi40jaBhp90OKT9P9kc';

// Supabase client options
const options = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
};

// Create Supabase client instance
const supabase = createClient(SupabaseUrl, SupabaseKey, options);