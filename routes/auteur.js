const express = require('express');
const router = express.Router();
const auteurController = require('../controllers/auteurController');

router.post('/auteurs', auteurController.createAuteur);
router.get('/auteurs', auteurController.getAllAuteurs);
router.get('/auteurs/:id', auteurController.getAuteurById);
router.put('/auteurs/:id', auteurController.updateAuteur);
router.delete('/auteurs/:id', auteurController.deleteAuteur);

module.exports = router;
