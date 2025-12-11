import Note from "../Models/Note.js";
import errorHandler from "../utils/error.js";

const getAllNotes = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const notes = await Note.find({ userId }).sort({ isPinned: -1 });
        res.status(200).json({
            success: true,
            message: "All notes retrived successfully",
            notes
        });
    }
    catch (err) {
        return next(errorHandler(500, err.message || "Internal Server error"));
    }
}
export default getAllNotes;