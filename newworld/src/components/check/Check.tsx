export default function Check({ value, title, onChange }:
    { value: boolean, title: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {

    return (
        <>
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-left">{title}</legend>
                <input type="checkbox" checked={value} className="h-10 w-10" onChange={onChange} />
            </fieldset>
        </>
    );
}