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
          agree_words: number | null
          banner_url: string | null
          content: string[]
          content_detail: string | null
          created_at: string
          creator: string
          disagree_comment: string | null
          disagree_words: number | null
          id: string
          image_url: string
          likes: number | null
          participants: number | null
          participants_id: string[] | null
          subject: string
          tags: string[]
          title: string
          views: number | null
        }
        Insert: {
          agree_comment?: string | null
          agree_words?: number | null
          banner_url?: string | null
          content: string[]
          content_detail?: string | null
          created_at?: string
          creator: string
          disagree_comment?: string | null
          disagree_words?: number | null
          id?: string
          image_url: string
          likes?: number | null
          participants?: number | null
          participants_id?: string[] | null
          subject: string
          tags: string[]
          title: string
          views?: number | null
        }
        Update: {
          agree_comment?: string | null
          agree_words?: number | null
          banner_url?: string | null
          content?: string[]
          content_detail?: string | null
          created_at?: string
          creator?: string
          disagree_comment?: string | null
          disagree_words?: number | null
          id?: string
          image_url?: string
          likes?: number | null
          participants?: number | null
          participants_id?: string[] | null
          subject?: string
          tags?: string[]
          title?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agenda_owner_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      agenda_category: {
        Row: {
          banner_url: string | null
          content: string | null
          created_at: string
          icon_id: string
          id: number
          logo: string | null
          title: string
        }
        Insert: {
          banner_url?: string | null
          content?: string | null
          created_at?: string
          icon_id: string
          id?: number
          logo?: string | null
          title: string
        }
        Update: {
          banner_url?: string | null
          content?: string | null
          created_at?: string
          icon_id?: string
          id?: number
          logo?: string | null
          title?: string
        }
        Relationships: []
      }
      agenda_requested: {
        Row: {
          agree_comment: string | null
          content: string[]
          content_detail: string | null
          created_at: string
          creator: string
          disagree_comment: string | null
          id: number
          image_url: string
          tags: string[] | null
          title: string
        }
        Insert: {
          agree_comment?: string | null
          content: string[]
          content_detail?: string | null
          created_at?: string
          creator: string
          disagree_comment?: string | null
          id?: number
          image_url: string
          tags?: string[] | null
          title: string
        }
        Update: {
          agree_comment?: string | null
          content?: string[]
          content_detail?: string | null
          created_at?: string
          creator?: string
          disagree_comment?: string | null
          id?: number
          image_url?: string
          tags?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "agenda_requested_owner_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id: string
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      opinion_agree: {
        Row: {
          agenda_id: string | null
          ai: string | null
          created_at: string
          creator: string
          id: string
          user_1: string | null
          user_2: string | null
        }
        Insert: {
          agenda_id?: string | null
          ai?: string | null
          created_at?: string
          creator: string
          id?: string
          user_1?: string | null
          user_2?: string | null
        }
        Update: {
          agenda_id?: string | null
          ai?: string | null
          created_at?: string
          creator?: string
          id?: string
          user_1?: string | null
          user_2?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opinion_agree_agenda_id_agenda_id_fk"
            columns: ["agenda_id"]
            isOneToOne: false
            referencedRelation: "agenda"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opinion_agree_owner_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      opinion_disagree: {
        Row: {
          agenda_id: string | null
          ai: string | null
          created_at: string
          creator: string
          id: string
          user_1: string | null
          user_2: string | null
        }
        Insert: {
          agenda_id?: string | null
          ai?: string | null
          created_at?: string
          creator: string
          id?: string
          user_1?: string | null
          user_2?: string | null
        }
        Update: {
          agenda_id?: string | null
          ai?: string | null
          created_at?: string
          creator?: string
          id?: string
          user_1?: string | null
          user_2?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opinion_disagree_agenda_id_agenda_id_fk"
            columns: ["agenda_id"]
            isOneToOne: false
            referencedRelation: "agenda"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opinion_disagree_owner_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          age: number | null
          bio: string | null
          coin: number | null
          coupon: number | null
          created_at: string
          display_name: string | null
          email: string | null
          gender: string | null
          id: string
          image_url: string | null
          likes_list: string[] | null
          nick_name: string | null
          organization: string | null
          phone_number: string | null
          "sub-image_url": string | null
          token: number | null
        }
        Insert: {
          age?: number | null
          bio?: string | null
          coin?: number | null
          coupon?: number | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          gender?: string | null
          id: string
          image_url?: string | null
          likes_list?: string[] | null
          nick_name?: string | null
          organization?: string | null
          phone_number?: string | null
          "sub-image_url"?: string | null
          token?: number | null
        }
        Update: {
          age?: number | null
          bio?: string | null
          coin?: number | null
          coupon?: number | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          image_url?: string | null
          likes_list?: string[] | null
          nick_name?: string | null
          organization?: string | null
          phone_number?: string | null
          "sub-image_url"?: string | null
          token?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_new_table: {
        Args: {
          table_name: string
        }
        Returns: undefined
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      increment_views: {
        Args: {
          agenda_id: string
        }
        Returns: undefined
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: string
          filter?: Json
        }
        Returns: {
          id: string
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_documents_chatbots: {
        Args: {
          query_embedding: string
          filter?: Json
        }
        Returns: {
          id: string
          content: string
          metadata: Json
          similarity: number
        }[]
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
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      "agenda-category": "정치" | "사회" | "블록체인" | "AI" | "주식"
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
