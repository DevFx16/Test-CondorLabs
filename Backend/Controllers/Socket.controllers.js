exports.SocketConfig = server => {
    const SocketIO = require('socket.io');
    const Io = SocketIO(server);
    Io.on('connect', (socket) => {
        socket.on('Room:Join', room => {
            socket.join(room);
        });

        socket.on('Chat:Message', (data) => {
            socket.broadcast.to(data.Room).emit('Chat:Message', data);
        });

        socket.on('Chat:Room', (data) => {
            socket.broadcast.emit('Chat:Room', data);
        });

        socket.on('Chat:Typing', (data) => {
            socket.broadcast.to(data.Room).emit('Chat:Typing', data);
        });
    });
}