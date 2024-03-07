export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agenda: {
        Row: {
          agree_comment: string | null
          agree_words: number
          bucket_address: string[] | null
          content: string[] | null
          content_detail: string | null
          created_at: string
          creator: string | null
          disagree_comment: string | null
          disagree_words: number
          id: string
          image_url: string | null
          likes: number
          participants: number
          participants_id: string[] | null
          subject: string | null
          tags: string[] | null
          title: string | null
          views: number
        }
        Insert: {
          agree_comment?: string | null
          agree_words?: number
          bucket_address?: string[] | null
          content?: string[] | null
          content_detail?: string | null
          created_at?: string
          creator?: string | null
          disagree_comment?: string | null
          disagree_words?: number
          id?: string
          image_url?: string | null
          likes?: number
          participants?: number
          participants_id?: string[] | null
          subject?: string | null
          tags?: string[] | null
          title?: string | null
          views?: number
        }
        Update: {
          agree_comment?: string | null
          agree_words?: number
          bucket_address?: string[] | null
          content?: string[] | null
          content_detail?: string | null
          created_at?: string
          creator?: string | null
          disagree_comment?: string | null
          disagree_words?: number
          id?: string
          image_url?: string | null
          likes?: number
          participants?: number
          participants_id?: string[] | null
          subject?: string | null
          tags?: string[] | null
          title?: string | null
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_agenda_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["address"]
          }
        ]
      }
      agenda_requested: {
        Row: {
          agree_comment: string
          content: string[]
          content_detail: string | null
          created_at: string
          creator: string
          disagree_comment: string
          id: string
          image_url: string
          tags: string[] | null
          title: string
          vote: number
        }
        Insert: {
          agree_comment: string
          content: string[]
          content_detail?: string | null
          created_at?: string
          creator: string
          disagree_comment: string
          id?: string
          image_url: string
          tags?: string[] | null
          title: string
          vote?: number
        }
        Update: {
          agree_comment?: string
          content?: string[]
          content_detail?: string | null
          created_at?: string
          creator?: string
          disagree_comment?: string
          id?: string
          image_url?: string
          tags?: string[] | null
          title?: string
          vote?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_agenda_requested_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["address"]
          }
        ]
      }
      opinion_agree: {
        Row: {
          agenda_id: string
          conversation: string[]
          created_at: string
          creator: string
          id: number
        }
        Insert: {
          agenda_id: string
          conversation: string[]
          created_at?: string
          creator: string
          id?: number
        }
        Update: {
          agenda_id?: string
          conversation?: string[]
          created_at?: string
          creator?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_opinion_agree_agenda_id_fkey"
            columns: ["agenda_id"]
            isOneToOne: false
            referencedRelation: "agenda"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_opinion_agree_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["address"]
          }
        ]
      }
      opinion_disagree: {
        Row: {
          agenda_id: string
          conversation: string[]
          created_at: string
          creator: string
          id: number
        }
        Insert: {
          agenda_id: string
          conversation: string[]
          created_at?: string
          creator: string
          id?: number
        }
        Update: {
          agenda_id?: string
          conversation?: string[]
          created_at?: string
          creator?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_opinion_disagree_agenda_id_fkey"
            columns: ["agenda_id"]
            isOneToOne: false
            referencedRelation: "agenda"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_opinion_disagree_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["address"]
          }
        ]
      }
      profiles: {
        Row: {
          address: string
          coin: number | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          image_url: string
          likes_list: string[] | null
          token: number | null
        }
        Insert: {
          address: string
          coin?: number | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          image_url?: string
          likes_list?: string[] | null
          token?: number | null
        }
        Update: {
          address?: string
          coin?: number | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          image_url?: string
          likes_list?: string[] | null
          token?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      find_or_create_address: {
        Args: {
          new_address: string
        }
        Returns: {
          address: string
        }[]
      }
      get_create_profile: {
        Args: {
          new_address: string
        }
        Returns: {
          id: number
          address: string
        }[]
      }
      increment: {
        Args: {
          agenda_id: string
        }
        Returns: undefined
      }
      increment_views: {
        Args: {
          agenda_id: string
        }
        Returns: undefined
      }
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      update_likes: {
        Args: {
          agenda_id: string
          new_likes_list: string[]
          user_id: string
          plus_check: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
