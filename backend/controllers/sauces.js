const Sauce = require('../models/Sauces.js');
const fs = require('fs');




// création sauces
exports.createSauce = (req, res, next) => {                                         // Créer une sauce
  const sauceObject = JSON.parse(req.body.sauce);                                   
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` ,   //  format d'url des images

    likes: 0,
    dislikes: 0,
    usersLiked:[],
    usersDisliked: [],
  });

  sauce.save()
    .then(() => res.status(201).json({ message: 'Nouvelle sauce créée !' }))
    .catch((error) => res.status(400).json({ error }));
};

//obtention de toutes les sauces

exports.getAllSauces = (req, res, next) => {                                        
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// obtention une sauce en particulier.

exports.getOneSauce = (req, res, next) => { 
    Sauce.findOne({_id: req.params.id})         // Méthode findOne : obtention d'une sauce précise 
    .then(sauce => res.status(200).json(sauce)) // Succès : renvoit de la sauce.    
    .catch(error => res.status(404).json({error: error})); // Echec :  sauce non trouvée.   
};


//modification sauces 
exports.modifySauce = (req, res, next) => {            
    const sauceObject = req.file ? 
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'La sauce a été modifiée !' }))
      .catch((error) => res.status(400).json({ error }));
  };


  //suppression sauces

  exports.deleteSauce = (req, res, next) => { 
    Sauce.findOne({ _id: req.params.id }) // Methode pour chercher une sauce précise par id.
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]; // Suppression de l'image .
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id }) // Suppression.
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))// Succès suppression.
            .catch(error => res.status(400).json({ error }));// Erreur suppression.
        });
      })
    .catch(error => res.status(500).json({ error }));// Erreur sauce non trouvée.
  };


  exports.likeDislike = (req, res, next) => {
    // Pour la route READ = Ajout/suppression d'un like / dislike à une sauce
    // Like présent dans le body
    let like = req.body.like;
    // On prend le userID
    let userId = req.body.userId;
    // On prend l'id de la sauce
    let sauceId = req.params.id;
  
    if (like === 1) {
      // Si il s'agit d'un like
      Sauce.updateOne(
        {
          _id: sauceId,
        },
        {
          // On push l'utilisateur et on incrémente le compteur de 1
          $push: {
            usersLiked: userId,
          },
          $inc: {
            likes: +1,
          }, // On incrémente de 1
        }
      )
        .then(() =>
          res.status(200).json({
            message: "j'aime ajouté !",
          })
        )
        .catch((error) =>
          res.status(400).json({
            error,
          })
        );
    }
    if (like === -1) {
      Sauce.updateOne(
        // S'il s'agit d'un dislike
        {
          _id: sauceId,
        },
        {
          $push: {
            usersDisliked: userId,
          },
          $inc: {
            dislikes: +1,
          }, // On incrémente de 1
        }
      )
        .then(() => {
          res.status(200).json({
            message: "Dislike ajouté !",
          });
        })
        .catch((error) =>
          res.status(400).json({
            error,
          })
        );
    }
    if (like === 0) {
      // Si il s'agit d'annuler un like ou un dislike
      Sauce.findOne({
        _id: sauceId,
      })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
            // Si il s'agit d'annuler un like
            Sauce.updateOne(
              {
                _id: sauceId,
              },
              {
                $pull: {
                  usersLiked: userId,
                },
                $inc: {
                  likes: -1,
                }, // On incrémente de -1
              }
            )
              .then(() =>
                res.status(200).json({
                  message: "Like retiré !",
                })
              )
              .catch((error) =>
                res.status(400).json({
                  error,
                })
              );
          }
          if (sauce.usersDisliked.includes(userId)) {
            // Si il s'agit d'annuler un dislike
            Sauce.updateOne(
              {
                _id: sauceId,
              },
              {
                $pull: {
                  usersDisliked: userId,
                },
                $inc: {
                  dislikes: -1,
                }, // On incrémente de -1
              }
            )
              .then(() =>
                res.status(200).json({
                  message: "Dislike retiré !",
                })
              )
              .catch((error) =>
                res.status(400).json({
                  error,
                })
              );
          }
        })
        .catch((error) =>
          res.status(404).json({
            error,
          })
        );
    }
  };

