export default function Check({ value, title, onChange }:
    { value: boolean, title: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {

    return (
        <>
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-left text-black">{title}</legend>
                <input type="checkbox" checked={value} className="h-10 w-10 rounded-xl border-gray-400 bg-transparent text-black" onChange={onChange} />
            </fieldset>
        </>
    );
}