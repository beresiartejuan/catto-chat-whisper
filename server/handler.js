// Crea una funcion llamada "handler" que reciba un server de socket.io y que lo retorne, quiero que además agregues tipos con JSDoc.
/**
 * @typedef {import('socket.io').Server} SocketIOServer
 */
/**
 * Crea un manejador de eventos para el servidor de Socket.IO.
 * @param {SocketIOServer} io - El servidor de Socket.IO.
 * @returns {SocketIOServer} El servidor de Socket.IO con los eventos configurados.
 */
function handler(io) {
    // Configuración de eventos para el servidor de Socket.IO
    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado:', socket.id);

        // Evento de desconexión
        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });

        // Aquí puedes agregar más eventos personalizados según tus necesidades
        // Por ejemplo, un evento para recibir mensajes
        socket.on('send_message', (data) => {
            console.log('Mensaje recibido:', data.content);
            // Emitir el mensaje a todos los clientes conectados
            io.emit('receive_message', {
                id: crypto.randomUUID(),
                content: data.content,
                sender: "catto",
                timestamp: new Date()
              });
        });
    });

    return io;
}

export default handler;