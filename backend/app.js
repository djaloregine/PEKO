const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Sauce = require('./models/produits');

mongoose.connect('mongodb+srv://lemanach:maijuin2020@cluster0-7mglv.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(bodyParser.json());



// middleware correspondant à CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// route POST doit être au dessus de GET
app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
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
});

/*Capture et enregistre
l'image, analyse la
sauce en utilisant une
chaîne de caractères et
l'enregistre dans la
base de données, en
définissant
correctement son
image URL. Remet les
sauces aimées et celles
détestées à 0, et les
sauces usersliked et
celles usersdisliked
aux tableaux vides. */


// route GET one produit 
// doit renvoyer la sauce avec l'id fourni 

app.get('/api/sauces/:id', (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then((sauce) => res.status(200).json({
            sauce
        }))
        .catch((error) => res.status(404).json({
            error
        }));
});

// route put 
app.put('/api/sauces/:id', (res, rep, next) => {
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
});

// route delete
app.delete('/api/sauces/:id', (req, res, next) => {
    Sauce.deleteOne({
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'au revoir la sauce'
        }))
        .catch((error) => res.status(400).json({
            error
        }));

});


// route GET sans router
app.get('/api/sauces', (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(404).json({
            error
        }));
});



module.exports = app;