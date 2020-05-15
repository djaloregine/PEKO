const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const usagersRoutes = require('./routes/usagers');
const produitsRoutes = require('./routes/produits');


mongoose.connect('mongodb+srv://lemanach:maijuin2020@cluster0-7mglv.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// middleware correspondant à CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const path = require('path');

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', usagersRoutes);
app.use('/api/sauces', produitsRoutes);


module.exports = app;









/* var multer = require('multer'); 
    var uploadPicture = multer({ 
    dest: 'temp/' 
    }); 
    var sharp = require('sharp'); 

    app.post('/upload', uploadPicture.single('profileIcon'), function (req,res) { 
     fs.readFile(req.file.path, function (err, data) { 
     if (err) res.end('UNRESOLVABLE ERROR'); 
    sharp(data).resize(200, 200).toFile('./photos/pic.jpg', function (err, info) { 
    //DELETE THE TEMPORAL FILE 
      fs.unlink(req.file.path, function (error) { 
       if (error) res.end('UNRESOLVABLE ERROR'); //CODE 3 ALARM 
       res.end('success'); 
      }); 
    } 
    */