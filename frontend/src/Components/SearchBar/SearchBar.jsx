import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
const SearchBar = ({ value, onChange, handleSearchClick, handleSearchKey, clearSearch }) => {
    return (<div className="w-40 sm:w-60 md:w-80 flex items-center px-4 bg-slate-100 rounded-md">
        <input
            type="text"
            placeholder="Search Notes"
            className="w-full text-xs bg-transparent py-[11px] outline-none"
            value={value}
            onChange={onChange}
            onKeyDown={handleSearchKey}
        />
        {value && <RxCross2 className="text-gray-500 text-lg cursor-pointer hover:text-black mr-3" onClick={clearSearch} />}
        <FaSearch className="text-gray-500 text-lg cursor-pointer hover:text-black mr-3"
            onClick={handleSearchClick} />

    </div>)
}
export default SearchBar;