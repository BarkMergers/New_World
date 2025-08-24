import { Table, TableRow, Pagination, NumberPlate, LocalDate } from '../../components'
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { POST, GET, SafeFetchJson } from '../../helpers/fetch';
import type { pagination } from '../../models/Pagination';
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

export default function CustomerTable() {

    const navigate = useNavigate()

    const pageSize = 3;
    const [customerData, setCustomerData] = useState<Customer[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pagination, setPagination] = useState<pagination>({ pageId: 0, totalPages: 0});

    const globalData: GlobalData = useContext(UserContext);

    type CustomerWrapper = {
        data: Customer[];
        pagination: pagination;
    }

    // Load data from server
    const { data: CustomerWrapper } = useQuery({
        queryKey: ["todo", pageIndex],
        queryFn: () => loadCustomerData(pageIndex)
    });
    const loadCustomerData = async (newPageIndex: number) => {
        newPageIndex = newPageIndex || 0;
        globalData.SetSpinnerVisible(true);
        const newData: CustomerWrapper = await SafeFetchJson(`api/GetCustomer/${newPageIndex}/${pageSize}`, POST(filterValues));
        setCustomerData(newData.data);
        setPagination(newData.pagination);
        setPageIndex(newPageIndex);
        globalData.SetSpinnerVisible(false);
        return customerData;
    }
    const updatePage = (pageIndex: number) => {
        setPageIndex(pageIndex * pageSize);
    }





    // Load filter options from server
    const [filterOptions, setFilterOptions] = useState<CustomerFilterOptions>({ increasedate: [], power: [], vehicle: [] });
    useQuery({
        queryKey: ["customerfilter"],
        queryFn: () => getCustomerFilter()
    });
    const getCustomerFilter = async () => {
        const data = await SafeFetchJson(`api/GetCustomerFilter`, GET());
        setFilterOptions(data);
        return data;
    }






    // When filter is updated, reload the data
    const [filterValues, setFilterValues] = useState<CustomerFilterValues>({ id: "", power: "", increasedate: "", vehicle: "" });
    useEffect(() => {
        loadCustomerData(pageIndex);
    }, [filterValues])
    const applyFilter = (controlValue: string, name: string) => {
        if (name.endsWith("List"))
            name = name.substring(0, name.length - 4);
        setFilterValues({ ...filterValues, [name]: controlValue });
    }





    // What happens when the View button is clicked
    const viewClick = (index: number) => {
        globalData.ShowConfirmation("Are you sure you want to edit this record?", "Customer", "question", () => {
            navigate(`/customer/${customerData[index].id}`)
        })
    }





    // Handle column editor
    useEffect(() => {
        setColumnData(LoadColumnData("liststructure_customer", resetList));
    }, []);
    const resetList = () => {
        return [
            { id: 0, active: true, name: "id", text: "ID" },
            { id: 1, active: true, name: "vehicle", text: "Vehicle" },
            { id: 3, active: true, name: "increasedate", text: "Increase Date" },
            { id: 4, active: false, name: "fineoperator", text: "Fine Operator" },
            { id: 5, active: false, name: "fineamount", text: "Fine Amount" },
            { id: 6, active: false, name: "age", text: "Age" },
            { id: 7, active: false, name: "power", text: "Power" },
            { id: 8, active: false, name: "issuer", text: "Issuer" },
            { id: 9, active: false, name: "status", text: "Status" }
        ]
    }
    const [columnData, setColumnData] = useState<ColumnData[]>(LoadColumnData("liststructure_customer", resetList));
    useEffect(() => {
        SaveColumnData("liststructure_customer", columnData);
    }, [columnData])



    return (
        <>
            <ColumnEditor columnData={columnData} setColumnData={setColumnData} resetColumnData={resetList}></ColumnEditor>

            <TableFilter applyFilter={applyFilter} filterData={filterOptions} onEditColumn={OpenColumnEditor}></TableFilter>

            <Table columnData={columnData} onViewClick={viewClick}>
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

            <Pagination data={pagination} updatePage={updatePage}></Pagination>
        </>
    )
}

