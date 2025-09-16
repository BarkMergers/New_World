import { Table, TableRow, Pagination } from '../../components'
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { POST, SafeFetchJson } from '../../helpers/fetch';
import type { pagination } from '../../models/Pagination';
import type { AccountFilterOptions } from '../../models/AccountFilterOptions';
import type { AccountFilterValues } from '../../models/AccountFilterValues';
import { useContext } from "react";
import type { GlobalData } from '../../models/GlobalData';
import { UserContext } from '../../helpers/globalData';
import type { ColumnData } from '../../models/ColumnData';
import ColumnEditor, { OpenColumnEditor, LoadColumnData, SaveColumnData } from '../columEditor/ColumnEditor';
import TableFilter from '../tableFilter/TableFilter';
//import { useNavigate } from 'react-router-dom';
import type { SortData } from '../../models/SortData';
import type { Account } from '../../models/Account';

export default function AccountTable() {

    //const navigate = useNavigate()

    const pageSize = 12;
    const [accountData, setAccountData] = useState<Account[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pagination, setPagination] = useState<pagination>({ pageId: 0, totalPages: 0});

    const globalData: GlobalData = useContext(UserContext);

    type AccountWrapper = {
        data: Account[];
        pagination: pagination;
    }

    // Load data from server
    const { data: AccountWrapper } = useQuery({
        queryKey: ["todo", pageIndex],
        queryFn: () => loadAccountData(pageIndex)
    });
    const loadAccountData = async (newPageIndex: number) => {
        newPageIndex = newPageIndex || 0;
        globalData.SetSpinnerVisible(true);
        const newData: AccountWrapper = await SafeFetchJson(`api/GetAccount/${newPageIndex}/${pageSize}`, POST({ sortValues: sortData, filterValues: filterValues }));
        setAccountData(newData.data);
        setPagination(newData.pagination);
        setPageIndex(newPageIndex);
        globalData.SetSpinnerVisible(false);
        return accountData;
    }
    const updatePage = (localPageIndex: number) => {
        setPageIndex(localPageIndex * pageSize);
    }





    // Load filter options from server
    const [filterOptions] = useState<AccountFilterOptions>({ recordId: ["1", "2"], accountName: ["a", "b"] });
    //useQuery({
    //    queryKey: ["accountfilter"],
    //    queryFn: () => getAccountFilter()
    //});
    //const getAccountFilter = async () => {
    //    const data = await SafeFetchJson(`api/GetAccountFilter`, GET());
    //    setFilterOptions(data);
    //    return data;
    //}setFilterOptions






    // When filter is updated, reload the data
    const [filterValues, setFilterValues] = useState<AccountFilterValues>({ recordId: "", accountName: "" });
    useEffect(() => {
        loadAccountData(pageIndex);
    }, [filterValues])
    const applyFilter = (controlValue: string, name: string) => {
        if (name.endsWith("List"))
            name = name.substring(0, name.length - 4);
        setFilterValues({ ...filterValues, [name]: controlValue });
    }





    // What happens when the View button is clicked
    const viewClick = (index: number) => {
        alert(index);
        //globalData.ShowConfirmation("Are you sure you want to edit this record?", "Customer", "question", () => {
        //    navigate(`/customer/${customerData[index].recordId}`)
        //})
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
            { id: 4, active: true, name: "operationalUIAccess", text: "Operational UI Access", sortable: true },
            { id: 5, active: false, name: "registrationNumber", text: "Reg no", sortable: true },
            { id: 6, active: false, name: "accountClassId", text: "Account Class", sortable: true },
            { id: 7, active: false, name: "lastUpdateMessageDateTime", text: "Last Updated", sortable: true },
            { id: 8, active: false, name: "archivedDateTime", text: "Archived", sortable: true },
            { id: 9, active: false, name: "enforceTermsAndConditions", text: "Enforce T&C", sortable: true },
        ]
    }
    const [columnData, setColumnData] = useState<ColumnData[]>(LoadColumnData("liststructure_account", resetList));
    useEffect(() => {
        SaveColumnData("liststructure_account", columnData);
    }, [columnData])






    // Add sorting
    const [sortData, setSortData] = useState<SortData<Account>>({ fieldName: "recordId", sortOrder: "ascending" });
    useEffect(() => {
        loadAccountData(pageIndex);
    }, [sortData])




    return (
        <>
            <ColumnEditor columnData={columnData} setColumnData={setColumnData} resetColumnData={resetList}></ColumnEditor>

            <TableFilter applyFilter={applyFilter} filterData={filterOptions} onEditColumn={OpenColumnEditor}></TableFilter>

            <Table<Account> columnData={columnData} onViewClick={viewClick} setSortData={setSortData} sortData={sortData}>
                {
                    accountData.map((item, index) =>
                        <TableRow index={index} onViewClick={viewClick} viewText="Edit"> 
                            {columnData != null && columnData.map((column: ColumnData) => {
                                return <td>{item[column.name as keyof typeof item]}</td>
                            })}
                        </TableRow>
                    )
                }
            </Table>

            <Pagination data={pagination} updatePage={updatePage}></Pagination>
        </>
    )
}

