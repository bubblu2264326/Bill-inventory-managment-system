import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jiabrrbqhlfvahefgsur.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppYWJycmJxaGxmdmFoZWZnc3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5ODU0NDIsImV4cCI6MjA0NzU2MTQ0Mn0.hFpbCMw2CR533Ysn70VS4FZRJb_ZtA1dUe4lVPVQgA0';

export const supabase = createClient(supabaseUrl, supabaseKey);