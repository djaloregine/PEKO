const Sauce = require('../models/sauces');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() =>
            res.status(201).json({
                message: "traratata"
            }))
        .catch((error) => res.status(400).json({
            error
        }));
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then((sauce) => {
            res.status(200).json(
                sauce
            )
        })
        .catch((error) => {
            res.status(404).json({
                error
            })
        });
};

// Attention WILL commence ici par créer un nouvel objet ! 
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    Sauce.updateOne({
            _id: req.params.id
        }, {
            ...sauceObject,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'sauce modifiée'
        }))
        .catch((error) => res.status(404).json({
            error
        }));
};


exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        }).then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({
                        _id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'au revoir la sauce'
                    }))
                    .catch((error) => res.status(400).json({
                        error
                    }));
            })
        })
        .catch((error) => res.status(500).json({
            error
        }));
};


exports.getAllSauce = (req, res) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(404).json({
            message: " les sauces n'ont pas été trouvées "
        }));
};


exports.likeSauce = (req, res) => {

    Sauce.findById(req.params.id, (error, data) => {
        let sauce = data
        switch (req.body.like) {
            case 1:
                sauce['likes'] = sauce['likes'] ? sauce['likes'] : 0
                sauce['dislikes'] = sauce['dislikes'] ? sauce['dislikes'] : 0
                if (sauce.usersLiked.indexOf(req.body.userId) == -1) {
                    const place = sauce.usersDisliked.indexOf(req.body.userId);
                    if (place != -1) {
                        sauce.usersDisliked.splice(place, 1);
                        sauce.dislikes--;
                    }
                    sauce.usersLiked.push(req.body.userId)
                    sauce.likes++;

                }
                break

        }

        Sauce.updateOne({
                _id: req.params.id
            }, sauce).then(() => res.status(200).json({
                message: 'sauce modifiée'
            }))
            .catch((error) => res.status(404).json({
                error
            }));
    })

}


/*  Sauce.updateOne({
          _id: req.params.id,
      }, {
          ...req.body,
          _id: req.params.id
      }).then(() => {
          userId = req.body.userId
          if (action === 1) {
              likes: req.body.likes === 0
              usersLiked: req.body.usersLiked
              $addToSet: {
                  usersLiked,
                  1
              }
              $inc: {
                  likes,
                  1
              }
          }
          else if (action === -1) {
              dislikes: req.body.dislikes === 0
              usersDisliked: req.body.usersDisliked
              $addToSet: {
                  usersDisliked,
                  1
              }
              $inc: {
                  dislikes,
                  1
              }
          }
          else {
              if (usersLiked.indexOf(userId)) {
                  const place = usersLiked.indexOf('userId');
                  const userMin = usersLiked.splice(place, 1);
                  $pull: {
                      usersLiked,
                      userMin
                  }
              } else if (usersDisliked.indexOf(userId)) {
                  const place = usersDisliked.indexOf('userId');
                  const userMin = usersDisliked.splice(place, 1);
                  $pull: {
                      usersDisliked,
                      userMin
                  }
              }
          }
      })
      .catch((error) => res.status(500).json({
          message: 'tu es sur la bonne erreur'
      }));
      */