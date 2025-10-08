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
      article_versions: {
        Row: {
          article_id: string
          body: string
          change_summary: string | null
          changed_by: string | null
          created_at: string
          excerpt: string | null
          id: string
          snapshot: Json | null
          title: string
          version_number: number
        }
        Insert: {
          article_id: string
          body: string
          change_summary?: string | null
          changed_by?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          snapshot?: Json | null
          title: string
          version_number: number
        }
        Update: {
          article_id?: string
          body?: string
          change_summary?: string | null
          changed_by?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          snapshot?: Json | null
          title?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "article_versions_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_versions_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_id: string | null
          body: string
          category: string | null
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          body: string
          category?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          body?: string
          category?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
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
      blog_posts: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured: boolean | null
          featured_image_url: string | null
          id: string
          published_at: string | null
          read_time: number | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          read_time?: number | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          read_time?: number | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      case_studies: {
        Row: {
          after_image_url: string | null
          before_image_url: string | null
          budget_range: string | null
          challenge: string
          client_name: string | null
          created_at: string
          duration_months: number | null
          featured: boolean | null
          featured_image_url: string | null
          gallery_urls: string[] | null
          id: string
          location: string | null
          materials_used: string[] | null
          project_type: string
          published_at: string | null
          results: string
          sector: string | null
          services_provided: string[] | null
          slug: string
          solution: string
          square_footage: number | null
          status: string
          technologies_used: string[] | null
          testimonial_author: string | null
          testimonial_role: string | null
          testimonial_text: string | null
          title: string
          updated_at: string
          year: number | null
        }
        Insert: {
          after_image_url?: string | null
          before_image_url?: string | null
          budget_range?: string | null
          challenge: string
          client_name?: string | null
          created_at?: string
          duration_months?: number | null
          featured?: boolean | null
          featured_image_url?: string | null
          gallery_urls?: string[] | null
          id?: string
          location?: string | null
          materials_used?: string[] | null
          project_type: string
          published_at?: string | null
          results: string
          sector?: string | null
          services_provided?: string[] | null
          slug: string
          solution: string
          square_footage?: number | null
          status?: string
          technologies_used?: string[] | null
          testimonial_author?: string | null
          testimonial_role?: string | null
          testimonial_text?: string | null
          title: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          after_image_url?: string | null
          before_image_url?: string | null
          budget_range?: string | null
          challenge?: string
          client_name?: string | null
          created_at?: string
          duration_months?: number | null
          featured?: boolean | null
          featured_image_url?: string | null
          gallery_urls?: string[] | null
          id?: string
          location?: string | null
          materials_used?: string[] | null
          project_type?: string
          published_at?: string | null
          results?: string
          sector?: string | null
          services_provided?: string[] | null
          slug?: string
          solution?: string
          square_footage?: number | null
          status?: string
          technologies_used?: string[] | null
          testimonial_author?: string | null
          testimonial_role?: string | null
          testimonial_text?: string | null
          title?: string
          updated_at?: string
          year?: number | null
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
      industry_insights: {
        Row: {
          author_id: string | null
          category: string
          content: string | null
          created_at: string
          download_count: number | null
          excerpt: string | null
          external_url: string | null
          featured: boolean | null
          id: string
          pdf_url: string | null
          published_at: string | null
          slug: string
          status: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          type: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content?: string | null
          created_at?: string
          download_count?: number | null
          excerpt?: string | null
          external_url?: string | null
          featured?: boolean | null
          id?: string
          pdf_url?: string | null
          published_at?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          type: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string | null
          created_at?: string
          download_count?: number | null
          excerpt?: string | null
          external_url?: string | null
          featured?: boolean | null
          id?: string
          pdf_url?: string | null
          published_at?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          type?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "industry_insights_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          benefits: string[] | null
          closes_at: string | null
          created_at: string
          department: string
          description: string
          employment_type: string
          experience_level: string
          id: string
          location: string
          posted_at: string | null
          requirements: string[] | null
          responsibilities: string[] | null
          salary_range: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          benefits?: string[] | null
          closes_at?: string | null
          created_at?: string
          department: string
          description: string
          employment_type: string
          experience_level: string
          id?: string
          location: string
          posted_at?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_range?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          benefits?: string[] | null
          closes_at?: string | null
          created_at?: string
          department?: string
          description?: string
          employment_type?: string
          experience_level?: string
          id?: string
          location?: string
          posted_at?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_range?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
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
          user_identifier: string | null
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
          user_identifier?: string | null
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
          user_identifier?: string | null
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
      media: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          file_size: number
          filename: string
          height: number | null
          id: string
          mime_type: string
          original_filename: string
          storage_path: string
          updated_at: string
          uploaded_by: string | null
          url: string
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          file_size: number
          filename: string
          height?: number | null
          id?: string
          mime_type: string
          original_filename: string
          storage_path: string
          updated_at?: string
          uploaded_by?: string | null
          url: string
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          file_size?: number
          filename?: string
          height?: number | null
          id?: string
          mime_type?: string
          original_filename?: string
          storage_path?: string
          updated_at?: string
          uploaded_by?: string | null
          url?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      projects: {
        Row: {
          after_image_url: string | null
          before_image_url: string | null
          budget_range: string | null
          category: string | null
          challenges: string | null
          client_name: string | null
          created_at: string
          description: string
          duration_months: number | null
          featured: boolean | null
          gallery: Json | null
          id: string
          images: Json | null
          location: string | null
          materials_used: string[] | null
          meta_description: string | null
          meta_title: string | null
          project_type: string | null
          results: string | null
          services_provided: string[] | null
          slug: string
          solutions: string | null
          square_footage: number | null
          status: string
          tags: string[] | null
          testimonial_author: string | null
          testimonial_text: string | null
          title: string
          updated_at: string
          year: number | null
        }
        Insert: {
          after_image_url?: string | null
          before_image_url?: string | null
          budget_range?: string | null
          category?: string | null
          challenges?: string | null
          client_name?: string | null
          created_at?: string
          description: string
          duration_months?: number | null
          featured?: boolean | null
          gallery?: Json | null
          id?: string
          images?: Json | null
          location?: string | null
          materials_used?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          project_type?: string | null
          results?: string | null
          services_provided?: string[] | null
          slug: string
          solutions?: string | null
          square_footage?: number | null
          status?: string
          tags?: string[] | null
          testimonial_author?: string | null
          testimonial_text?: string | null
          title: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          after_image_url?: string | null
          before_image_url?: string | null
          budget_range?: string | null
          category?: string | null
          challenges?: string | null
          client_name?: string | null
          created_at?: string
          description?: string
          duration_months?: number | null
          featured?: boolean | null
          gallery?: Json | null
          id?: string
          images?: Json | null
          location?: string | null
          materials_used?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          project_type?: string | null
          results?: string | null
          services_provided?: string[] | null
          slug?: string
          solutions?: string | null
          square_footage?: number | null
          status?: string
          tags?: string[] | null
          testimonial_author?: string | null
          testimonial_text?: string | null
          title?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      quote_submissions: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          ip_address: string | null
          message: string | null
          name: string
          package: string | null
          phone: string
          photo_urls: string[] | null
          source_variant: string | null
          user_agent: string | null
          utm: Json | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          ip_address?: string | null
          message?: string | null
          name: string
          package?: string | null
          phone: string
          photo_urls?: string[] | null
          source_variant?: string | null
          user_agent?: string | null
          utm?: Json | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          ip_address?: string | null
          message?: string | null
          name?: string
          package?: string | null
          phone?: string
          photo_urls?: string[] | null
          source_variant?: string | null
          user_agent?: string | null
          utm?: Json | null
        }
        Relationships: []
      }
      resume_submissions: {
        Row: {
          cover_letter: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          ip_address: string | null
          job_posting_id: string | null
          last_name: string
          linkedin_url: string | null
          notes: string | null
          phone: string | null
          portfolio_url: string | null
          resume_url: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          user_agent: string | null
          years_experience: number | null
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          ip_address?: string | null
          job_posting_id?: string | null
          last_name: string
          linkedin_url?: string | null
          notes?: string | null
          phone?: string | null
          portfolio_url?: string | null
          resume_url: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_agent?: string | null
          years_experience?: number | null
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          ip_address?: string | null
          job_posting_id?: string | null
          last_name?: string
          linkedin_url?: string | null
          notes?: string | null
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_agent?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_submissions_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resume_submissions_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_categories: {
        Row: {
          benefits: Json | null
          created_at: string
          cta_link: string | null
          cta_text: string | null
          description: string
          display_order: number | null
          faq: Json | null
          featured_image_url: string | null
          features: Json | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          overview: string | null
          pricing_info: string | null
          process_steps: Json | null
          related_case_studies: string[] | null
          related_services: string[] | null
          slug: string
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          benefits?: Json | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          description: string
          display_order?: number | null
          faq?: Json | null
          featured_image_url?: string | null
          features?: Json | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          overview?: string | null
          pricing_info?: string | null
          process_steps?: Json | null
          related_case_studies?: string[] | null
          related_services?: string[] | null
          slug: string
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          benefits?: Json | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          description?: string
          display_order?: number | null
          faq?: Json | null
          featured_image_url?: string | null
          features?: Json | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          overview?: string | null
          pricing_info?: string | null
          process_steps?: Json | null
          related_case_studies?: string[] | null
          related_services?: string[] | null
          slug?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          benefits: Json | null
          created_at: string
          cta_link: string | null
          cta_text: string | null
          description: string
          display_order: number | null
          faq: Json | null
          featured_image_url: string | null
          features: Json | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          meta_description: string | null
          meta_title: string | null
          overview: string | null
          pricing_info: string | null
          process_steps: Json | null
          related_projects: string[] | null
          related_services: string[] | null
          slug: string
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          benefits?: Json | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          description: string
          display_order?: number | null
          faq?: Json | null
          featured_image_url?: string | null
          features?: Json | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          overview?: string | null
          pricing_info?: string | null
          process_steps?: Json | null
          related_projects?: string[] | null
          related_services?: string[] | null
          slug: string
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          benefits?: Json | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          description?: string
          display_order?: number | null
          faq?: Json | null
          featured_image_url?: string | null
          features?: Json | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          overview?: string | null
          pricing_info?: string | null
          process_steps?: Json | null
          related_projects?: string[] | null
          related_services?: string[] | null
          slug?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
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
      [_ in never]: never
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
          created_at: string
          email: string
          full_name: string
          id: string
          roles: string[]
          updated_at: string
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
