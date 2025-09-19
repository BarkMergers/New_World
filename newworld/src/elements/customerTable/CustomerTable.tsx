import { Table, TableRow, Pagination, NumberPlate, LocalDate } from '../../components'
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { POST, GET, SafeFetchJson } from '../../helpers/fetch';
import type { CustomerFilterOptions } from '../../models/CustomerFilterOptions';
import type { CustomerFilterValues } from '../../models/CustomerFilterValues';
import { useContext } from "react";
import type { GlobalData } from '../../models/GlobalData';
import { UserContext } from '../../helpers/globalData';
import type { ColumnData } from '../../models/ColumnData';
import ColumnEditor, { OpenColumnEditor, LoadColumnData, SaveColumnData } from '../columEditor/ColumnEditor';
import TableFilter from '../tableFilter/TableFilter';
import { useNavigate } from 'react-router-dom';
import type { Customer } from '../../models/Customer';
import type { SortData } from '../../models/SortData';


type Pagination = {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasMore?: boolean;
};

type CustomerWrapper = {
    data: Customer[];
    pagination: Pagination;
};



export default function CustomerTable() {


    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const pageSize = 3;
    const [pageIndex, setPageIndex] = useState(0);
    const globalData: GlobalData = useContext(UserContext);


    // Add sorting
    const [sortData, setSortData] = useState<SortData<Customer>>({ fieldName: "id", sortOrder: "ascending" });


    // When filter is updated, reload the data
    const [filterValues, setFilterValues] = useState<CustomerFilterValues>({ issuer: "", status: "", fineOperator: "" });
    const applyFilter = (controlValue: string, name: string) => {
        if (name.endsWith("List"))
            name = name.substring(0, name.length - 4);
        setFilterValues({ ...filterValues, [name]: controlValue });
    }


    // TanStack loader
    const loadAssetData = async (
        pageIndex: number,
        pageSize: number,
        sortData: SortData<Customer>,
        filterValues: CustomerFilterValues
    ): Promise<CustomerWrapper> => {
        return SafeFetchJson(
            `api/GetCustomer/${pageIndex}/${pageSize}`,
            POST({ sortValues: sortData, filterValues: filterValues }),
            globalData
        );
    };


    const sortKey = JSON.stringify(sortData);
    const filterKey = JSON.stringify(filterValues);

    const { data: assetWrapper } = useQuery({
        queryKey: ["customers", pageIndex, sortKey, filterKey],
        queryFn: () => loadAssetData(pageIndex, pageSize, sortData, filterValues),
        staleTime: 5 * 60 * 1000
    });

    // Function to clear TanStack cache named 'customers' 
    const onRefreshData = () => {
        queryClient.removeQueries({ queryKey: ['customers'] })
    };

    // Use React Query data directly
    const customerData = assetWrapper?.data ?? [];
    const pagination = assetWrapper?.pagination;


    // Load filter options from server
    const [filterOptions, setFilterOptions] = useState<CustomerFilterOptions>({ status: { type: "" }, fineOperator: { type: "" }, issuer: { type: "" } });
    useQuery({
        queryKey: ["customerfilter"],
        queryFn: () => getCustomerFilter()
    });
    const getCustomerFilter = async () => {
        const data = await SafeFetchJson(`api/GetCustomerFilter`, GET());
        setFilterOptions(data);
        return data;
    }






    // What happens when the View button is clicked
    const viewClick = (index: number) => {
        globalData.ShowConfirmation("Are you sure you want to edit this record?", "Customer", "question", () => {
            navigate(`/customer/${customerData[index].id}`);
        })
    }


    // Handle column editor
    useEffect(() => {
        setColumnData(LoadColumnData("liststructure_customer", resetList));
    }, []);
    const resetList = () => {
        return [
            { id: 0, active: true, name: "id", text: "ID", sortable: true },
            { id: 1, active: true, name: "vehicle", text: "Vehicle", sortable: true },
            { id: 3, active: true, name: "increasedate", text: "Increase Date", sortable: true },
            { id: 4, active: false, name: "fineoperator", text: "Fine Operator", sortable: true },
            { id: 5, active: false, name: "fineamount", text: "Fine Amount", sortable: false },
            { id: 6, active: false, name: "age", text: "Age", sortable: false },
            { id: 7, active: false, name: "power", text: "Power", sortable: false },
            { id: 8, active: false, name: "issuer", text: "Issuer", sortable: false },
            { id: 9, active: false, name: "status", text: "Status", sortable: false }
        ]
    }
    const [columnData, setColumnData] = useState<ColumnData[]>(LoadColumnData("liststructure_customer", resetList));
    useEffect(() => {
        SaveColumnData("liststructure_customer", columnData);
    }, [columnData])


    return (
        <>
            <ColumnEditor columnData={columnData} setColumnData={setColumnData} resetColumnData={resetList}></ColumnEditor>

            <TableFilter onRefreshData={onRefreshData} applyFilter={applyFilter} filterData={filterOptions} onEditColumn={OpenColumnEditor}></TableFilter>

            <Table<Customer> columnData={columnData} onViewClick={viewClick} setSortData={setSortData} sortData={sortData}>
                {
                    customerData.map((item, index) =>
                        <TableRow index={index} onViewClick={viewClick} viewText="Edit"> 
                            {columnData != null && columnData.map((column: ColumnData) => {
                                if (!column.active)
                                    return;
                                else if (column.name == "vehicle")
                                    return <td><NumberPlate>{item.vehicle}</NumberPlate></td>
                                else if (column.name == "increasedate")
                                    return <td><LocalDate value={item.increasedate}/></td>
                                else
                                    return <td>{item[column.name as keyof typeof item]}</td>
                            })}
                        </TableRow>
                    )
                }
            </Table>



            {typeof pagination != 'undefined' && <Pagination data={pagination} updatePage={setPageIndex}></Pagination>}

        </>
    )
}

