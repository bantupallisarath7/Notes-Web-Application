import Note from "../Models/Note.js";
import errorHandler from "../utils/error.js";
const updateNote = async (req, res, next) => {
    try {
        const { noteId } = req.params
        const note = await Note.findById(noteId);
        if (!note) {
            return next(errorHandler(404, "Note is not found"))
        }
        if (req.user.id !== note.userId.toString()) {
            return next(errorHandler(403, "You are not Authenticated"));
        }

        const { title, content, tags, isPinned } = req.body;
        if (!title && !content && !tags) {
            return next(errorHandler(404, "No changes Provided"))
        }
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags.length !== 0) note.tags = [...tags]
        if (isPinned) note.isPinned = isPinned;
        await note.save();
        res.status(200).json({
            success: true,
            message: "updated successfully"
        })
    }
    catch (err) {
        return next(errorHandler(500, err.message || "Internal Server Error"));
    }
}
export default updateNote;