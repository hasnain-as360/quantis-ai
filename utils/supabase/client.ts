import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const getEnv = (key: string, viteKey: string) => {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[viteKey]) {
      return import.meta.env[viteKey];
    }
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
    return '';
  };

  const supabaseUrl =
    getEnv('NEXT_PUBLIC_SUPABASE_URL', 'VITE_SUPABASE_URL') ||
    'https://hlvvdqrhevuogxwlppmh.supabase.co';

  const supabaseAnonKey =
    getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY') ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsdnZkcXJoZXZ1b2d4d2xwcG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4MDYxMzMsImV4cCI6MjEwNzM4MjEzM30.EcY8Goe8vQ1z6pdCKm0d4rw2GHxW6zMPOAkqgDrgThk';

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
