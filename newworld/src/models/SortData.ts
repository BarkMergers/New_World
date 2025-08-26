export type SortData<T> = {
    fieldName: keyof T;
    sortOrder: "ascending" | "decending";
}
