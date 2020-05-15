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
exports.modifySauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
   sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    Sauce.updateOne({
            _id: req.params.id
        }, {
            ...req.body,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'tralalaire'
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
            message: " ras le bol"
        }));
};