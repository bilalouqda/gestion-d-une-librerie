const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');
const Livre = require('../models/Livre');
const testLivre = {
    titre: 'Test Book',
    genre: 'Fiction',
    date_publication: '2023-08-25',
    auteur: new mongoose.Types.ObjectId()
};

describe('Livre CRUD operations', () => {
    beforeAll(async () => {
        const url = 'mongodb://localhost:27017/librerie'; 
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('should create a new Livre', async () => {
        const response = await request(app)
            .post('/livres')
            .send(testLivre);

        expect(response.statusCode).toBe(201);
        expect(response.body.titre).toBe(testLivre.titre);
        expect(response.body.genre).toBe(testLivre.genre);
        expect(response.body.auteur).toBe(String(testLivre.auteur)); // Ensure the auteur ID is correct
    });

    it('should get all Livres', async () => {
        const response = await request(app).get('/livres');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should get a Livre by ID', async () => {
        const livre = new Livre(testLivre);
        await livre.save();

        const response = await request(app).get(`/livres/${livre._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.titre).toBe(livre.titre);
    });

    it('should update a Livre by ID', async () => {
        const livre = new Livre(testLivre);
        await livre.save();

        const updatedData = { titre: 'Updated Book' };
        const response = await request(app)
            .put(`/livres/${livre._id}`)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body.titre).toBe(updatedData.titre);
    });

    it('should delete a Livre by ID', async () => {
        const livre = new Livre(testLivre);
        await livre.save();

        const response = await request(app).delete(`/livres/${livre._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Livre deleted');
    });
});
