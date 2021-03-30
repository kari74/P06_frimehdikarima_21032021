const express = require('express');
const mongoose = require ('mongoose') 
const path = require('path');
const helmet = require('helmet')

 require('dotenv').config() 


//importation des routes
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nhnqu.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,

//mongoose.connect('mongodb+srv://frimehdikarima:mdpsopekocko@cluster0.nhnqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  const app = express(); //application express

// parametre CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(helmet());
//routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;