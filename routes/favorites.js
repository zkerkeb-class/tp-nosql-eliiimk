import express from 'express';
import User from '../models/User.js';
import Pokemon from '../models/Pokemon.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// --- AJOUTER UN FAVORI ---
router.post('/:pokemonId', auth, async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        
        // $addToSet ajoute l'élément seulement s'il n'existe pas encore (évite les doublons)
        await User.findByIdAndUpdate(req.user.id, {
            $addToSet: { favorites: pokemonId }
        });
        
        res.json({ message: `Pokémon n°${pokemonId} ajouté aux favoris.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- RETIRER UN FAVORI ---
router.delete('/:pokemonId', auth, async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        
        // $pull retire l'élément du tableau
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { favorites: pokemonId }
        });
        
        res.json({ message: `Pokémon n°${pokemonId} retiré des favoris.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- LISTER MES FAVORIS ---
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        // On cherche tous les Pokémon dont l'ID est dans le tableau favorites de l'user
        const favoritePokemons = await Pokemon.find({
            id: { $in: user.favorites }
        });
        
        res.json(favoritePokemons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;