import Note from "../Models/Note.js";
import errorHandler from "../utils/error.js";

const deleteNote = async (req, res, next) => {
    try {
        const { noteId } = req.params;

        const note = await Note.findOne({ _id: noteId, userId: req.user.id })
        if (!note) {
            return next(errorHandler(404, "Note not found"));
        }

        await note.deleteOne();
        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        })
    }
    catch (err) {
        return next(errorHandler(500, err.message || "Internal Server error"));
    }
}
export default deleteNote;