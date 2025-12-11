import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment"
const NoteCard = ({ title, date, content, tags, isPinned, onPinNote, onEdit, onDelete }) => {
    return (
        <div className="rounded-md p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-sm font-medium">
                        {title}
                    </h6>
                    <span className="text-sm text-green-700">{moment(date).format("Do MMM YYYY, h:mm A")}</span>
                </div>
                <MdOutlinePushPin
                    className={`icon-btn ${isPinned ? "text-[#2b85ff]" : "text-slate-300"} hover:text-[#2b85ff]`}
                    onClick={onPinNote}
                />
            </div>
            <p className="text-xs text-slate-600 mt-2">
                {content?.slice(0, 60)}
            </p>
            <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-slate-500">{tags.map((tag) => `#${tag}  `)}</div>
                <div className="flex items-center gap-2">
                    <MdCreate className="icon-btn hover:text-green-500"
                        onClick={onEdit}
                    />
                    <MdDelete className="icon-btn hover:text-red-700"
                        onClick={onDelete} />
                </div>
            </div>

        </div>
    )
};
export default NoteCard;