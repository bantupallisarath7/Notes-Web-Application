import User from "../Models/User.js";
import errorHandler from "../utils/error.js"
import jwt from "jsonwebtoken"
import dotEnv from "dotenv"
import bcryptjs from "bcryptjs"
dotEnv.config();

const getUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, "User not Found"));
        }
        const validpassword = await bcryptjs.compare(password, user.password);
        if (!validpassword) {
            return next(errorHandler(202, "Invalid password"))
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            success: true,
            message: "signin successfully",
            user: {
                username: user.username,
                email: user.email,
            }

        })
    }
    catch (err) {
        next(errorHandler(500, err.message || "Internal Server Error"));
    }
}
export default getUser;