export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          vken: string | null
          rol: string | null
        }
        Insert: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          vken: string | null
          rol: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          vken?: string | null
          rol?: string | null
        }
      }
      tournament: {
        Row: {
          id: string
          name: string | null
          date: string | null
          full_name: string | null
          hour: string | null
          number_of_rounds: string | null
          max_numb_of_players: string | null
          active: boolean | null
          details: string | null
          price: number | null
          city: string | null
          country: string | null
          address: string | null
          players: any[] | null 
        }
        Insert: {
          id: string
          name: string | null
          date: string | null
          full_name: string | null
          hour: string | null
          number_of_rounds: string | null
          max_numb_of_players: string | null
          active: boolean | null
          details: string | null
          price: number | null
          city: string | null
          country: string | null
          address: string | null
          players: any[] | null 
        }
        Update: {
          id?: string
          name?: string | null
          date?: string | null
          full_name?: string | null
          hour?: string | null
          number_of_rounds?: string | null
          max_numb_of_players?: string | null
          active?: boolean | null
          details?: string | null
          price?: number | null
          city?: string | null
          country?: string | null
          address ?: string | null
          players?: any[] | null 
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
export type TournamentType = {
  id: string
  name: string | null
  date: string | null
  full_name: string | null
  hour: string | null
  number_of_rounds: string | null
  max_numb_of_players: string | null
  active: boolean | null
  details: string | null
  price: number | null
  city: string | null
  country: string | null
  address: string | null
  players: any[] | null //TODO: relacionarlo con la tabla correspondiente
}
