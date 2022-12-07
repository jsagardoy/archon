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
          description: string | null
          date: string | null
          hour: string | null
          number_of_rounds: string | null
          max_num_of_players: string | null
          active: boolean | null
          details: string | null
          price: string | null
          city: string | null
          country: string | null
          currency: string | null
          state: string | null
          address: string | null
          players: any[] | null
          user_id: string
        }
        Insert: {
          id: string
          name: string | null
          description: string | null
          date: string | null
          hour: string | null
          number_of_rounds: string | null
          max_num_of_players: string | null
          active: boolean | null
          details: string | null
          price: string | null
          city: string | null
          country: string | null
          currency: string | null
          state: string | null
          address: string | null
          players: any[] | null
          user_id: string
        }
        Update: {
          id?: string
          name?: string | null
          description?: string | null
          date?: string | null
          hour?: string | null
          number_of_rounds?: string | null
          max_num_of_players?: string | null
          active?: boolean | null
          details?: string | null
          price?: string | null
          city?: string | null
          country?: string | null
          currency?: string | null
          state?: string | null
          address?: string | null
          players?: any[] | null
          user_id?: string
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
  description: string | null
  date: string | null
  hour: string | null
  number_of_rounds: string | null
  max_num_of_players: string | null
  active: boolean | null
  details: string | null
  price: string | null
  city: string | null
  country: string | null
  address: string | null
  state: string | null
  currency: string | null
  user_id: string
  players: any[] | null //TODO: relacionarlo con la tabla correspondiente
}
export type PlayerType = {
  id?: string
  id_tournament: string | null
  ranking: number | null
  userId: string | null
}
