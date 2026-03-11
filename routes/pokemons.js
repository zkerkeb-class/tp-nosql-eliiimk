import express from 'express';
import Pokemon from '../models/Pokemon.js';
import auth from '../middleware/auth.js'; // Import du middleware de protection

const router = express.Router();

/**
 * @route   GET /api/pokemons
 * @desc    Récupérer tous les Pokémon (Filtres, Tri, Pagination)
 * @access  Public (Pas de protection)
 */
router.get('/', async (req, res) => {
    try {
        const { type, name, sort, page = 1, limit = 20 } = req.query;
        let filter = {};

        if (type) filter.type = type;
        if (name) filter['name.french'] = { $regex: name, $options: 'i' };

        let query = Pokemon.find(filter);

        if (sort) {
            query = query.sort(sort);
        } else {
            query = query.sort('id');
        }

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        query = query.skip(skip).limit(limitNum);

        const pokemons = await query;
        const total = await Pokemon.countDocuments(filter);

        res.status(200).json({
            count: pokemons.length,
            total,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
            data: pokemons
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération : ' + error.message });
    }
});

/**
 * @route   GET /api/pokemons/:id
 * @access  Public
 */
router.get('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({ id: req.params.id });
        if (!pokemon) return res.status(404).json({ error: 'Pokémon non trouvé' });
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- ROUTES PROTÉGÉES ---

/**
 * @route   POST /api/pokemons
 * @access  Privé (Auth requise)
 */
router.post('/', auth, async (req, res) => {
    try {
        const newPokemon = await Pokemon.create(req.body);
        res.status(201).json(newPokemon);
    } catch (error) {
        res.status(400).json({ error: 'Données invalides : ' + error.message });
    }
});

/**
 * @route   PUT /api/pokemons/:id
 * @access  Privé (Auth requise)
 */
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedPokemon = await Pokemon.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPokemon) {
            return res.status(404).json({ error: 'Pokémon inexistant' });
        }
        res.status(200).json(updatedPokemon);
    } catch (error) {
        res.status(400).json({ error: 'Mise à jour échouée : ' + error.message });
    }
});

/**
 * @route   DELETE /api/pokemons/:id
 * @access  Privé (Auth requise)
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedPokemon = await Pokemon.findOneAndDelete({ id: req.params.id });
        if (!deletedPokemon) {
            return res.status(404).json({ error: 'Pokémon inexistant' });
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression : ' + error.message });
    }
});

export default router;