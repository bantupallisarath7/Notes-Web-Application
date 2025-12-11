import Note from "../Models/Note.js";
import errorHandler from "../utils/error.js";

const createNote = async (req, res, next) => {
    try {
        const { title, content, tags } = req.body
        const { id } = req.user
        if (!title) {
            return next(errorHandler(400, "Title is requrired"));
        }
        if (!content) {
            return next(errorHandler(400, "Content is required"));
        }
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: id
        });
        await note.save();
        res.status(200).json({
            success: true,
            message: "Note added Successfully"
        })
    }
    catch (err) {
        next(errorHandler(500, err.message || "Internal Server error"));
    }
}
export default createNote;