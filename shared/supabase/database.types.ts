export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  dev: {
    Tables: {
      backend_event_logs: {
        Row: {
          created_at: string
          created_commit_id: string
          error_level:
            | Database["dev"]["Enums"]["backend_event_logs_error_level"]
            | null
          event_name: string | null
          function_name: string | null
          id: string
          payload: Json | null
          request_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          created_commit_id: string
          error_level?:
            | Database["dev"]["Enums"]["backend_event_logs_error_level"]
            | null
          event_name?: string | null
          function_name?: string | null
          id: string
          payload?: Json | null
          request_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          created_commit_id?: string
          error_level?:
            | Database["dev"]["Enums"]["backend_event_logs_error_level"]
            | null
          event_name?: string | null
          function_name?: string | null
          id?: string
          payload?: Json | null
          request_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ext_spots: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_recommendable: boolean
          landmark_latitude: number
          landmark_longitude: number
          lock_no: number
          source_type: Database["dev"]["Enums"]["ext_spots_source_type"]
          title: string
        }
        Insert: {
          created_at?: string
          id: string
          image_url: string
          is_recommendable: boolean
          landmark_latitude: number
          landmark_longitude: number
          lock_no?: number
          source_type: Database["dev"]["Enums"]["ext_spots_source_type"]
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_recommendable?: boolean
          landmark_latitude?: number
          landmark_longitude?: number
          lock_no?: number
          source_type?: Database["dev"]["Enums"]["ext_spots_source_type"]
          title?: string
        }
        Relationships: []
      }
      external_api_logs: {
        Row: {
          api_name: string | null
          created_at: string
          created_commit_id: string
          endpoint: string | null
          error_message: string | null
          function_name: string | null
          id: string
          request_id: string | null
          request_payload: Json | null
          response_payload: Json | null
          response_time_ms: number | null
          status_code: number | null
          user_id: string | null
        }
        Insert: {
          api_name?: string | null
          created_at?: string
          created_commit_id: string
          endpoint?: string | null
          error_message?: string | null
          function_name?: string | null
          id: string
          request_id?: string | null
          request_payload?: Json | null
          response_payload?: Json | null
          response_time_ms?: number | null
          status_code?: number | null
          user_id?: string | null
        }
        Update: {
          api_name?: string | null
          created_at?: string
          created_commit_id?: string
          endpoint?: string | null
          error_message?: string | null
          function_name?: string | null
          id?: string
          request_id?: string | null
          request_payload?: Json | null
          response_payload?: Json | null
          response_time_ms?: number | null
          status_code?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      frontend_event_logs: {
        Row: {
          created_app_version: string
          created_at: string
          created_commit_id: string
          error_level:
            | Database["dev"]["Enums"]["frontend_event_logs_error_level"]
            | null
          event_name: string | null
          id: string
          path_name: string | null
          payload: string | null
          user_id: string | null
        }
        Insert: {
          created_app_version: string
          created_at?: string
          created_commit_id: string
          error_level?:
            | Database["dev"]["Enums"]["frontend_event_logs_error_level"]
            | null
          event_name?: string | null
          id: string
          path_name?: string | null
          payload?: string | null
          user_id?: string | null
        }
        Update: {
          created_app_version?: string
          created_at?: string
          created_commit_id?: string
          error_level?:
            | Database["dev"]["Enums"]["frontend_event_logs_error_level"]
            | null
          event_name?: string | null
          id?: string
          path_name?: string | null
          payload?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      spot_guides: {
        Row: {
          audio_storage_path: string
          created_at: string
          created_by: string
          created_request_id: string
          currency: string
          id: string
          language_tag: string
          lock_no: number
          manuscript: string
          max_version_major: number
          min_version_major: number
          price_amount: number
          recommendation_weight: number
          spot_id: string
          tags: string[]
          title: string
          voice_type: Database["dev"]["Enums"]["spot_guides_voice_type"]
        }
        Insert: {
          audio_storage_path: string
          created_at?: string
          created_by: string
          created_request_id: string
          currency: string
          id: string
          language_tag: string
          lock_no?: number
          manuscript: string
          max_version_major: number
          min_version_major: number
          price_amount: number
          recommendation_weight: number
          spot_id: string
          tags: string[]
          title: string
          voice_type: Database["dev"]["Enums"]["spot_guides_voice_type"]
        }
        Update: {
          audio_storage_path?: string
          created_at?: string
          created_by?: string
          created_request_id?: string
          currency?: string
          id?: string
          language_tag?: string
          lock_no?: number
          manuscript?: string
          max_version_major?: number
          min_version_major?: number
          price_amount?: number
          recommendation_weight?: number
          spot_id?: string
          tags?: string[]
          title?: string
          voice_type?: Database["dev"]["Enums"]["spot_guides_voice_type"]
        }
        Relationships: [
          {
            foreignKeyName: "spot_guides_spot_id_fkey"
            columns: ["spot_id"]
            isOneToOne: false
            referencedRelation: "ext_spots"
            referencedColumns: ["id"]
          },
        ]
      }
      spot_visits: {
        Row: {
          created_at: string
          id: string
          lock_no: number
          max_version_major: number
          min_version_major: number
          prev_spot_id: string | null
          represent_guide_id: string
          spot_id: string
          taken_photo_storage_path: string | null
          time_gap_minutes: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id: string
          lock_no?: number
          max_version_major: number
          min_version_major: number
          prev_spot_id?: string | null
          represent_guide_id: string
          spot_id: string
          taken_photo_storage_path?: string | null
          time_gap_minutes: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          lock_no?: number
          max_version_major?: number
          min_version_major?: number
          prev_spot_id?: string | null
          represent_guide_id?: string
          spot_id?: string
          taken_photo_storage_path?: string | null
          time_gap_minutes?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spot_visits_prev_spot_id_fkey"
            columns: ["prev_spot_id"]
            isOneToOne: false
            referencedRelation: "ext_spots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spot_visits_represent_guide_id_fkey"
            columns: ["represent_guide_id"]
            isOneToOne: false
            referencedRelation: "spot_guides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spot_visits_spot_id_fkey"
            columns: ["spot_id"]
            isOneToOne: false
            referencedRelation: "ext_spots"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      backend_event_logs_error_level:
        | "trace"
        | "debug"
        | "info"
        | "warn"
        | "error"
      ext_spots_source_type: "LANDMARK_DETECTION" | "WEB_DETECTION"
      frontend_event_logs_error_level:
        | "trace"
        | "debug"
        | "info"
        | "warn"
        | "error"
      spot_guides_voice_type:
        | "SSML_VOICE_GENDER_UNSPECIFIED"
        | "MALE"
        | "FEMALE"
        | "NEUTRAL"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  dev: {
    Enums: {
      backend_event_logs_error_level: [
        "trace",
        "debug",
        "info",
        "warn",
        "error",
      ],
      ext_spots_source_type: ["LANDMARK_DETECTION", "WEB_DETECTION"],
      frontend_event_logs_error_level: [
        "trace",
        "debug",
        "info",
        "warn",
        "error",
      ],
      spot_guides_voice_type: [
        "SSML_VOICE_GENDER_UNSPECIFIED",
        "MALE",
        "FEMALE",
        "NEUTRAL",
      ],
    },
  },
} as const
