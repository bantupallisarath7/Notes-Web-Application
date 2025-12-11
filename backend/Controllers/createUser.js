import User from "../Models/User.js"
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs"
const createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const isExist = await User.findOne({ email }).select("-password")
        if (isExist) {
            return next(errorHandler(400, "User already exist"));
        }
        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save()
        res.status(200).json({
            success: true,
            message: "created successfully"
        })
    }
    catch (err) {
        next(errorHandler(500, err.message || "Internal Server Error"));
    }
}
export default createUser;
