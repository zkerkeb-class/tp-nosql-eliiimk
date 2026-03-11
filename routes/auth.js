import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Inscription d'un nouvel utilisateur
 */
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body; // Uniquement le body !
        
        if (!username || !password) {
            return res.status(400).json({ error: "Pseudo et mot de passe requis" });
        }

        const newUser = await User.create({ username, password });
        res.status(201).json({ message: "Utilisateur créé !", user: newUser.username });
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de l'inscription : " + error.message });
    }
});

/**
 * @route   POST /api/auth/login
 * @desc    Connexion et génération du Token JWT
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Vérifier si l'utilisateur existe
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Identifiants invalides" });
        }

        // 2. Comparer le mot de passe (via la méthode créée dans le modèle)
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Identifiants invalides" });
        }

        // 3. Générer le JWT
        // On stocke l'ID de l'utilisateur dans le token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Le token expire après 24 heures
        );

        res.json({ message: "Connexion réussie", token });

    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
});

export default router;