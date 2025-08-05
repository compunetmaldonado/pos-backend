
import { Router } from 'express';
import prisma from '../../lib/prisma.js';
import { categoriaSchema } from '../schemas.js';

const router = Router();


// Get all categories
router.get('/categorias', async (req, res) => {
  const categorias = await prisma.categoria.findMany();
  res.json(categorias);
});

// Get category by ID
router.get('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  const categoria = await prisma.categoria.findUnique({
    where: { id },
  });
  res.json(categoria);
});

// Create a new category
router.post('/categorias', async (req, res, next) => {
  try {
    const data = categoriaSchema.parse(req.body);
    const newCategoria = await prisma.categoria.create({ data });
    res.json(newCategoria);
  } catch (error) {
    next(error);
  }
});

// Update a category
router.put('/categorias/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = categoriaSchema.parse(req.body);
    const updatedCategoria = await prisma.categoria.update({
      where: { id },
      data,
    });
    res.json(updatedCategoria);
  } catch (error) {
    next(error);
  }
});

// Delete a category
router.delete('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.categoria.delete({
    where: { id },
  });
  res.json({ message: 'Categoria eliminada' });
});

export default router;
