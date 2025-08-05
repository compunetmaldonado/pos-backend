
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

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
router.post('/categorias', async (req, res) => {
  const { nombre } = req.body;
  const newCategoria = await prisma.categoria.create({
    data: {
      nombre,
    },
  });
  res.json(newCategoria);
});

// Update a category
router.put('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const updatedCategoria = await prisma.categoria.update({
    where: { id },
    data: {
      nombre,
    },
  });
  res.json(updatedCategoria);
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
