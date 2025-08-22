import type { ReactNode } from 'react';

export default function Label({ children, title }: { children: ReactNode, title: string}) {
    return (
        <>
            <fieldset className="fieldset label-container">
                <legend className="fieldset-legend text-left">{title}</legend>
                <span className="input label-style text-left" >{children}</span>
            </fieldset>
        </>
    );
}