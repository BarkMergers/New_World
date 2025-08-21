import type { ReactNode } from 'react';
import { useRef, useEffect } from 'react';

type ArrayWithSelect = {
    selected: boolean;
};

export default function Table({ children, header, selector = false, detail = false, updater, tableData }:
    { children: ReactNode, header: ReactNode, selector?: boolean, detail?: boolean, updater?: (value1: boolean, value2: number) => void, tableData?: ArrayWithSelect[] }) {

    const chkSelectAll = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (typeof tableData !== "undefined") {
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
                                {selector && <td><input ref={chkSelectAll} type="checkbox" onChange={(e) => updater!(e.target.checked, -1)} name="itemSelector" className="h-5 w-5 align-middle"></input></td>}
                                {header}
                                {detail && <td></td>}
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
