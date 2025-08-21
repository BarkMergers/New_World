import './Pagination.css';
import type { pagination } from '../../models/Pagination';

export default function Pagination({ data, updatePage }: { data: pagination, updatePage: (value1: number) => void }) {

    const buttons = data == null ? [] : Array(data.totalPages).fill(null).map((_, i) => i);

    return (
        <div className="text-center">
            <span className="join">
                {data != null && buttons.map((buttonId, i) => {
                    const active = i == data.pageId ? "btn-primary" : "";
                    return (<span key={i} className={"join-item btn " + active} onClick={() => updatePage(i)} >
                            {buttonId + 1}
                        </span>);
                    })
                    }
            </span>
        </div>
    );
}