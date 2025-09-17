import { Table, TableRow, Pagination } from '../../components'
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GET, POST, SafeFetchJson } from '../../helpers/fetch';
import type { AccountFilterOptions } from '../../models/AccountFilterOptions';
import type { AccountFilterValues } from '../../models/AccountFilterValues';
import type { ColumnData } from '../../models/ColumnData';
import ColumnEditor, { OpenColumnEditor, LoadColumnData, SaveColumnData } from '../columEditor/ColumnEditor';
import TableFilter from '../tableFilter/TableFilter';
import type { SortData } from '../../models/SortData';
import type { Account } from '../../models/Account';
import { FaCheck, FaTimes } from 'react-icons/fa';


type Pagination = {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasMore?: boolean;
};

type AccountWrapper = {
    data: Account[];
    pagination: Pagination;
};


export default function AccountTable() {

    const pageSize = 12;
    const [pageIndex, setPageIndex] = useState(0);

    // Add sorting
    const [sortData, setSortData] = useState<SortData<Account>>({ fieldName: "recordId", sortOrder: "ascending" });

    // When filter is updated, reload the data
    const [filterValues, setFilterValues] = useState<AccountFilterValues>({ accountName: "", registrationNumber: "", vatRegNo: "" });
    const applyFilter = (controlValue: string, name: string) => {
        if (name.endsWith("List"))
            name = name.substring(0, name.length - 4);
        setFilterValues({ ...filterValues, [name]: controlValue });
    }

    // Get the data from the API in a tanstack friendly way
    const loadAssetData = async (
        pageIndex: number,
        pageSize: number,
        sortData: SortData<Account>,
        filterValues: AccountFilterValues
    ): Promise<AccountWrapper> => {

        

        return SafeFetchJson(
            `api/GetAccount/${pageIndex}/${pageSize}`,
            POST({ sortValues: sortData, filterValues: filterValues })
        );
    };

    const { data: assetWrapper } = useQuery({
        queryKey: ["assets", pageIndex, sortData, filterValues],
        queryFn: () => loadAssetData(pageIndex, pageSize, sortData, filterValues),
        staleTime: 5 * 60 * 1000, // cache for 5 minutes
    });



    // Use React Query data directly
    const accountData = assetWrapper?.data ?? [];
    const pagination = assetWrapper?.pagination;


    // Load filter options from server
    const [filterOptions, setFilterOptions] = useState<AccountFilterOptions>({ accountName: [], registrationNumber: [], vatRegNo: [] });
    useQuery({
        queryKey: ["customerfilter"],
        queryFn: () => getCustomerFilter()
    });
    const getCustomerFilter = async () => {
        const data = await SafeFetchJson(`api/GetAccountFilter`, GET());
        setFilterOptions(data);
        return data;
    }


    // What happens when the View button is clicked
    const viewClick = (index: number) => {
        alert(index);
    }

    // Handle column editor
    useEffect(() => {
        setColumnData(LoadColumnData("liststructure_account", resetList));
    }, []);
    const resetList = () => {
        return [
            { id: 0, active: true, name: "recordId", text: "Record ID", sortable: true },
            { id: 1, active: true, name: "accountName", text: "Account Name", sortable: true },
            { id: 3, active: true, name: "vatRegNo", text: "VAT", sortable: true },
            { id: 4, active: true, name: "operationalUIAccess", text: "Operational UI Access", sortable: false },
            { id: 5, active: false, name: "registrationNumber", text: "Reg no", sortable: false },
            { id: 6, active: false, name: "accountClassId", text: "Account Class", sortable: false },
            { id: 7, active: false, name: "lastUpdateMessageDateTime", text: "Last Updated", sortable: false },
            { id: 8, active: true, name: "archived", text: "Archived", sortable: false },
            { id: 8, active: false, name: "archivedDateTime", text: "Archived Date", sortable: false },
            { id: 9, active: false, name: "enforceTermsAndConditions", text: "Enforce T&C", sortable: false },
        ]
    }
    const [columnData, setColumnData] = useState<ColumnData[]>(LoadColumnData("liststructure_account", resetList));
    useEffect(() => {
        SaveColumnData("liststructure_account", columnData);
    }, [columnData])

    return (
        <>
            <ColumnEditor columnData={columnData} setColumnData={setColumnData} resetColumnData={resetList}></ColumnEditor>

            <TableFilter applyFilter={applyFilter} filterData={filterOptions} onEditColumn={OpenColumnEditor}></TableFilter>

            <Table<Account> columnData={columnData} onViewClick={viewClick} setSortData={setSortData} sortData={sortData}>
                {
                    accountData.map((item, index) =>
                        <TableRow index={index} onViewClick={viewClick} viewText="Edit"> 
                            {columnData != null && columnData.map((column: ColumnData) => {
                                if (column.active) {

                                    if (typeof item[column.name as keyof typeof item] == "boolean")
                                        return <td> {item[column.name as keyof typeof item] ? <FaCheck className="inline" /> : <FaTimes className="inline" />} </td>
                                    else
                                        return <td>{item[column.name as keyof typeof item]}</td>
                                }
                            })}
                        </TableRow>
                    )
                }
            </Table>

            {typeof pagination != 'undefined' && <Pagination data={pagination} updatePage={setPageIndex}></Pagination>}

        </>
    )
}