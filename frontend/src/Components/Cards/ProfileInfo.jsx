import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogOut, userInfo }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">{getInitials(userInfo?.username)}</div>
            <div>
                <p className="text-sm font-medium bg-slate-100">{userInfo?.username}</p>
            </div>
            <button className="text-sm font-medium bg-slate-400 rounded-md text-black hover:opacity-80 px-2 py-1 cursor-pointer"
                onClick={onLogOut}>Logout</button>
        </div>)
}
export default ProfileInfo;