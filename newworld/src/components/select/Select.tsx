import './Select.css';

export default function Select({ title, value, data, onChange }: { title: string, value: string, data: (string)[], onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void } ) {
    return (
        <fieldset className="fieldset select-container">
            <legend className="fieldset-legend text-left text-black">{title}</legend>
            <select value={value} className="input select-style border-gray-400 bg-transparent text-black" onChange={onChange}>
                {data.map((item, i) => <option key={i} value={item}>{item}</option>)}
            </select>
        </fieldset>
    );
}