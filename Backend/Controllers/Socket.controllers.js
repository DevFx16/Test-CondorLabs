/**
 * File Controller Socket listeners
 */
exports.SocketConfig = server => {
    const SocketIO = require('socket.io');
    const Io = SocketIO(server);
    var connect = {};
    const fetch = require('node-fetch');
    Io.on('connect', (socket) => {
        //Join in conversations
        socket.on('Room:Join', room => {
            socket.join(room);
        });

        //connected users map
        socket.on('Push', token => {
            connect = Object.assign(connect, { [socket.id]: token });
        });

        //new message
        socket.on('Chat:Message', (data) => {
            socket.broadcast.to(data.Room).emit('Chat:Message', data);
        });

        //for new conversations
        socket.on('Chat:Room', (data) => {
            socket.broadcast.emit('Chat:Room', data);
        });

        //user typing 
        socket.on('Chat:Typing', (data) => {
            socket.broadcast.to(data.Room).emit('Chat:Typing', data);
        });

        //user diconnect
        socket.on('disconnect', async () => {
            //if exists user in map
            if (connect[socket.id]) {
                //fetch for change status
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