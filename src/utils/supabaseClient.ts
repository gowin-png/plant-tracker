
import { createClient } from '@supabase/supabase-js';
import { User as AuthUser } from '@supabase/supabase-js';
import { User } from '@/types';

// Supabase configuration
const supabaseUrl = 'https://ufucwpfuwghsshzknxha.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmdWN3cGZ1d2doc3NoemtueGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0ODYxNjksImV4cCI6MjA1OTA2MjE2OX0.7I2gi_pxYvH96m4Ij_2CBTgxiJwq2fHgfygcg2-bSQY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to convert Supabase User to our User type
export const mapUser = (user: AuthUser): User => {
  return {
    id: user.id,
    name: user.user_metadata?.name || 'User',
    email: user.email || '',
    avatar: user.user_metadata?.avatar_url,
  };
};
