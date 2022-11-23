import { createClient } from '@supabase/supabase-js'

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseURL??'', supabaseKey??'')

/* import { Database } from './database.types'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

const supabaseClient = createBrowserSupabaseClient<Database>() */
