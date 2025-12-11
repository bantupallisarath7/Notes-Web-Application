import { useState } from "react";
import { FaPassport } from "react-icons/fa";
import PasswordInput from "../../Components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../../redux/user/userSlice";
import axios from "axios"
import { toast } from "react-toastify"


const Login = () => {
    const [formFields, setFormFields] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const submitLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(formFields.email)) {
            setErrors("please enter a valid email");
            return;
        }
        if (!formFields.password) {
            setErrors("please enter the password");
            return
        }
        setErrors("");
        // Login API
        try {
            dispatch(signInStart())
            const res = await axios.post("http://localhost:5000/api/signin",
                {
                    email: formFields.email,
                    password: formFields.password
                },
                { withCredentials: true }
            )
            if (res.data.success === false) {
                console.log(res.data);
                toast.error(res.data.message)
                dispatch(signInFailure(res.data.message))
            }
            toast.success(res.data.message)
            dispatch(signInSuccess(res.data.user));
            navigate("/")
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            dispatch(signInFailure(error.message))
        }

    }

    return (
        <div className="flex items-center justify-center mt-28">
            <div className="w-96  rounded bg-white px-7 py-10">
                <form onSubmit={submitLogin}>
                    <h4 className="text-2xl mb-7 text-center">Login</h4>

                    <input
                        type="text"
                        value={formFields.email}
                        placeholder="Email"
                        className="input-box"
                        onChange={(e) => setFormFields({ ...formFields, email: e.target.value })} />
                    <PasswordInput value={formFields.password} onChange={(e) => setFormFields({ ...formFields, password: e.target.value })} />
                    {errors && <p className="text-sm text-red-700 pb-1">{errors}</p>}
                    <button type="submit" className="btn-primary">LOGIN</button>

                    <p className="text-sm text-center mt-4">
                        Not registered yet?{" "}
                        <Link to={"/signup"} className="font-medium text-[#2B85ff] hover:underline">Create an account</Link>
                    </p>

                </form>
            </div>
        </div>)
}
export default Login;