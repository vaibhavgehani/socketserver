let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
const cors = require('cors');
app.use(cors());

io.on('connection', (socket) => {
    socket.on('disconnect', function(){
      io.emit('users-changed', {user: socket.username, event: 'left'});   
    });
   
    socket.on('set-name', (name) => {
      socket.username = name;
      io.emit('users-changed', {user: name, event: 'joined'});    
    });
    
    socket.on('send-message', (message) => {
      io.emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});    
    });
  });

let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server Started');
});