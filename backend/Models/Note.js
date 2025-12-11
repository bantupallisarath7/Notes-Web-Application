import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        require: true
    },
    tags: {
        type: [String],
        default: []
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});
const Note = mongoose.model("Notes", noteSchema);
export default Note;