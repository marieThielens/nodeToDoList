# nodeToDoList

## Une Todolist en temps réel avec node.js

- Une todolist en temps réel : c'est à dire que les différentes personnes qui se connectent voient directement lorsque quelqu'un rajoute ou enlève un évenement. 

<img src="miniature.png" width="50%">

1. Initialisez le fichier .json `npm init`

2. Installez les modules 
  - Express : `npm install express` -> Framework (super-bibliothèque). Permet de gérer entre-autre les routes(URL) et d'utiliser des         templates.
  - Http : `npm install http` ->
  - Socket : `npm install socket.io` -> Bibliothèque qui permet de communiquer en temps réel.
  - Ent : `npm install ent` -> Permet de bloquer les caractères HTML.
  - Fs : `npm install fs` -> Permet de travailler avec le système de fichier. 
  
 3. Lancer l'application
   - dans la console `node app.js`
   - dans votre navigateur `localhost:8080`
