import { createClient } from "@supabase/supabase-js";

// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

export const supabase = createClient(
  "https://qjdeieadjiyilijbqqrm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZGVpZWFkaml5aWxpamJxcXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NjI5MzEsImV4cCI6MjAyMzMzODkzMX0.7-egYKLrWb7qJ8fLOauwfRCW1yXUqZ1jMjBk5H-LRuc"
);

export const supabaseAdmin = createClient(
  "https://qjdeieadjiyilijbqqrm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZGVpZWFkaml5aWxpamJxcXJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzc2MjkzMSwiZXhwIjoyMDIzMzM4OTMxfQ.QX-yhWnNMuIVqrvRncaxwl2BgIdNWIITsJQIvU7JCJ4"!
);
