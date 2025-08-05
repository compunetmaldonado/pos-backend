
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all users
router.get('/usuarios', async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

// Get user by ID
router.get('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const usuario = await prisma.usuario.findUnique({
    where: { id },
  });
  res.json(usuario);
});

// Create a new user
router.post('/usuarios', async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const newUsuario = await prisma.usuario.create({
    data: {
      nombre,
      email,
      password, // This will be hashed later
      rol,
    },
  });
  res.json(newUsuario);
});

// Update a user
router.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, rol } = req.body;
  const updatedUsuario = await prisma.usuario.update({
    where: { id },
    data: {
      nombre,
      email,
      password, // This will be hashed later
      rol,
    },
  });
  res.json(updatedUsuario);
});

// Delete a user
router.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.usuario.delete({
    where: { id },
  });
  res.json({ message: 'Usuario eliminado' });
});

export default router;
