﻿import { useRef } from 'react'
import { ReactSortable } from "react-sortablejs";
import { FaGripVertical } from 'react-icons/fa'; // Font Awesome
import type { ColumnData } from '../../models/ColumnData';




export default function ColumnEditor({ columnData, setColumnData, resetColumnData }:
    { columnData: ColumnData[], setColumnData: React.Dispatch<React.SetStateAction<ColumnData[]>>, resetColumnData: () => ColumnData[] }) {
    const modalRef = useRef(null);



    const setColumnActive = (index: number, isActive:boolean) => {
        setColumnData(prev =>
            prev.map((col, i: number) =>
                i === index ? { ...col, active: isActive } : col
            )
        );
    };

    const handleESC = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        event.preventDefault();
    }

    return (
        <dialog ref={modalRef} id="dialog_tableEditor" className="modal" onCancel={handleESC}>
            <form method="dialog" className="modal-box text-center">
                <h3 className="text-center text-lg font-bold">Column Editor</h3>

                { columnData != null && 
                    <ReactSortable list={columnData} setList={(list: ColumnData[]) => setColumnData(list)} >
                        {columnData.map((column, i: number) => (
                            <div key={column.name} className="m-1 flex items-center rounded bg-gray-200 p-1 text-black hover:bg-blue-700">
                                <input style={{ height: "20px", width: "20px" }} onChange={(e) => setColumnActive(i, e.target.checked)} name={"vis_" + column.name} checked={column.active} type="checkbox" />
                                <span className="flex-grow px-2 text-left">{column.text}</span>
                                <FaGripVertical style={{ cursor: "ns-resize"}} />
                            </div>
                        ))}
                    </ReactSortable>
                }

                <div className="modal-action justify-center p-2" style={{ justifyContent: "center" }}>
                    <button type="button" className="btn btn-warning" onClick={() => setColumnData(resetColumnData)}>Reset</button>
                    <button className="btn btn-primary">Close</button>
                </div>

            </form>
        </dialog>
    );
}