
import { Router } from 'express';
import prisma from '../../lib/prisma.js';
import { ventaSchema } from '../schemas.js';

const router = Router();


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
router.post('/ventas', async (req, res, next) => {
  try {
    const { clienteId, items, total, metodoPago } = ventaSchema.parse(req.body);
    const newVenta = await prisma.venta.create({
      data: {
        clienteId,
        total,
        metodoPago,
        items: {
          create: items.map((item) => ({
            articuloId: item.articuloId,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
          })),
        },
      },
    });
    res.json(newVenta);
  } catch (error) {
    next(error);
  }
});

export default router;
