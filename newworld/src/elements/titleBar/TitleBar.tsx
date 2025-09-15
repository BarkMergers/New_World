import { Avatar } from '../../components'
import { FaSearch } from 'react-icons/fa';
import { FaPaintBrush } from 'react-icons/fa';
import { GetSubdomain } from '../../helpers/signin';
import type { AccountInfo } from '@azure/msal-browser';

export default function TitleBar({ accounts, title = "NewWorld" }: { title?: string, accounts: AccountInfo[] }) {

    const setTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
        document.body.setAttribute("data-theme", e.target.value);
    }





    return (
        <div className="card card-border bg-base-200 text-base-content my-1">
            <div className="card-body flex-row items-center px-5 py-1">

                <span className="grow text-left text-lg">
                    {title} { GetSubdomain() }
                </span>

                <span>
                    <div className="select flex items-center gap-2 ps-0">

                        <FaPaintBrush className="h-5 w-[18px] min-w-[36px] text-current" />

                        <select onChange={setTheme} className="text-base-content border-none focus:ring-0 focus:outline-none">
                            <option>light</option>
                            <option>dark</option>
                            <option>retro</option>
                            <option>aqua</option>
                            <option>dim</option>
                            <option>garden</option>
                            <option>forest</option>
                        </select>
                    </div>
                </span>

                <span>
                    <div className="input search">
                        <FaSearch className="h-5 w-[18px] min-w-[36px] text-current" />
                        <input type="text" placeholder="Search vehicle..." className="search-input" />
                    </div>
                </span>

                <Avatar size={2.5} title={accounts.length == 0 ? "" : accounts[0].name}></Avatar>

            </div>
        </div>
    )
}