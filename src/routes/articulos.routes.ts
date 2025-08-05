
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all articles
router.get('/articulos', async (req, res) => {
  const articulos = await prisma.articulo.findMany();
  res.json(articulos);
});

// Get article by ID
router.get('/articulos/:id', async (req, res) => {
  const { id } = req.params;
  const articulo = await prisma.articulo.findUnique({
    where: { id },
  });
  res.json(articulo);
});

// Create a new article
router.post('/articulos', async (req, res) => {
  const { nombre, descripcion, sku, categoriaId, precioVenta, precioCosto, stockActual, imagenUrl } = req.body;
  const newArticulo = await prisma.articulo.create({
    data: {
      nombre,
      descripcion,
      sku,
      categoriaId,
      precioVenta,
      precioCosto,
      stockActual,
      imagenUrl,
    },
  });
  res.json(newArticulo);
});

// Update an article
router.put('/articulos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, sku, categoriaId, precioVenta, precioCosto, stockActual, imagenUrl } = req.body;
  const updatedArticulo = await prisma.articulo.update({
    where: { id },
    data: {
      nombre,
      descripcion,
      sku,
      categoriaId,
      precioVenta,
      precioCosto,
      stockActual,
      imagenUrl,
    },
  });
  res.json(updatedArticulo);
});

// Delete an article
router.delete('/articulos/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.articulo.delete({
    where: { id },
  });
  res.json({ message: 'Articulo eliminado' });
});

export default router;
