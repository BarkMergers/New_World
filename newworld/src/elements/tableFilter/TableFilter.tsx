import { FaColumns } from 'react-icons/fa';



export default function TableFilter({ onEditColumn, filterData, applyFilter }: { onEditColumn?: () => void, filterData: object, applyFilter: (value1: string, value2: string) => void }) {
    return (

        <div className="card card-border bg-base-200 text-base-content my-1">
            <div className="card-body flex-row px-1 py-1">



                {
                    Object.entries(filterData).map(([key, value]) => (


                        Array.isArray(value) ?

                                value.length == 0 ? <select key={key} className="select filter-select h-8"><option>Loading...</option></select> :
                                <select key={key} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => applyFilter(e.target.value, key)} className="select filter-select h-8">
                                    <option value="">Filter {key}...</option>
                                    <optgroup label="Options">{value != null && value.map((i: string) => <option key={i}>{i}</option>)} </optgroup> 
                                </select>

                            :

                            <input type="search" key={key} placeholder={`Filter ${key}...`} className="input" onChange={(e: React.ChangeEvent<HTMLInputElement>) => applyFilter(e.target.value, key)}></input>


                    ))
                }



                {onEditColumn != undefined &&
                    <span className="flex-grow text-right">
                        <button className="btn btn-info mx-1 h-8" onClick={onEditColumn}><FaColumns className="inline" /></button>
                    </span>
                }

            </div>
        </div>
    );
}
