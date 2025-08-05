
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all sales
router.get('/ventas', async (req, res) => {
  const ventas = await prisma.venta.findMany({
    include: { items: true },
  });
  res.json(ventas);
});

// Get sale by ID
router.get('/ventas/:id', async (req, res) => {
  const { id } = req.params;
  const venta = await prisma.venta.findUnique({
    where: { id },
    include: { items: true },
  });
  res.json(venta);
});

// Create a new sale
router.post('/ventas', async (req, res) => {
  const { clienteId, items, total, metodoPago } = req.body;
  const newVenta = await prisma.venta.create({
    data: {
      clienteId,
      total,
      metodoPago,
      items: {
        create: items.map((item: any) => ({
          articuloId: item.articuloId,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
        })),
      },
    },
  });
  res.json(newVenta);
});

export default router;
