import Note from "../Models/Note.js"
import errorHandler from "../utils/error.js";

const updateIsPinned = async (req, res, next) => {
    try {
        const noteId = req.params.noteId
        const note = await Note.findById(noteId);;
        if (!note) {
            return next(errorHandler(404, "Note not found"));
        }
        if (req.user.id !== note.userId) {
            return next(errorHandler(401, "Unauthorized"));
        }
        const { isPinned } = req.body
        note.isPinned = isPinned;
        await note.save();
        res.status(200).json({
            success: true,
            message: note.isPinned ? "Note Pinned Successfully" : "Note Unpinned Successfully",
        })
    }
    catch (err) {
        return next(errorHandler(500, err.message || 'Internal Server Error'));
    }
}
export default updateIsPinned;