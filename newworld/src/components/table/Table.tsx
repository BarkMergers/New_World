import type { ReactNode } from 'react';
import { useRef, useEffect } from 'react';
import type { ColumnData } from '../../models/ColumnData';
import type { ArrayWithSelect } from '../../models/ArrayWithSelect';
import type { SortData } from '../../models/SortData';
import './Table.css'

export default function Table<T>({ children, columnData, onSelect, tableData, onViewClick, sortData, setSortData }:
    {
        children: ReactNode,
        columnData: ColumnData[],
        onSelect?: (value1: boolean, value2: number) => void,
        tableData?: ArrayWithSelect[],
        onViewClick?: (value1: number) => void,
        sortData?: SortData<T>,
        setSortData?: React.Dispatch<React.SetStateAction<SortData<T>>>
    }) {

    const internalTestSorter = (fieldName: keyof T) => {
        if (sortData!.fieldName == fieldName) {
            setSortData!({
                fieldName: fieldName,
                sortOrder: sortData!.sortOrder == "ascending" ? "decending" : "ascending"
            });
        }
        else {
            setSortData!({
                fieldName: fieldName,
                sortOrder: "ascending"
            });
        }
    }

    const showSelector = onSelect !== undefined;
    const showView = onViewClick !== undefined;

    const getHeader = () => {
        return columnData != null && columnData.map((column: ColumnData) => {
            if (column.sortable && setSortData !== undefined && sortData != undefined) {
                let classList: string = "sortable";
                if (sortData.fieldName == column.name as keyof T) {
                    classList += sortData.sortOrder == "ascending" ? " sortDown" : " sortUp"
                }
                return column.active && <td className={classList} key={column.name} onClick={() => internalTestSorter!(column.name as keyof T)}>{column.text}</td>
            }
            else {
                return column.active && <td key={column.name}>{column.text}</td>
            }

        });
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
                                {showView && <td></td>}
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
