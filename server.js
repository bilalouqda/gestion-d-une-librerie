const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const auteurRoute = require('./routes/auteur')
const livreRoutes = require('./routes/livre')


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());


app.use("/auteur",auteurRoute)
app.use('/livres', livreRoutes); 


mongoose.connect(process.env.URL_DB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app