const Sauce = require('../models/produits');

exports.createSauce = (req, res, next) => {
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({
            message: "traratata"
        }))
        .catch((error) => res.status(400).json({
            error
        }));
        next();
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then((sauce) => res.status(200).json({
            sauce
        }))
        .catch((error) => res.status(404).json({
            error
        }));
        next();
};

// Attention WILL commence ici par créer un nouvel objet ! 
exports.modifySauce = (res, rep, next) => {
    const sauce = new Sauce({
        ...req.body
    });
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
        next();
};


exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'au revoir la sauce'
        }))
        .catch((error) => res.status(400).json({
            error
        }));
        next();

};


exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(404).json({
            error
        }));
};

