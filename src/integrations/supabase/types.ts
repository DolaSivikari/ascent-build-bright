export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_address: string | null
          message: string
          name: string
          phone: string | null
          subject: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          message: string
          name: string
          phone?: string | null
          subject?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          message?: string
          name?: string
          phone?: string | null
          subject?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      estimate_requests: {
        Row: {
          address: string | null
          color_consultation: boolean | null
          created_at: string
          email: string
          estimate_max: number | null
          estimate_min: number | null
          finish_quality: string
          id: string
          ip_address: string | null
          name: string
          notes: string | null
          phone: string
          preferred_contact: string | null
          prep_complexity: string
          region: string
          rush_scheduling: boolean | null
          scaffolding: string | null
          service: string
          site_cleanup: boolean | null
          sqft: number
          stories: string
          user_agent: string | null
          warranty_extension: boolean | null
        }
        Insert: {
          address?: string | null
          color_consultation?: boolean | null
          created_at?: string
          email: string
          estimate_max?: number | null
          estimate_min?: number | null
          finish_quality: string
          id?: string
          ip_address?: string | null
          name: string
          notes?: string | null
          phone: string
          preferred_contact?: string | null
          prep_complexity: string
          region: string
          rush_scheduling?: boolean | null
          scaffolding?: string | null
          service: string
          site_cleanup?: boolean | null
          sqft: number
          stories: string
          user_agent?: string | null
          warranty_extension?: boolean | null
        }
        Update: {
          address?: string | null
          color_consultation?: boolean | null
          created_at?: string
          email?: string
          estimate_max?: number | null
          estimate_min?: number | null
          finish_quality?: string
          id?: string
          ip_address?: string | null
          name?: string
          notes?: string | null
          phone?: string
          preferred_contact?: string | null
          prep_complexity?: string
          region?: string
          rush_scheduling?: boolean | null
          scaffolding?: string | null
          service?: string
          site_cleanup?: boolean | null
          sqft?: number
          stories?: string
          user_agent?: string | null
          warranty_extension?: boolean | null
        }
        Relationships: []
      }
      form_rate_limits: {
        Row: {
          form_type: string
          id: string
          ip_address: string
          last_submission: string
          submission_count: number
          window_start: string
        }
        Insert: {
          form_type: string
          id?: string
          ip_address: string
          last_submission?: string
          submission_count?: number
          window_start?: string
        }
        Update: {
          form_type?: string
          id?: string
          ip_address?: string
          last_submission?: string
          submission_count?: number
          window_start?: string
        }
        Relationships: []
      }
      material_packages: {
        Row: {
          climate_tags: string[] | null
          created_at: string
          id: string
          notes: string | null
          package_name: string | null
          project_type: string
          selected_materials: string[] | null
          substrate: string
          user_id: string | null
          user_identifier: string
          user_weights: Json | null
        }
        Insert: {
          climate_tags?: string[] | null
          created_at?: string
          id?: string
          notes?: string | null
          package_name?: string | null
          project_type: string
          selected_materials?: string[] | null
          substrate: string
          user_id?: string | null
          user_identifier: string
          user_weights?: Json | null
        }
        Update: {
          climate_tags?: string[] | null
          created_at?: string
          id?: string
          notes?: string | null
          package_name?: string | null
          project_type?: string
          selected_materials?: string[] | null
          substrate?: string
          user_id?: string | null
          user_identifier?: string
          user_weights?: Json | null
        }
        Relationships: []
      }
      materials: {
        Row: {
          brand: string
          category: string
          cost_index: number
          created_at: string
          datasheet_url: string | null
          durability_years: number
          finish_options: string[] | null
          id: string
          images: string[] | null
          is_active: boolean | null
          maintenance_level: string
          moisture_resistance: string | null
          r_value: number | null
          recycled_content_pct: number | null
          salt_tolerance: string | null
          suitable_substrates: string[]
          tags: string[] | null
          title: string
          updated_at: string
          uv_resistance: string | null
          voc_level: string | null
          warranty_years: number | null
        }
        Insert: {
          brand: string
          category: string
          cost_index: number
          created_at?: string
          datasheet_url?: string | null
          durability_years: number
          finish_options?: string[] | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          maintenance_level: string
          moisture_resistance?: string | null
          r_value?: number | null
          recycled_content_pct?: number | null
          salt_tolerance?: string | null
          suitable_substrates?: string[]
          tags?: string[] | null
          title: string
          updated_at?: string
          uv_resistance?: string | null
          voc_level?: string | null
          warranty_years?: number | null
        }
        Update: {
          brand?: string
          category?: string
          cost_index?: number
          created_at?: string
          datasheet_url?: string | null
          durability_years?: number
          finish_options?: string[] | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          maintenance_level?: string
          moisture_resistance?: string | null
          r_value?: number | null
          recycled_content_pct?: number | null
          salt_tolerance?: string | null
          suitable_substrates?: string[]
          tags?: string[] | null
          title?: string
          updated_at?: string
          uv_resistance?: string | null
          voc_level?: string | null
          warranty_years?: number | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
          unsubscribe_token: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribe_token?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribe_token?: string | null
        }
        Relationships: []
      }
      password_reset_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          token_hash: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          token_hash: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          token_hash?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      admin_users_view: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string | null
          roles: Database["public"]["Enums"]["app_role"][] | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      can_access_admin_view: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      create_admin_user: {
        Args: {
          admin_email: string
          admin_name?: string
          admin_password: string
        }
        Returns: Json
      }
      get_admin_users: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string | null
          roles: Database["public"]["Enums"]["app_role"][] | null
          updated_at: string | null
        }[]
      }
      get_dashboard_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      grant_admin_role: {
        Args: { user_email: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
    },
  },
} as const
