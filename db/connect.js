import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // On récupère l'URI depuis les variables d'environnement
        const uri = process.env.MONGODB_URI;
        
        if (!uri) {
            throw new Error("MONGODB_URI est manquante dans le fichier .env");
        }

        await mongoose.connect(uri);
        
        console.log('✅ Connecté à MongoDB !');
    } catch (error) {
        console.error('❌ Erreur de connexion à MongoDB :', error.message);
        // On arrête le processus si la connexion échoue
        process.exit(1);
    }
};

export default connectDB;