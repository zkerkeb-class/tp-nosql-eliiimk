import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: {
        english: String,
        japanese: String,
        chinese: String,
        french: String
    },
    type: [String],
    base: {
        HP: Number,
        Attack: Number,
        Defense: Number,
        SpecialAttack: Number,
        SpecialDefense: Number,
        Speed: Number
    },
    image: String
});

export default mongoose.model('Pokemon', pokemonSchema);