import type { ReactNode } from 'react';
import { FaColumns, FaRecycle } from 'react-icons/fa';
import type { FilterDefinition } from '../../models/FilterDefinition';
import MultilistFilter from './customFilters/multilistFilter';
import IntMultilistFilter from './customFilters/intMultilistFilter';
import DateFilter from './customFilters/dateFilter';


//{/*                        <li><a onClick={() => { document.activeElement?.blur(); navigate('/plain') }}>User Details</a></li>*/ }
//{/*<li><a onClick={() => { document.activeElement?.blur(); handleLogout() }}>Log Out</a></li>*/ }

export default function TableFilter({ onEditColumn, filterData, applyFilter, onRefreshData }:
    { onEditColumn?: () => void, onRefreshData?: () => void, filterData: object, applyFilter: (value1: string, value2: string) => void }) {

    const createFilter = (key: string, value: FilterDefinition): ReactNode => {

        switch (value.type) {

            case "multilist":
                return (
                    <MultilistFilter value={value} applyFilter={applyFilter} filterKey={key}></MultilistFilter>
                )

            case "intMultilist":
                return (
                    <IntMultilistFilter value={value} applyFilter={applyFilter} filterKey={key}></IntMultilistFilter>
                )

            case "list":
                return (
                    <select key={key} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => applyFilter(e.target.value, key)} className="select filter-select h-8">
                        <option value="">Filter {value.description}...</option>
                        <optgroup label="Options">{value.data != null && value.data.map((i: string) => <option key={i}>{i}</option>)} </optgroup>
                    </select>
                )

            case "numberlist":
                return (
                    <select key={key} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => applyFilter(e.target.value, key)} className="select filter-select h-8">
                        <option value="">Filter {value.description}...</option>
                        <optgroup label="Options">{value.intData != null && value.intData.map((i: number) => <option key={i}>{i}</option>)} </optgroup>
                    </select>
                )

            case "number":
                return (
                    <input type="number" key={key} placeholder={`Filter ${value.description}...`} className="input h-8" onChange={(e: React.ChangeEvent<HTMLInputElement>) => applyFilter(e.target.value, key)}></input>
                )

            case "text":
                return (
                    <input type="search" key={key} placeholder={`Filter ${value.description}...`} className="input h-8" onChange={(e: React.ChangeEvent<HTMLInputElement>) => applyFilter(e.target.value, key)}></input>
                )
            case "datetime":
                return <DateFilter value={value} applyFilter={applyFilter} filterKey={key}></DateFilter>

            default:
                return (
                    <select key={key} className="select filter-select h-8"><option>Loading...</option></select>
                )
        }
    }




    return (
        <div className="card card-border bg-base-200 text-base-content my-1">
            <div className="card-body flex-row px-1 py-1">


                {Object.entries(filterData).map(([key, value]) => (
                    <>
                        { createFilter(key, value) }
                    </>
                ))}



                <span className="flex-grow text-right">
                {
                    onRefreshData != undefined &&
                        <button title="Reset data" className="btn btn-info mx-1 h-8" onClick={onRefreshData}><FaRecycle /></button>
                }

                {
                    onEditColumn != undefined &&
                        <button title="Manage columns" className="btn btn-info mx-1 h-8" onClick={onEditColumn}><FaColumns /></button>
                }
                </span>

            </div>
        </div>
    );
}