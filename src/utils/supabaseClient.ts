import { createClient, User } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing API keys for Supabase')
}

export interface MessageObject {
  class: number,
  content: string,
  created_at: string,
  id: number,
  is_reaction: boolean,
  user: string | UserObject,
}

export interface PayloadObject {
  commit_timestamp: string,
  eventType: string,
  new: MessageObject,
  old: MessageObject,
  schema: String,
  table: String
}

export interface UserObject {
  id: string,
  name: string,
  pronouns: string
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey)