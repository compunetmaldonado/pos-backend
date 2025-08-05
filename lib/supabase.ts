import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wkhgjnfpjncztbqgeafh.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndraGdqbmZwam5jenRicWdlYWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjUzNzQsImV4cCI6MjA2OTgwMTM3NH0.CA5Tt0LlmGxojCBLxBBDzJk7FeINSOWBa38WrEaRi9c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface Database {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          email: string
          nombre: string
          rol: 'admin' | 'vendedor' | 'taller' | 'usuario'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          nombre: string
          rol?: 'admin' | 'vendedor' | 'taller' | 'usuario'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          nombre?: string
          rol?: 'admin' | 'vendedor' | 'taller' | 'usuario'
          created_at?: string
        }
      }
      categorias: {
        Row: {
          id: string
          nombre: string
          descripcion: string | null
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          descripcion?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          descripcion?: string | null
          created_at?: string
        }
      }
      articulos: {
        Row: {
          id: string
          nombre: string
          sku: string
          descripcion: string | null
          precio: number
          costo: number
          stock: number
          categoria_id: string
          proveedor: string | null
          imagen_url: string | null
          estado: 'activo' | 'inactivo'
          usuario_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nombre: string
          sku: string
          descripcion?: string | null
          precio: number
          costo: number
          stock: number
          categoria_id: string
          proveedor?: string | null
          imagen_url?: string | null
          estado?: 'activo' | 'inactivo'
          usuario_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          sku?: string
          descripcion?: string | null
          precio?: number
          costo?: number
          stock?: number
          categoria_id?: string
          proveedor?: string | null
          imagen_url?: string | null
          estado?: 'activo' | 'inactivo'
          usuario_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      clientes: {
        Row: {
          id: string
          nombre: string
          email: string | null
          telefono: string | null
          direccion: string | null
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          email?: string | null
          telefono?: string | null
          direccion?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          email?: string | null
          telefono?: string | null
          direccion?: string | null
          created_at?: string
        }
      }
      tickets: {
        Row: {
          id: string
          cliente_id: string
          equipo: string
          problema: string
          estado: 'pendiente' | 'en_reparacion' | 'completado' | 'cancelado'
          tecnico_id: string | null
          fecha_ingreso: string
          fecha_estimada: string | null
          fecha_completado: string | null
          costo_estimado: number | null
          costo_final: number | null
          notas: string | null
          created_at: string
        }
        Insert: {
          id?: string
          cliente_id: string
          equipo: string
          problema: string
          estado?: 'pendiente' | 'en_reparacion' | 'completado' | 'cancelado'
          tecnico_id?: string | null
          fecha_ingreso?: string
          fecha_estimada?: string | null
          fecha_completado?: string | null
          costo_estimado?: number | null
          costo_final?: number | null
          notas?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          cliente_id?: string
          equipo?: string
          problema?: string
          estado?: 'pendiente' | 'en_reparacion' | 'completado' | 'cancelado'
          tecnico_id?: string | null
          fecha_ingreso?: string
          fecha_estimada?: string | null
          fecha_completado?: string | null
          costo_estimado?: number | null
          costo_final?: number | null
          notas?: string | null
          created_at?: string
        }
      }
      ventas: {
        Row: {
          id: string
          cliente_id: string | null
          usuario_id: string
          total: number
          metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia'
          estado: 'completada' | 'cancelada' | 'pendiente'
          fecha: string
          created_at: string
        }
        Insert: {
          id?: string
          cliente_id?: string | null
          usuario_id: string
          total: number
          metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia'
          estado?: 'completada' | 'cancelada' | 'pendiente'
          fecha?: string
          created_at?: string
        }
        Update: {
          id?: string
          cliente_id?: string | null
          usuario_id?: string
          total?: number
          metodo_pago?: 'efectivo' | 'tarjeta' | 'transferencia'
          estado?: 'completada' | 'cancelada' | 'pendiente'
          fecha?: string
          created_at?: string
        }
      }
      items_venta: {
        Row: {
          id: string
          venta_id: string
          articulo_id: string
          cantidad: number
          precio_unitario: number
          subtotal: number
          created_at: string
        }
        Insert: {
          id?: string
          venta_id: string
          articulo_id: string
          cantidad: number
          precio_unitario: number
          subtotal: number
          created_at?: string
        }
        Update: {
          id?: string
          venta_id?: string
          articulo_id?: string
          cantidad?: number
          precio_unitario?: number
          subtotal?: number
          created_at?: string
        }
      }
    }
  }
}

// Tipos exportados para usar en componentes
export type Usuario = Database['public']['Tables']['usuarios']['Row']
export type Categoria = Database['public']['Tables']['categorias']['Row']
export type Articulo = Database['public']['Tables']['articulos']['Row']
export type Cliente = Database['public']['Tables']['clientes']['Row']
export type Ticket = Database['public']['Tables']['tickets']['Row']
export type Venta = Database['public']['Tables']['ventas']['Row']
export type ItemVenta = Database['public']['Tables']['items_venta']['Row'] 