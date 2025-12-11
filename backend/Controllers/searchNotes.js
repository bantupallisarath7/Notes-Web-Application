import Note from "../Models/Note.js"
import errorHandler from "../utils/error.js"

const searchNotes = async (req, res, next) => {
    const { query } = req.query
    if (!query) {
        return next(errorHandler(400, "Search query is required"))
    }
    try {
        const matchingNotes = await Note.find({
            userId: req.user.id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } }
            ]
        })
        res.status(200).json({
            success: true,
            message: "notes matching the search query retrived successfully",
            notes: matchingNotes
        })
    } catch (error) {
        next(error);
    }
}
export default searchNotes