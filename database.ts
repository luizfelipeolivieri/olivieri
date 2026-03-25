// Gerado automaticamente — atualize rodando:
// npx supabase gen types typescript --project-id SEU_PROJECT_ID > src/types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'student' | 'teacher'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'student' | 'teacher'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'student' | 'teacher'
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          thumbnail_url: string | null
          instructor_id: string | null
          duration_months: number | null
          price_monthly: number | null
          status: 'active' | 'draft' | 'archived'
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          thumbnail_url?: string | null
          instructor_id?: string | null
          duration_months?: number | null
          price_monthly?: number | null
          status?: 'active' | 'draft' | 'archived'
          created_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          thumbnail_url?: string | null
          instructor_id?: string | null
          duration_months?: number | null
          price_monthly?: number | null
          status?: 'active' | 'draft' | 'archived'
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          progress: number
          enrolled_at: string
          status: 'active' | 'completed' | 'cancelled'
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          progress?: number
          enrolled_at?: string
          status?: 'active' | 'completed' | 'cancelled'
        }
        Update: {
          progress?: number
          status?: 'active' | 'completed' | 'cancelled'
        }
      }
      classes: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          video_url: string | null
          duration_minutes: number | null
          order_index: number
          module_number: number
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          video_url?: string | null
          duration_minutes?: number | null
          order_index: number
          module_number?: number
          created_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          video_url?: string | null
          duration_minutes?: number | null
          order_index?: number
          module_number?: number
        }
      }
      class_progress: {
        Row: {
          id: string
          user_id: string
          class_id: string
          completed: boolean
          watched_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          class_id: string
          completed?: boolean
          watched_at?: string | null
        }
        Update: {
          completed?: boolean
          watched_at?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          amount: number
          status: 'paid' | 'pending' | 'overdue' | 'cancelled'
          due_date: string
          paid_at: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          amount: number
          status?: 'paid' | 'pending' | 'overdue' | 'cancelled'
          due_date: string
          paid_at?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          amount?: number
          status?: 'paid' | 'pending' | 'overdue' | 'cancelled'
          paid_at?: string | null
        }
      }
      exams: {
        Row: {
          id: string
          course_id: string
          title: string
          due_date: string | null
          status: 'open' | 'closed'
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          due_date?: string | null
          status?: 'open' | 'closed'
          created_at?: string
        }
        Update: {
          title?: string
          due_date?: string | null
          status?: 'open' | 'closed'
        }
      }
      exam_results: {
        Row: {
          id: string
          user_id: string
          exam_id: string
          score: number | null
          status: 'pending' | 'submitted' | 'graded'
          submitted_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          exam_id: string
          score?: number | null
          status?: 'pending' | 'submitted' | 'graded'
          submitted_at?: string | null
        }
        Update: {
          score?: number | null
          status?: 'pending' | 'submitted' | 'graded'
          submitted_at?: string | null
        }
      }
      ebooks: {
        Row: {
          id: string
          course_id: string | null
          title: string
          author: string | null
          file_url: string
          file_size_mb: number | null
          pages: number | null
          created_at: string
        }
        Insert: {
          id?: string
          course_id?: string | null
          title: string
          author?: string | null
          file_url: string
          file_size_mb?: number | null
          pages?: number | null
          created_at?: string
        }
        Update: {
          title?: string
          author?: string | null
          file_url?: string
          file_size_mb?: number | null
          pages?: number | null
        }
      }
      referrals: {
        Row: {
          id: string
          referrer_id: string
          referred_email: string
          code: string
          status: 'pending' | 'converted'
          discount_amount: number
          created_at: string
        }
        Insert: {
          id?: string
          referrer_id: string
          referred_email: string
          code: string
          status?: 'pending' | 'converted'
          discount_amount?: number
          created_at?: string
        }
        Update: {
          status?: 'pending' | 'converted'
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
