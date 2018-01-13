

var express = require('express')
		app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');

var tableauDonner = [];//mémorisation de la liste


// Chargement de la page index.html
app.get('/', function (req, res) {
  //res.sendfile(__dirname + '/index.html');
    res.render(__dirname + '/todo.ejs', {todolist: tableauDonner});
});

io.sockets.on('connection', function (socket, pseudo) {

    // Des qu'on ajout dans une liste
    socket.on('new', function (message) {
		if (message != '') { // Si le message n'est pas vide
			tableauDonner.push(message); // On injecte dans le tableau
		}
		socket.emit('new', {message: creationMessage()});
        socket.broadcast.emit('new', {message: creationMessage()});
    });
	socket.on('delete', function (id) {
		if (id != '') {
			tableauDonner.splice(id, 1);
		}
		socket.emit('new', {message: creationMessage()});
        socket.broadcast.emit('new', {message: creationMessage()});
    });
});


function creationMessage() {
	var message = '';
	for (var i = 0; i < tableauDonner.length; i++) {
		message += '<li><a id="'+ i +'" href="/">✘</a> ' + tableauDonner[i] + '</li>';
	}
	return message;
}

server.listen(8080);
