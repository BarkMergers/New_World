import type { ReactNode } from 'react';
import { FaColumns } from 'react-icons/fa';
import type { FilterDefinition } from '../../models/FilterDefinition';
import MultilistFilter from './customFilters/multilistFilter';



//{/*                        <li><a onClick={() => { document.activeElement?.blur(); navigate('/plain') }}>User Details</a></li>*/ }
//{/*<li><a onClick={() => { document.activeElement?.blur(); handleLogout() }}>Log Out</a></li>*/ }

export default function TableFilter({ onEditColumn, filterData, applyFilter }: { onEditColumn?: () => void, filterData: object, applyFilter: (value1: string, value2: string) => void }) {




    const createFilter = (key: string, value: FilterDefinition): ReactNode => {

        switch (value.type) {

            case "multilist":
                return (


                    <MultilistFilter value={value} applyFilter={applyFilter} filterKey={key} ></MultilistFilter>

                    //<div className="dropdown"

                    //    onBlur={(e) => {
                    //        if (!e.currentTarget.contains(e.relatedTarget)) {
                    //            const checkboxes = e.currentTarget.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
                    //            const checkedValues = Array.from(checkboxes)
                    //                .filter((c) => c.checked)
                    //                .map((c) => c.value);
                    //            applyFilter(JSON.stringify(checkedValues), key)


                    //            const labelText: string = checkedValues.join(", ");

                    //            setLabel(labelText == "" ? "" : `: ${labelText}` );
                    //        }
                    //    }}>

                    //    <label className="btn btn-accent h-8 align-top" tabIndex={0}>
                    //        <span className="filterDisplay">Filter {value.description}{label}</span>
                    //    </label>

                    //    <ul tabIndex={0} style={{ "zIndex": 100000 }} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow">
                    //        {value.data?.map((i, ii) =>
                    //            <li key={ii} className="flex-row">
                    //                <span className="inline-block"><input value={i} className="h-5 w-5" type="checkbox" /></span>
                    //                <span className="inline-block">{i}</span>
                    //            </li>
                    //        )}
                    //    </ul>

                    //</div>


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


                {
                    onEditColumn != undefined &&
                    <span className="flex-grow text-right">
                        <button className="btn btn-info mx-1 h-8" onClick={onEditColumn}><FaColumns className="inline" /></button>
                    </span>
                }


            </div>
        </div>
    );
}







//{
//    Object.entries(filterData).map(([key, value]) => {

//        createFilter(key, value)
//    };

//}


//Array.isArray(value) ?

//    value.length == 0 ? <select key={key} className="select filter-select h-8"><option>Loading...</option></select> :
//        <select key={key} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => applyFilter(e.target.value, key)} className="select filter-select h-8">
//            <option value="">Filter {key}...</option>
//            <optgroup label="Options">{value != null && value.map((i: string) => <option key={i}>{i}</option>)} </optgroup>
//        </select>

//    :
//    value == "custom" ?


//        <div className="dropdown">
//            <label className="btn btn-accent h-8 align-top" tabIndex={0}>
//                <span>Filter {key}</span>
//            </label>
//            <ul tabIndex={0} style={{ "zIndex": 100000 }} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow">
//                <li><a onClick={() => { document.activeElement?.blur(); navigate('/plain') }}>User Details</a></li>
//                <li><a onClick={() => { document.activeElement?.blur(); handleLogout() }}>Log Out</a></li>
//            </ul>
//        </div>

//        :
//        <input type="search" key={key} placeholder={`Filter ${key}...`} className="input" onChange={(e: React.ChangeEvent<HTMLInputElement>) => applyFilter(e.target.value, key)}></input>
//                    ))