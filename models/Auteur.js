const mongoose = require('mongoose');

const auteurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    date_naissance: { type: Date },
    ville: { type: String }
});

const Auteur = mongoose.model('Auteur', auteurSchema);

module.exports = Auteur;
