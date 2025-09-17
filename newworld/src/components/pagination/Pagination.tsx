import './Pagination.css';
import type { pagination } from '../../models/Pagination';
import { FaBackward, FaForward } from 'react-icons/fa';
import { useState } from 'react';



export default function Pagination({ data, updatePage }: { data: pagination, updatePage: (value1: number) => void }) {

    const internalUpdatePage = (index: number) => {
        if (index < 0)
            index = 0
        setInternalPage(index);
        updatePage(index);
    }

    const [internalPage, setInternalPage] = useState(data.pageId);

    const shortList = () => {

        const buttons = data == null ? [] : Array(data.totalPages).fill(null).map((_, i) => i);

        return buttons.map((buttonId, i) => {
            const active = i == data.pageId ? "btn-primary" : "";
            return (<span key={i} className={"join-item btn " + active} onClick={() => updatePage(i)} >
                {buttonId + 1}
            </span>);
        })
    }

    const truncatedList = () => {
        const components = [];

        //components.push(<span className={"join-item btn"} onClick={() => internalUpdatePage(0)}><FaStepBackward className="inline" /></span>);
        components.push(<span className={"join-item btn"} onClick={() => internalUpdatePage(data.pageId - 1)}><FaBackward className="inline" /></span>);

        components.push(<span className="join-item btn">
            <input min="1" type="number" className="w-25 p-2 text-center" value={internalPage + 1} onBlur={() => internalUpdatePage(internalPage) }  onChange={(e) => setInternalPage(Number(e.target.value) - 1)}></input>
        </span>);

        components.push(<span className={"join-item btn"} onClick={() => internalUpdatePage(data.pageId + 1)}><FaForward className="inline" /></span>);
        //components.push(<span className={"join-item btn"} onClick={() => internalUpdatePage(buttons.length)}><FaStepForward className="inline" /></span>);

        return components;
    }

    return (
        <div className="text-center">
            <span className="join">
                {
                    data != null && data.totalPages != -1 ? shortList() : truncatedList()
                }
            </span>
        </div>
    );
}