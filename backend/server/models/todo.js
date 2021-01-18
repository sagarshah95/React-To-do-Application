import mongoose from "mongoose";

// Todo Schema in mongoose database.
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required."
    },
    description: {
        type: String,
        required: "Description is required."
    },
    dueDate: {
        type: Date,
        default: Date.now
    },
    dueTime: {
        type: Date,
        default:Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
});

TodoSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

TodoSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Todo', TodoSchema);