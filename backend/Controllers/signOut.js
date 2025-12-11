import errorHandler from "../utils/error.js";

const signOut = (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json({
            success: true,
            message: "user logged out successfully"
        })
    }
    catch (err) {
        next(errorHandler(500, err.message || "Internal Server Error"));
    }
}

export default signOut;