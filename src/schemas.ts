
import { z } from 'zod';

export const articuloSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  sku: z.string(),
  categoriaId: z.string(),
  precioVenta: z.number(),
  precioCosto: z.number(),
  stockActual: z.number(),
  imagenUrl: z.string().optional(),
});

export const categoriaSchema = z.object({
  nombre: z.string(),
});

export const clienteSchema = z.object({
  nombre: z.string(),
  telefono: z.string().optional(),
  email: z.string().email().optional(),
});

export const ticketSchema = z.object({
  clienteId: z.string(),
  dispositivo: z.string(),
  falla: z.string(),
  estado: z.enum(['PENDIENTE', 'EN_PROCESO', 'FINALIZADO', 'ENTREGADO']).optional(),
  notas: z.string().optional(),
  precio: z.number().optional(),
  tecnicoAsignado: z.string().optional(),
  fechaEstimada: z.string().datetime().optional(),
});

export const usuarioSchema = z.object({
  nombre: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  rol: z.enum(['ADMIN', 'VENDEDOR', 'TÉCNICO', 'GESTOR']),
});

export const ventaSchema = z.object({
  clienteId: z.string().optional(),
  items: z.array(z.object({
    articuloId: z.string(),
    cantidad: z.number(),
    precioUnitario: z.number(),
  })),
  total: z.number(),
  metodoPago: z.enum(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'OTRO']),
});
