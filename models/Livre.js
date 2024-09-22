const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    genre: { type: String, required: true },
    date_publication: { type: Date, required: true },
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Auteur', required: true }
});

const Livre = mongoose.model('Livre', livreSchema);

module.exports = Livre;
