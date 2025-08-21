import Avatar from '../../components/avatar/Avatar';
import { FaSearch } from 'react-icons/fa';
import { FaPaintBrush } from 'react-icons/fa';
import React from "react";

export default function TitleBar({ title = "NewWorld" }: { title?: string }) {


    const setTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
        document.body.setAttribute("data-theme", e.target.value);
    }


    return (
        <div class="card card-border bg-base-200 text-base-content my-1">
            <div class="card-body p-1 flex-row items-center">

                <span className="grow text-left">
                    {title}
                </span>

                <span>

                    <div class="flex items-center gap-2 select ps-0">

                        <FaPaintBrush className="h-5 w-[18px] min-w-[36px] text-current" />

           

                        <select onChange={setTheme}
                            className="text-base-content border-none focus:ring-0 focus:outline-none"
                        >
                            <option>light</option>
                            <option>dark</option>
                            <option>acid</option>
                            <option>bumblebee</option>
                            <option>cupcake</option>
                        </select>
                    </div>


                </span>

                <span>
                    <div className="input search">
                        <FaSearch className="h-5 w-[18px] min-w-[36px] text-current" />
                        <input type="text" placeholder="Search vehicle..." className="search-input" />
                    </div>
                </span>



                <Avatar size={2.5}></Avatar>



            </div>
        </div>
    )
}