exports.SocketConfig = server => {
    const SocketIO = require('socket.io');
    const Io = SocketIO(server);
    var connect = {};
    const fetch = require('node-fetch');
    Io.on('connect', (socket) => {
        socket.on('Room:Join', room => {
            socket.join(room);
        });

        socket.on('Push', token => {
            connect = Object.assign(connect, { [socket.id]: token });
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

        socket.on('disconnect', async () => {
            if (connect[socket.id]) {
                await fetch('https://chat-condorlabs.herokuapp.com/User', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Type': 'application/json',
                        'authorization': 'Bearer ' + connect[socket.id]
                    },
                    mode: 'cors',
                    body: JSON.stringify({ Status: false })
                });
                delete connect[socket._id];
            }
        });
    });
}