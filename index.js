// 1. Charger les variables d'environnement en PREMIER
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

// Import de la connexion BDD et du Router
import connectDB from './db/connect.js';
import pokemonsRouter from './routes/pokemons.js';
import authRoutes from './routes/auth.js';
import favoriteRoutes from './routes/favorites.js';

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
app.use(cors()); 
app.use(express.json());
app.use('/assets', express.static('assets')); 

// --- ROUTES ---
app.use('/api/pokemons', pokemonsRouter);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// --- LANCEMENT SÉCURISÉ ---
// On crée une fonction asynchrone pour s'assurer que MongoDB est connecté 
// AVANT de lancer app.listen()
const startServer = async () => {
    try {
        await connectDB(); // On attend la connexion à la base de données
        
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Impossible de démarrer le serveur :", error);
    }
};

startServer();