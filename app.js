var app = require('express')(),
server = require('http').createServer(app),
io = require('socket.io').listen(server),
cookieParser = require('cookie-parser'),
session = require('cookie-session'),
bodyParser = require('body-parser'),
ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
fs = require('fs');

todolist= [], // stocke la todolist
newtodo ='',

/* On utilise les cookies, les sessions et les formulaires */
app.use(cookieParser())
.use(session({secret: 'todotopsecret'}))
.use(bodyParser())


//permet la récuperation la liste
.use(function(req, res, next){
    if (todolist.length != 0) { // Si le tableau n'est pas vide
    req.session.todolist = [];
    req.session.todolist = todolist;
}else{
    req.session.todolist = [];
}
next();
})


// Chargement de la page index.html
app.get('/todo', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.use(function(req, res, next){
    res.redirect('/todo');
});


//on lance l'écoute sur la connexion d'un nouvel utilisateur
io.sockets.on('connection', function (socket) {
    console.log('Nouveau contributeur connecté');
    // on envoie la tache à tout le mmonde

    // Si le tableau n'est pas vide on l'envoie au nouveau contributeur
    if (todolist !== []) {
        socket.emit('tableau',todolist);
    }

    // Quand un contributeur ajoute une nouvelle tâche
    socket.on('sent_task', function(sent_task){
        // On l'envoie à tous les contributeurs
        encoded_description = ent.encode(sent_task.description);
        socket.broadcast.emit('new_task',{id:sent_task.id,description:encoded_description});
        // On l'ajoute au tableau
        todolist.push({id:sent_task.id,description:encoded_description});
    });

    // Quand un contributeur supprime une tâche
    socket.on('deleted_task',function(task_id){
        // On envoie à tous les contributeurs l'id de la tâche supprimée
        socket.broadcast.emit('delete',task_id);
        // On la supprime du tableau
        for (var i=0; i < todolist.length; i++){
            if (todolist[i].id == task_id) {
                todolist.splice(i,1);
                break;
            }
        }
    });

});

server.listen(8080);
