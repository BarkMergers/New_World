import Avatar from '../../components/avatar/Avatar';
import { FaSearch } from 'react-icons/fa';

export default function TitleBar({ title = "NewWorld" }: { title?: string }) {

    return (
        <div className="jaama-panel my-1 flex flex-row items-center gap-2 rounded-lg px-4 py-1">
            <span className="grow text-left">
                {title}
            </span>
            <span>
                <div className="input search border-gray-400 bg-transparent">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search vehicle..." className="search-input bg-transparent" />
                </div>
            </span>

            <Avatar size={2.5}></Avatar>
        </div>
    )
}