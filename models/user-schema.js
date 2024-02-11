import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

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

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next()
    } catch (error) {
        return next(error);
    }
});

// Compare the provided password with the stored hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
}


userSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.password; // Exclude password from JSON output
    },
});

export default mongoose.model('user', userSchema);