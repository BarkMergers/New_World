import type { ReactNode } from 'react';
import { useRef, useEffect } from 'react';
import type { ColumnData } from '../../models/ColumnData';

type ArrayWithSelect = {
    selected: boolean;
};




export default function Table({ children, columnData, onSelect, tableData, onDetailClick }:
    { children: ReactNode, columnData: ColumnData[], onSelect?: (value1: boolean, value2: number) => void, tableData?: ArrayWithSelect[], onDetailClick?: (value1: number) => void }) {

    const showSelector = onSelect !== undefined;
    const showDetail = onDetailClick !== undefined;

    const getHeader = () => {
        return columnData != null && columnData.map((column: ColumnData) => { return column.active && <td>{column.text}</td> });
    }

    const chkSelectAll = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (typeof tableData !== "undefined" && chkSelectAll.current != null) {
            const hasTrueStatus = tableData!.some(x => x.selected === true);
            const hasFalseStatus = tableData!.some(x => x.selected === false || x.selected == null);
            if (hasTrueStatus && hasFalseStatus) {
                chkSelectAll.current!.indeterminate = true;
            }
            else {
                chkSelectAll.current!.checked = hasTrueStatus ? true : false;
                chkSelectAll.current!.indeterminate = false;

            }
        }
    }, [tableData])

    return (
        <>

            <div className="card card-border bg-base-200 text-base-content my-1">
                <div className="card-body flex-row p-1">
                    <table className="table">

                        <thead>
                            <tr>
                                {showSelector && <td><input ref={chkSelectAll} type="checkbox" onChange={(e) => onSelect!(e.target.checked, -1)} name="itemSelector" className="h-5 w-5 align-middle"></input></td>}
                                {getHeader()}
                                {showDetail && <td></td>}
                            </tr>
                        </thead>

                        <tbody>
                            {children}
                        </tbody>

                    </table>
                </div>
            </div>

        </>
    )
}
