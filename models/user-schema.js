import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 15,
        match: /[A-Za-z0-9_]+$/,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 15
    }
});

userSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
});

export default mongoose.model('user', userSchema);