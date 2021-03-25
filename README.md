## Piquante

Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

Pour faire fonctionner le projet, vous devez installer node-sass à part.

## Development server

Démarrer `ng serve` pour avoir accès au serveur de développement. Rendez-vous sur `http://localhost:4200/`. L'application va se recharger automatiquement si vous modifiez un fichier source.


BDD :
1. La base de donnée utilisée dans le MVP est une base de donnée Mongo Atlas.
2. Pour changer cette base de donnée il vous faut aller dans le fichier "app.js" et modifier la route mongoose.connect par la votre.

Pour lancer le backend :
1. Rendez vous dans le répertoire "backend" à l'aide de la console
2. Lancer la commande npm install 
3. Lancez la commande "node server" ou "nodemon server"
4. Le serveur devrait se lancer sur le port 3000.