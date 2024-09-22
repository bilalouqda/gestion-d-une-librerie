const Auteur = require('../models/Auteur');

exports.createAuteur = async (req, res) => {
    try {
        const { nom, prenom, date_naissance } = req.body;
        const newAuteur = new Auteur({ nom, prenom, date_naissance });
        const savedAuteur = await newAuteur.save();
        res.status(201).json(savedAuteur);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllAuteurs = async (req, res) => {
    try {
        const auteurs = await Auteur.find();
        res.status(200).json(auteurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAuteurById = async (req, res) => {
    try {
        const auteur = await Auteur.findById(req.params.id);
        if (!auteur) return res.status(404).json({ message: 'Auteur not found' });
        res.status(200).json(auteur);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAuteur = async (req, res) => {
    try {
        const updatedAuteur = await Auteur.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAuteur) return res.status(404).json({ message: 'Auteur not found' });
        res.status(200).json(updatedAuteur);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteAuteur = async (req, res) => {
    try {
        const deletedAuteur = await Auteur.findByIdAndDelete(req.params.id);
        if (!deletedAuteur) return res.status(404).json({ message: 'Auteur not found' });
        res.status(200).json({ message: 'Auteur deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
