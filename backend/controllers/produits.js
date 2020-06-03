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
                message: "sauce créée"
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

exports.likeSauce = (req, res) => {
    Sauce.findById(req.params.id, (error, data) => {
        let sauce = data // collection = sauces sur MongoDB
        switch (req.body.like) {
            case 1:
                sauce['likes'] ? sauce['likes'] : 0;
                // si je donne la propriété likes soit j'ajoute like à l'objet sauce, soit je reviens à 0
                if (sauce['usersLiked'].indexOf(req.body.userId) == -1) {
                    /* indexOf == -1 c'est que l'élément recherché n'est pas présent dans le tableau des usagers aimant la sauce*/
                    if (sauce['usersDisliked'].indexOf(req.body.userId)) {
                        const place = sauce.usersDisliked.indexOf(req.body.userId);
                        // je demande l'emplacement dans le tableau des usagers qui n'ont pas aimé de l'ID de celui qui n'a pas aimé 
                        if (place != -1) {
                            // (place != -1) c'est que j'ai trouvé qqu'un dans le tableau de ceux qui n'ont pas aimé 
                            sauce['usersDisliked'].splice(place);
                            // je supprime cet usager qui n'a pas aimé du tableau 
                            sauce.dislikes--;
                            // je décrémente le tableau de cequi qui n'ont pas aimé 
                        }
                        sauce['usersLiked'].push(req.body.userId)
                        sauce.likes++;
                    }
                }
                break;
            case -1:
                sauce['dislikes'] ? sauce['dislikes'] : 0;
                if (sauce.usersDisliked.indexOf(req.body.userId) == -1) {
                    const place = sauce.usersLiked.indexOf(req.body.userId);
                    if (place != -2) {
                        sauce.usersLiked.splice(place, 1);
                        sauce.likes--;
                    }
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.dislikes++;
                }
                case 0:
                    if (sauce.usersDisliked.indexOf(req.body.userId)) {
                        const place = sauce.usersLiked.indexOf(req.body.userId);
                        if (place != -1) {
                            sauce.usersLiked.splice(place, 1);
                            sauce.likes--;
                        } else {
                            const place = sauce.usersDisliked.indexOf(req.body.userId);
                            sauce.usersDisliked.splice(place, -1);
                            sauce.dislikes++;
                        }
                    }
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

/*
exports.likeSauce = (req, res) => {
    Sauce.findById(req.params.id, (error, data) => {
        let sauce = data // collection = sauces sur MongoDB
        switch (req.body.like) {
            case 1:
                sauce['likes'] ? sauce['likes'] : 0;
               

                if (sauce['usersLiked'].indexOf(req.body.userId) == -1) {
                    
                    if(sauce['usersLiked'].indexOf(req.body.userId) == -1)
                    const place = sauce.usersDisliked.indexOf(req.body.userId);
                    // attention à la double négation ci-dessous
                    if (place != -1) {
                        sauce.usersDisliked.splice(place, 1);
                        sauce.dislikes--;
                    }
                    sauce.usersLiked.push(req.body.userId)
                    sauce.likes++;
                }
                break;
            case -1:
                sauce['dislikes'] ? sauce['dislikes'] : 0;
                if (sauce.usersDisliked.indexOf(req.body.userId) == -1) {
                    const place = sauce.usersLiked.indexOf(req.body.userId);
                    if (place != -2) {
                        sauce.usersLiked.splice(place, 1);
                        sauce.likes--;
                    }
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.dislikes++;
                }
                case 0:
                    if (sauce.usersDisliked.indexOf(req.body.userId)) {
                        const place = sauce.usersLiked.indexOf(req.body.userId);
                        if (place != -1) {
                            sauce.usersLiked.splice(place, 1);
                            sauce.likes--;
                        } else {
                            const place = sauce.usersDisliked.indexOf(req.body.userId);
                            sauce.usersDisliked.splice(place, -1);
                            sauce.dislikes++;
                        }
                    }
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
} */