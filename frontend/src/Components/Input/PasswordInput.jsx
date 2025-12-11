import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }
    return <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3  border-slate-200">
        <input
            type={isShowPassword ? "text" : "password"}
            value={value}
            placeholder="Password"
            className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
            onChange={onChange} />
        {isShowPassword ? (<FaRegEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={toggleShowPassword} />) : (<FaRegEye size={22} className="text-primary cursor-pointer" onClick={toggleShowPassword} />)}
    </div>
}
export default PasswordInput;