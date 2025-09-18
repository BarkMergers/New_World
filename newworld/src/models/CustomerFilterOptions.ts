import type { FilterDefinition } from "./FilterDefinition";

export type CustomerFilterOptions = {
    status: FilterDefinition;
    fineOperator: FilterDefinition;
    issuer: FilterDefinition;
}