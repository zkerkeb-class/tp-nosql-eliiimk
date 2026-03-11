import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './connect.js';
import Pokemon from '../models/Pokemon.js';
// Import direct du JSON (assure-toi que le chemin est correct)
import pokemonsList from '../data/pokemonsList.js'; 

const seedDatabase = async () => {
    try {
        // 1. Connexion à la base
        await connectDB();

        // 2. Nettoyage (supprime tout pour repartir à zéro)
        await Pokemon.deleteMany({});
        console.log('Collection vidée.');

        // 3. Insertion massive
        await Pokemon.insertMany(pokemonsList);
        console.log(`${pokemonsList.length} Pokémon insérés avec succès !`);

        // 4. Fermeture propre de la connexion
        await mongoose.connection.close();
        console.log('Connexion fermée.');
        
    } catch (error) {
        console.error('❌ Erreur lors du seeding :', error);
        process.exit(1);
    }
};

seedDatabase();