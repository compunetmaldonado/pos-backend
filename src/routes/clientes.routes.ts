
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all clients
router.get('/clientes', async (req, res) => {
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
});

// Get client by ID
router.get('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const cliente = await prisma.cliente.findUnique({
    where: { id },
  });
  res.json(cliente);
});

// Create a new client
router.post('/clientes', async (req, res) => {
  const { nombre, telefono, email } = req.body;
  const newCliente = await prisma.cliente.create({
    data: {
      nombre,
      telefono,
      email,
    },
  });
  res.json(newCliente);
});

// Update a client
router.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, email } = req.body;
  const updatedCliente = await prisma.cliente.update({
    where: { id },
    data: {
      nombre,
      telefono,
      email,
    },
  });
  res.json(updatedCliente);
});

// Delete a client
router.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.cliente.delete({
    where: { id },
  });
  res.json({ message: 'Cliente eliminado' });
});

export default router;
