import './Select.css';

export default function Select({ title, value, data, onChange }: { title: string, value: string, data: (string)[], onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void } ) {
    return (
        <fieldset className="fieldset select-container">
            <legend className="fieldset-legend text-left">{title}</legend>
            <select value={value} className="input appearance-auto" onChange={onChange}>
                {data.map((item, i) => <option key={i} value={item}>{item}</option>)}
            </select>
        </fieldset>
    );
}