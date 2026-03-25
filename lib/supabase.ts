import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zgstzbthnzrygxgaleqm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnc3R6YnRobnpyeWd4Z2FsZXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNDAwOTUsImV4cCI6MjA4OTYxNjA5NX0.VuPCZvb44xx1BtkQYCZqmEMy1WNfnAKf8QPhMLsjWBQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)