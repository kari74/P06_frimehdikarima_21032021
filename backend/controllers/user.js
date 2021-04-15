const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const maskData = require('maskdata');
const passwordValidator = require ('password-validator');
const User = require('../models/user');
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(6)                                                                  // length mini mdp = 6 caractères
.is().max(32)                                                                 // length max mdp = 32 caractères
.has().uppercase()                                                            // Le mdp doit contenir au moins une majuscule
.has().lowercase()                                                            // Le mdp doit contenir au moins une minuscule
.has().digits()                                                               // Le mdp doit contenir au moins un chiffre
.has().not().spaces()                                                         // Le mdp ne doit pas contenir d'espace
.is().not().oneOf(['Passw0rd', 'Password123', '123456', 'Azerty123']);        // Exclusion de mdp trop simples 

exports.signup = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(401).json({message:"Sécurité du mot de passe faible. Il doit contenir au moins 8 caractère, des majuscules et deux chiffres"})
  }
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: maskData.maskEmail2(req.body.email),
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  };

exports.login = (req, res, next) => {
  User.findOne({ email:maskData.maskEmail2(req.body.email) })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
          .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'vjzefkmgjuvhztuvjzlm.vz145658763453svkljhg:!,',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };