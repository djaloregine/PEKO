const User = require('../models/usagers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.signup = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(password)
    if (!email_regex.test(email)) {
        return res.status(400).json({
            message: 'Email invalide'
        });
    } else {
        const count = password.length;
        if (count >= 8) {
            bcrypt.hash(req.body.password, 10) // saler le mdp 10 fois
                .then(hash => {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                        .then(() => res.status(201).json({
                            message: 'Usager créé !'
                        }))
                        .catch(error => res.status(400).json({
                            error
                        }));
                })
                .catch(error => res.status(500).json({
                    error
                }));
        } else {
            res.status(401).json({
                message: 'Votre mot de passe doit au moins faire 8 caractères'
            });
        }
    }
};


exports.login = (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Usager non trouvé'
                });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: "Mot de passe incorrect"
                        });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({
                            userId: user._id
                        }, 'secret_comme_0123456', {
                            expiresIn: '3h'
                        })
                    });
                })
                .catch((error) => res.status(501).json({
                    error
                }))
        })
        .catch((error) => res.status(500).json({
            error
        }));
};