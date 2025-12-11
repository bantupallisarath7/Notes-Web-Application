import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify"

const Signup = () => {
    const [formFields, setFormFields] = useState({ username: "", email: "", password: "" });
    const [errors, setErrors] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const submitSignup = async (e) => {
        e.preventDefault();

        if (!formFields.username) {
            setErrors("please enter username")
            return
        }
        if (!validateEmail(formFields.email)) {
            setErrors("please enter a valid email");
            return;
        }
        if (!formFields.password) {
            setErrors("please enter the password");
            return
        }
        setErrors("");
        // Signup API
        try {
            const res = await axios.post("http://localhost:5000/api/signup",
                {
                    username: formFields.username,
                    email: formFields.email,
                    password: formFields.password
                },
                { withCredentials: true })

            if (res.data.success === false) {
                setErrors(res.data.message)
                toast.error(res.data.message)
                return
            }
            setErrors("")
            toast.success(res.data.message)
            navigate("/login")
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
            setErrors(error.message)
        }
    }
    return (
        <>
            <div className="flex items-center justify-center mt-28">
                <div className="w-96  rounded bg-white px-7 py-10">
                    <form onSubmit={submitSignup}>
                        <h4 className="text-2xl mb-7 text-center">Sign Up</h4>

                        <input
                            type="text"
                            value={formFields.username}
                            placeholder="Username"
                            className="input-box"
                            onChange={(e) => setFormFields({ ...formFields, username: e.target.value })} />

                        <input
                            type="text"
                            value={formFields.email}
                            placeholder="Email"
                            className="input-box"
                            onChange={(e) => setFormFields({ ...formFields, email: e.target.value })} />
                        <PasswordInput value={formFields.password} onChange={(e) => setFormFields({ ...formFields, password: e.target.value })} />
                        {errors && <p className="text-sm text-red-700 pb-1">{errors}</p>}
                        <button type="submit" className="btn-primary">SIGNUP</button>

                        <p className="text-sm text-center mt-4">
                            Already have an account ?{" "}
                            <Link to={"/login"} className="font-medium text-[#2B85ff] hover:underline">Login</Link>
                        </p>

                    </form>
                </div>
            </div>
        </>
    )
}
export default Signup;