import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mqomhecazbpagsbfskzv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xb21oZWNhemJwYWdzYmZza3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2MDM5NjIsImV4cCI6MjA0MDE3OTk2Mn0.1zP8UxASY-wcTFtL8ln3jxzdnUsmn4L4DUQAq-edf2Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)