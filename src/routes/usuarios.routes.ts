
import { Router } from 'express';
import prisma from '../../lib/prisma.js';
import bcrypt from 'bcrypt';
import { usuarioSchema } from '../schemas.js';

const router = Router();


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
router.post('/usuarios', async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = usuarioSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol,
      },
    });
    res.json(newUsuario);
  } catch (error) {
    next(error);
  }
});

// Update a user
router.put('/usuarios/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, rol } = usuarioSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUsuario = await prisma.usuario.update({
      where: { id },
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol,
      },
    });
    res.json(updatedUsuario);
  } catch (error) {
    next(error);
  }
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
