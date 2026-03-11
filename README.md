Mon API Pokédex (Node/Express/MongoDB)
Salut ! Bienvenue sur mon projet d'API Pokémon. Je l'ai construit de A à Z pour apprendre à manipuler Node.js et les bases de données NoSQL. L'objectif était de créer un outil robuste capable de gérer un Pokédex complet tout en gardant une sécurité maximale pour les données.

Où j'en suis dans le projet ?
Ce projet suit un plan d'apprentissage structuré en plusieurs étapes. À ce jour, j'ai complété les parties suivantes :

Parties 1 à 3 : Mise en place du serveur Express, connexion à MongoDB Atlas et création du CRUD complet (Create, Read, Update, Delete) pour les Pokémon.

Partie 4 : Optimisation des requêtes avec l'ajout de filtres par type, de la recherche par nom, du tri et de la pagination.

Partie 5 : Sécurisation de l'API avec JWT (JSON Web Token) et hachage des mots de passe avec Bcrypt. Désormais, on ne peut pas modifier le Pokédex sans être connecté.

Partie 6.A (Terminée) : Implémentation du système de favoris. Chaque utilisateur peut maintenant marquer ses Pokémon préférés dans sa propre liste.

Note : Je me suis arrêté à la Partie 6.A. Les parties suivantes (Statistiques avancées 6.B, Validation 6.C et Système d'équipe 6.D) sont prévues pour une prochaine version !

Ma "Stack" Technique

Backend : Node.js & Express.
Base de données : MongoDB Atlas avec Mongoose.
Auth : Authentification JWT (Bearer Token).
Outils : Testé avec passion sur Insomnia.

Comment tester chez vous ?

Installation :
Bash
npm install

Configuration :
Créez un fichier .env avec votre MONGODB_URI et un JWT_SECRET.

Lancement :
Bash
npm run dev
Les routes que j'ai créées
Pour tout le monde (Public)

GET /api/pokemons : Pour explorer le Pokédex (avec filtres ?type=... ou recherche ?name=...).

GET /api/pokemons/:id : Pour voir la fiche détaillée d'un Pokémon.

Pour les dresseurs inscrits (Privé)

POST /api/auth/register : Pour créer ton compte.

POST /api/auth/login : Pour obtenir ton token de connexion.

POST /api/pokemons : Pour ajouter un nouveau Pokémon (Token requis).

POST /api/favorites/:id : Pour ajouter un Pokémon à tes favoris (Token requis).

GET /api/favorites : Pour voir uniquement ta liste de favoris.

