export default function LocalDate({ value }: { value: string }) {
    const dateValue = new Date(value);
    const formattedDate = dateValue.toLocaleString();

    return (
        <>
            {formattedDate}
        </>
    );
}