import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    favorites: [{ 
        type: Number 
    }]
}, { timestamps: true });


// Middleware "pre-save" : version moderne sans l'argument next
userSchema.pre('save', async function() {
    // Si le mot de passe n'a pas été modifié, on s'arrête là
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // Pas besoin de next() ici, Mongoose comprend que c'est fini 
        // quand la fonction async se termine.
    } catch (error) {
        // Si tu as une erreur, tu la "throw", Mongoose s'occupe du reste
        throw error;
    }
});

// Méthode pour vérifier le mot de passe lors de la connexion
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);