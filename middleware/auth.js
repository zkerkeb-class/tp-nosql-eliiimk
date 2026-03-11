import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        // 1. Récupérer le header Authorization (ex: "Bearer <token>")
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Accès refusé. Aucun token fourni." });
        }

        // 2. Extraire le token (on enlève le mot "Bearer ")
        const token = authHeader.replace('Bearer ', '');

        // 3. Vérifier le token avec la clé secrète du .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Ajouter les infos de l'utilisateur à la requête pour les étapes suivantes
        req.user = decoded;

        // 5. Passer au contrôleur suivant
        next();
    } catch (error) {
        res.status(401).json({ error: "Token invalide ou expiré." });
    }
};

export default auth;