export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          code: string;
          slug: string;
          title: string;
          purpose: "buy" | "rent";
          property_type: "house" | "condo" | "land" | "shophouse";
          province: string;
          district: string;
          subdistrict: string | null;
          location_text: string;
          address_text: string | null;
          price: number;
          land_area_sqw: number | null;
          usable_area_sqm: number | null;
          floor_count: number | null;
          bedrooms: number | null;
          bathrooms: number | null;
          parking: number | null;
          highlights: string[];
          short_description: string | null;
          full_description: string;
          map_url: string | null;
          line_message: string | null;
          is_featured: boolean;
          is_latest: boolean;
          status: "draft" | "published" | "sold" | "rented";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          slug: string;
          title: string;
          purpose: "buy" | "rent";
          property_type: "house" | "condo" | "land" | "shophouse";
          province: string;
          district: string;
          subdistrict?: string | null;
          location_text: string;
          address_text?: string | null;
          price: number;
          land_area_sqw?: number | null;
          usable_area_sqm?: number | null;
          floor_count?: number | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          parking?: number | null;
          highlights?: string[];
          short_description?: string | null;
          full_description: string;
          map_url?: string | null;
          line_message?: string | null;
          is_featured?: boolean;
          is_latest?: boolean;
          status?: "draft" | "published" | "sold" | "rented";
        };
        Update: Partial<Database["public"]["Tables"]["properties"]["Insert"]>;
        Relationships: [];
      };
      property_images: {
        Row: {
          id: string;
          property_id: string;
          image_url: string;
          sort_order: number;
          alt_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          image_url: string;
          sort_order?: number;
          alt_text?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["property_images"]["Insert"]>;
        Relationships: [];
      };
      inquiries: {
        Row: {
          id: string;
          inquiry_type: string;
          source_page: string | null;
          property_id: string | null;
          name: string;
          phone: string;
          email: string | null;
          line_id: string | null;
          message: string;
          payload: Json | null;
          status: "new" | "contacted" | "closed";
          created_at: string;
        };
        Insert: {
          id?: string;
          inquiry_type: string;
          source_page?: string | null;
          property_id?: string | null;
          name: string;
          phone: string;
          email?: string | null;
          line_id?: string | null;
          message: string;
          payload?: Json | null;
          status?: "new" | "contacted" | "closed";
        };
        Update: Partial<Database["public"]["Tables"]["inquiries"]["Insert"]>;
        Relationships: [];
      };
      articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string;
          cover_image_url: string | null;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          content: string;
          cover_image_url?: string | null;
          is_published?: boolean;
          published_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["articles"]["Insert"]>;
        Relationships: [];
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          sort_order?: number;
          is_published?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["faqs"]["Insert"]>;
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
        };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
        Relationships: [];
      };
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          role: "admin" | "editor";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role?: "admin" | "editor";
        };
        Update: Partial<Database["public"]["Tables"]["admin_users"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
