import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mxaaqrclbxmpgvpxnjfc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14YWFxcmNsYnhtcGd2cHhuamZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MTkxMzAsImV4cCI6MjA3MjM5NTEzMH0.muODsjkdnhyDGZch0MbyHsJvtZXTuFxfS4Vc5mpD1VY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)