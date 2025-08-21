import type { ReactNode } from 'react';
import './Label.css';

export default function Label({ children, title }: { children: ReactNode, title: string}) {
    return (
        <>
            <fieldset className="fieldset label-container">
                <legend className="fieldset-legend text-left text-black">{title}</legend>
                <span className="input label-style text-left text-black" >{children}</span>
            </fieldset>
        </>
    );
}