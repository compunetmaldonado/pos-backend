
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import articulosRouter from './src/routes/articulos.routes.js';
import categoriasRouter from './src/routes/categorias.routes.js';
import clientesRouter from './src/routes/clientes.routes.js';
import ticketsRouter from './src/routes/tickets.routes.js';
import ventasRouter from './src/routes/ventas.routes.js';
import usuariosRouter from './src/routes/usuarios.routes.js';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', articulosRouter);
app.use('/api', categoriasRouter);
app.use('/api', clientesRouter);
app.use('/api', ticketsRouter);
app.use('/api', ventasRouter);
app.use('/api', usuariosRouter);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Basic error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
