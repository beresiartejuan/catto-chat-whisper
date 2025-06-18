import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";
import helmet from 'helmet';
import handler from './handler.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Permitir todas las solicitudes de origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  }
});

// Configuración de CORS
app.use(cors({
  origin: '*', // Permitir todas las solicitudes de origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));
// Configuración de Helmet para mejorar la seguridad
app.use(helmet());
// Middleware para servir archivos estáticos
app.use(express.static('public'));
// Middleware para manejar el cuerpo de las solicitudes
app.use(express.json());
// Middleware para manejar las solicitudes de tipo application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Middleware para manejar las solicitudes de tipo multipart/form-data
app.use(express.raw({ type: 'multipart/form-data' }));
// Middleware para manejar las solicitudes de tipo text/plain
app.use(express.text({ type: 'text/plain' }));
// Middleware para manejar las solicitudes de tipo application/json
app.use(express.json({ type: 'application/json' }));
// Middleware para manejar las solicitudes de tipo application/xml
app.use(express.text({ type: 'application/xml' }));
// Middleware para manejar las solicitudes de tipo application/octet-stream
app.use(express.raw({ type: 'application/octet-stream' }));
// Middleware para manejar las solicitudes de tipo application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));

handler(io);

server.listen(3000);