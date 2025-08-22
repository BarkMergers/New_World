export default function Input({ value, title, placeholder, type, onChange }:
    { value: string | number, title: string, placeholder?: string, type: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {

    return (
        <>
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-left">{title}</legend>
                <input type={type} value={value} className="input" placeholder={placeholder} onChange={onChange} />
            </fieldset>
        </>
    );
}