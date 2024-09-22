const { validationResult } = require('express-validator');
const Livre = require('../models/Livre');

exports.createLivre = async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { titre, genre, date_publication, auteur } = req.body;
        const newLivre = new Livre({ titre, genre, date_publication, auteur });
        const savedLivre = await newLivre.save();
        res.status(201).json(savedLivre);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllLivres = async (req, res) => {
    try {
        const livres = await Livre.find().populate('auteur');
        res.status(200).json(livres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLivreById = async (req, res) => {
    try {
        const livre = await Livre.findById(req.params.id).populate('auteur');
        if (!livre) return res.status(404).json({ message: 'Livre not found' });
        res.status(200).json(livre);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateLivre = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedLivre = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('auteur');
        if (!updatedLivre) return res.status(404).json({ message: 'Livre not found' });
        res.status(200).json(updatedLivre);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteLivre = async (req, res) => {
    try {
        const deletedLivre = await Livre.findByIdAndDelete(req.params.id);
        if (!deletedLivre) return res.status(404).json({ message: 'Livre not found' });
        res.status(200).json({ message: 'Livre deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
