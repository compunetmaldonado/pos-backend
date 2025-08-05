
import { Router } from 'express';
import prisma from '../../lib/prisma.js';
import { articuloSchema } from '../schemas.js';

const router = Router();


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
router.post('/articulos', async (req, res, next) => {
  try {
    const data = articuloSchema.parse(req.body);
    const newArticulo = await prisma.articulo.create({ data });
    res.json(newArticulo);
  } catch (error) {
    next(error);
  }
});

// Update an article
router.put('/articulos/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = articuloSchema.parse(req.body);
    const updatedArticulo = await prisma.articulo.update({
      where: { id },
      data,
    });
    res.json(updatedArticulo);
  } catch (error) {
    next(error);
  }
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
