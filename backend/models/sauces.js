const mongoose = require("mongoose");                         // Importation du package mongoose

// Modèle
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },                 // Identifiant unique 
    name: { type: String, required: true },                   // Nom sauce
    manufacturer: { type: String, required: true },           // Fabricant sauce
    description: { type: String, required: true },            // Description sauce
    mainPepper: { type: String, required: true },             // composition sauce
    imageUrl: { type: String, required: true },               //  l'image sauce
    heat: { type: Number, required: true },                   // Nombre entre 1 et 10 pour décrire la sauce
    likes: { type: Number, default: 0 },                      // Nombre de like
    dislikes: { type: Number, default: 0 },                   // Nombre de
    usersLiked: [{ type: String }],
    usersDisliked: [{ type: String }],                       // Tableau d'identifiants ayant disliké la sauce
});

module.exports = mongoose.model('Sauce', sauceSchema);