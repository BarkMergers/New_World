import type { ReactNode } from 'react';
import './Panel.css'

export default function Panel({ children }: { children: ReactNode }) {
    return (
        <>



            <div className="flex-grow p-3">
                <div className="card card-border bg-base-200 text-base-content my-1 min-h-100 p-4">
                    <div className="card-body flex-row px-1 py-1">
                        { children }
                    </div>
                </div>
            </div>
        </>    
    );
};