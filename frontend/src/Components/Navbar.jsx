import { useState } from "react";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess, signOutFailure, signOutStart, signOutSuccess } from "../../redux/user/userSlice";
import axios from "axios"
import { toast } from "react-toastify"

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleSearchKey = (e) => {
        if (e.key === "Enter" && searchQuery) {
            onSearchNote(searchQuery);
        }
    };

    const handleSearchClick = () => {
        if (searchQuery) {
            onSearchNote(searchQuery);
        }
    };
    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch()
    }

    const onLogOut = async () => {
        try {
            dispatch(signOutStart())
            const res = await axios.get("http://localhost:5000/api/signout",
                { withCredentials: true }
            )
            if (res.data.success === false) {
                dispatch(signOutFailure(res.data.message));
                toast.error(res.data.message)
            }
            toast.success(res.data.message)
            dispatch(signOutSuccess())
            navigate("/login")
        } catch (error) {
            toast.error(error.message)
            dispatch(signOutFailure(error))
        }
    }
    return (
        <div className="sticky bg-white flex items-center justify-between px-6 py-2 drop-shadow"  >
            <h1 className="text-xl font-medium text-black py-2" >
                <Link to={"/"}>
                    <span className="text-gray-400">Good</span>
                    <span className="text-slate-900">Notes</span>
                </Link>
            </h1>
            <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearchKey={handleSearchKey}
                handleSearchClick={handleSearchClick}
                clearSearch={onClearSearch}
            />
            <ProfileInfo
                userInfo={userInfo}
                onLogOut={onLogOut} />
        </div>
    )
}
export default Navbar;