import './Pagination.css';
import type { pagination } from '../../models/Pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';



export default function Pagination({ data, updatePage }: { data: pagination, updatePage: (value1: number) => void }) {

    const buttons = data == null ? [] : Array(data.totalPages).fill(null).map((_, i) => i);



    const truncatedList = (buttons : number[]) => {

        const components = [];

        for (let i = 0; i < 3; i++) {
            components.push(<span key={i} className={"join-item btn " + (data.pageId == i ? "btn-primary" : "")} onClick={() => updatePage(i)}>{i + 1}</span>);
        }

        components.push(<span key={data.pageId - 1} className={"ms-3 join-item btn"} onClick={() => updatePage(data.pageId - 1)}><FaChevronLeft className="inline" /></span>);

        components.push(<span key={data.pageId} className={"join-item btn " + (data.pageId == data.pageId ? "btn-primary" : "")}>{data.pageId + 1}</span>);

        components.push(<span key={data.pageId + 1} className={"me-3 join-item btn"} onClick={() => updatePage(data.pageId + 1)}><FaChevronRight className="inline" /></span>);



        for (let i = buttons.length - 3; i < buttons.length; i++) {
            components.push(<span key={i} className={"join-item btn " + (data.pageId == i ? "btn-primary" : "")} onClick={() => updatePage(i)}>{i + 1}</span>);
        }

        return components;

    }



    return (
        <div className="text-center">
            <span className="join">


                

                {data != null &&

                    buttons.length < 9 ?

                    (buttons.map((buttonId, i) => {
                    const active = i == data.pageId ? "btn-primary" : "";
                    return (<span key={i} className={"join-item btn " + active} onClick={() => updatePage(i)} >
                            {buttonId + 1}
                        </span>);
                    }))

                    :

                    
                    truncatedList(buttons)


         
                    


                    }
            </span>
        </div>
    );
}