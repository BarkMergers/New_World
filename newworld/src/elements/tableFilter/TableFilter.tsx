import './TableFilter.css';
//import { FaSearch } from 'react-icons/fa';
import React from "react";
import type { AgentFilterOptions } from '../../models/AgentFilterOptions';

export default function TableFilter({ openEditor, filterData, applyFilter }: { openEditor: () => void, filterData: AgentFilterOptions, applyFilter: (value1: string, value2: string) => void }) {
    return (

        <div class="card card-border bg-base-200 text-base-content my-1">
            <div class="card-body p-1 flex-row">


                {/*<select className="select mx-1 h-8 min-h-0 align-middle"><option>Show all</option><option>Show active</option></select>*/}
                {/*<div className="input search-container">*/}
                {/*    <FaSearch className="search-icon" />*/}
                {/*    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => applyFilter(e.target.value, "text")} type="text" placeholder="Search vehicle..." className="search-input" style={{ border:"none", background:"none" }} />*/}
                {/*</div>*/}

                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => applyFilter(e.target.value, "name")} className="select filter-select h-8"><option value="">Name...</option>
                    {filterData?.name != null && filterData.name.map((i: string) => <option key={i}>{i}</option>)}
                </select>

                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => applyFilter(e.target.value, "job")} className="select filter-select h-8"><option value="">Job...</option>
                    {filterData?.job != null && filterData.job.map((i: string) => <option key={i}>{i}</option>)}
                </select>
            
                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => applyFilter(e.target.value, "color")} className="select filter-select h-8"><option value="">Color...</option>
                    {filterData?.color != null && filterData.color.map((i: string) => <option key={i}>{i}</option>)}
                </select>

                <button className="btn btn-info float-right mx-1 h-8" onClick={openEditor}>Manage Columns</button>

            </div>
        </div>
    );
}
