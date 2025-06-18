
# Backend Documentation - Catto Chat Application

## Overview

Esta aplicación requiere un backend que implemente Socket.IO para comunicación en tiempo real. El backend debe manejar chat, configuración del asistente, notas y eventos.

## Configuración de Socket.IO

### URL de Conexión
- **Desarrollo**: `http://localhost:3001`
- **Producción**: Configurar `VITE_SOCKET_URL` en variables de entorno

### Configuración del Cliente
```javascript
{
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000,
}
```

## Eventos de Socket

### 1. Eventos de Conexión

#### `connect`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Se emite cuando el cliente se conecta exitosamente
- **Payload**: Ninguno

#### `disconnect`
- **Dirección**: Cliente ← Servidor  
- **Descripción**: Se emite cuando el cliente se desconecta
- **Payload**: Ninguno

#### `connect_error`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Se emite cuando hay un error de conexión
- **Payload**: Error object

### 2. Eventos de Chat

#### `send_message`
- **Dirección**: Cliente → Servidor
- **Descripción**: Envía un nuevo mensaje del usuario
- **Payload**:
```typescript
{
  content: string;
  sender: "user";
}
```
- **Respuesta esperada**: El servidor debe procesar el mensaje y emitir `receive_message`

#### `receive_message`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Recibe un nuevo mensaje (del usuario o del asistente)
- **Payload**:
```typescript
{
  id: string;
  content: string;
  sender: "user" | "catto";
  timestamp: Date;
}
```

#### `message_history`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Recibe el historial completo de mensajes al conectarse
- **Payload**:
```typescript
ChatMessage[] // Array de mensajes
```

### 3. Eventos del Asistente

#### `assistant_status`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Estado actual del asistente
- **Payload**:
```typescript
{
  mood: string;           // ej: "Feliz", "Concentrado", "Relajado"
  energy: string;         // ej: "Alto", "Medio", "Bajo"
  lastUpdate: string;     // Fecha en formato legible
  personalityMode: string; // ej: "Amigable", "Profesional", "Casual"
}
```

#### `update_prompt`
- **Dirección**: Cliente → Servidor
- **Descripción**: Actualiza el prompt central del asistente
- **Payload**:
```typescript
{
  prompt: string;
}
```

#### `prompt_updated`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Confirma que el prompt fue actualizado
- **Payload**:
```typescript
string // El nuevo prompt
```

### 4. Eventos de Notas

#### `notes_list`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Lista completa de notas al conectarse
- **Payload**:
```typescript
Note[] // Array de notas
```

#### `note_created`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Nueva nota creada
- **Payload**:
```typescript
{
  id: string;
  body: string;
  tags: string[];
}
```

#### `note_updated`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Nota actualizada
- **Payload**:
```typescript
{
  id: string;
  body: string;
  tags: string[];
}
```

#### `note_deleted`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Nota eliminada
- **Payload**:
```typescript
string // ID de la nota eliminada
```

### 5. Eventos de Eventos/Calendario

#### `events_list`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Lista completa de eventos
- **Payload**:
```typescript
Event[] // Array de eventos (estructura por definir)
```

#### `event_created`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Nuevo evento creado
- **Payload**: Event object

#### `event_updated`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Evento actualizado
- **Payload**: Event object

#### `event_deleted`
- **Dirección**: Cliente ← Servidor
- **Descripción**: Evento eliminado
- **Payload**: Event ID

## Estructuras de Datos

### ChatMessage
```typescript
interface ChatMessage {
  id: string;           // UUID único
  content: string;      // Contenido del mensaje
  sender: "user" | "catto"; // Quien envió el mensaje
  timestamp: Date;      // Fecha y hora del mensaje
}
```

### Note
```typescript
interface Note {
  id: string;      // UUID único
  body: string;    // Contenido de la nota
  tags: string[];  // Tags para categorización
}
```

### AssistantStatus
```typescript
interface AssistantStatus {
  mood: string;           // Estado emocional del asistente
  energy: string;         // Nivel de energía
  lastUpdate: string;     // Última actualización
  personalityMode: string; // Modo de personalidad activo
}
```

## Flujo de Comunicación

### 1. Conexión Inicial
```
Cliente conecta → Servidor emite:
- assistant_status
- message_history
- notes_list
- events_list (opcional)
```

### 2. Envío de Mensaje
```
Cliente: send_message → 
Servidor procesa → 
Servidor emite: receive_message (respuesta del asistente)
```

### 3. Actualización de Prompt
```
Cliente: update_prompt → 
Servidor actualiza configuración → 
Servidor emite: prompt_updated
```

## Requerimientos del Backend

### Base de Datos
- **Mensajes**: Tabla para almacenar historial de chat
- **Notas**: Tabla para notas del usuario
- **Configuración**: Tabla para prompt central y estado del asistente
- **Eventos**: Tabla para eventos/calendario (opcional)

### API de Asistente
- Integración con servicio de IA (OpenAI, Claude, etc.)
- Procesamiento de prompts personalizados
- Manejo de contexto y memoria

### Funcionalidades Requeridas

1. **Gestión de Conexiones**
   - Manejo de múltiples clientes
   - Reconexión automática
   - Manejo de errores de conexión

2. **Procesamiento de Chat**
   - Recepción de mensajes del usuario
   - Envío a servicio de IA
   - Respuesta en tiempo real

3. **Persistencia de Datos**
   - Almacenamiento de mensajes
   - Gestión de notas
   - Configuración del asistente

4. **Tiempo Real**
   - Notificaciones instantáneas
   - Sincronización entre clientes
   - Estado de conexión

## Tecnologías Recomendadas

### Backend
- **Node.js** con Express
- **Socket.IO** para WebSockets
- **Base de datos**: PostgreSQL o MongoDB
- **ORM**: Prisma o Mongoose

### Despliegue
- **Servidor**: Railway, Heroku, o VPS
- **Base de datos**: Supabase, PlanetScale, o MongoDB Atlas
- **Variables de entorno** para configuración

## Variables de Entorno Necesarias

```env
# Socket.IO
PORT=3001
CORS_ORIGIN=http://localhost:5173

# Base de datos
DATABASE_URL=postgresql://...

# API de IA
OPENAI_API_KEY=sk-...
# o
ANTHROPIC_API_KEY=...

# Configuración
NODE_ENV=development
```

## Ejemplo de Implementación Básica

### Servidor Socket.IO
```javascript
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  
  // Enviar datos iniciales
  socket.emit('assistant_status', getCurrentAssistantStatus());
  socket.emit('message_history', getMessageHistory());
  socket.emit('notes_list', getNotes());
  
  // Manejar mensajes
  socket.on('send_message', async (data) => {
    const message = await processMessage(data);
    io.emit('receive_message', message);
  });
  
  // Manejar actualizaciones de prompt
  socket.on('update_prompt', async (data) => {
    await updatePrompt(data.prompt);
    io.emit('prompt_updated', data.prompt);
  });
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});
```

## Notas de Implementación

1. **Seguridad**: Implementar autenticación y validación de datos
2. **Escalabilidad**: Considerar Redis para múltiples instancias
3. **Monitoreo**: Logging y métricas de performance
4. **Testing**: Tests unitarios y de integración
5. **Documentación**: API documentation con Swagger/OpenAPI

## Próximos Pasos

1. Configurar servidor Socket.IO básico
2. Implementar base de datos
3. Integrar API de IA
4. Añadir autenticación
5. Desplegar en producción
6. Monitoreo y optimización
