//import type { ReactNode } from 'react';
import Table from '../../components/table/Table'
import TableRow from '../../components/tableRow/TableRow';
import Pagination from '../../components/pagination/Pagination';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { POST, SafeFetchJson } from '../../helpers/fetch';
import type { pagination } from '../../models/Pagination';

//import type { CustomerFilterOptions } from '../../models/CustomerFilterOptions';
//import type { CustomerFilterValues } from '../../models/CustomerFilterValues';


import { useContext } from "react";
import type { GlobalData } from '../../models/GlobalData';
import { UserContext } from '../../helpers/globalData';
import type { ColumnData } from '../../models/ColumnData';
import ColumnEditor from '../columEditor/ColumnEditor';
import NumberPlate from '../../components/numberPlate/NumberPlate';
//import TableFilter from '../tableFilter/TableFilter';


export default function CustomerTable() {

    const showSelector = false;
    const showDetail = true;
    const pageSize = 3;
    const [customerData, setCustomerData] = useState<Customer[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pagination, setPagination] = useState<pagination>({ pageId: 0, totalPages: 0});

    const globalData: GlobalData = useContext(UserContext);

    type Customer = {
        id: number;
        vehicle: string;
        power: number;
        increasedate: string;
    };

    type CustomerWrapper = {
        data: Customer[];
        pagination: pagination;
    }




    const { data: CustomerWrapper } = useQuery({
        queryKey: ["todo", pageIndex],
        queryFn: () => loadCustomerData(pageIndex)
    });
    const loadCustomerData = async (newPageIndex: number) => {
        newPageIndex = newPageIndex || 0;
        globalData.SetSpinnerVisible(true);
        const newData: CustomerWrapper = await SafeFetchJson(`api/GetCustomer/${newPageIndex}/${pageSize}`, POST({}));
        setCustomerData(newData.data);
        setPagination(newData.pagination);
        setPageIndex(newPageIndex);
        globalData.SetSpinnerVisible(false);
        return customerData;
    }
    const updatePage = (pageIndex: number) => {
        setPageIndex(pageIndex * pageSize);
    }






    //const [filterOptions, setFilterOptions] = useState<CustomerFilterOptions>({ id: [], increasedate: [], power: [], vehicle: [] });
    //useQuery({
    //    queryKey: ["filter"],
    //    queryFn: () => getCustomerFilter()
    //});
    //const getCustomerFilter = async () => {
    //    const data = await SafeFetchJson(`api/CustomerFilter`, GET());
    //    setFilterOptions(data);
    //    return data;
    //}







    //const [filterValues, setFilterValues] = useState<CustomerFilterValues>({ color: "", name: "", job: "" });
    //useEffect(() => {
    //    reloadData();
    //}, [filterValues])

    //const applyFilter = (controlValue: string, name: string) => {
    //    setFilterValues({ ...filterValues, [name]: controlValue });
    //}








    const updater = (value: boolean, index: number) => {
        setCustomerData(prevItems =>
            prevItems.map((item, i) => ((i == index || index == -1) ? { ...item, selected: value } : item))
        );
    }

    const detailClick = (index: number) => {
        alert(JSON.stringify(customerData[index]));
    }






    const loadData = () : ColumnData[] => {
        try {
            const rawStorageData: string | null = localStorage.getItem("liststructure_customer")
            if (rawStorageData == null || rawStorageData == "" || rawStorageData == "[]" || rawStorageData == "null") {
                return resetList();
            }
            else {
                return JSON.parse(rawStorageData!);
            }
        }
        catch {
            return resetList();
        }
    }
    useEffect(() => {
        setColumnData(loadData());
    }, []);
    const resetList = () => {
        return [
            { id: 0, active: true, name: "id", text: "ID" },
            { id: 1, active: true, name: "vehicle", text: "Vehicle" },
            { id: 2, active: true, name: "power", text: "Power" },
            { id: 3, active: true, name: "increasedate", text: "Increase Date" }
        ]
    }
    const getHeader = () => {
        return columnData != null && columnData.map((column: ColumnData) => { return column.active && <td>{column.text}</td> });
    }
    const [columnData, setColumnData] = useState<ColumnData[]>(loadData());
    useEffect(() => {
        if (columnData == null) {
            localStorage.removeItem("liststructure_customer");
        }
        else {
            localStorage.setItem("liststructure_customer", JSON.stringify(columnData));
        }
    }, [columnData])
    const openEditor = () => {
        const dialog = document.getElementById('dialog_tableEditor') as HTMLDialogElement;
        dialog.showModal();
    }



            //<TableFilter openEditor={openEditor} applyFilter={applyFilter} filterData={filterOptions}></TableFilter>

    return (
        <>
            <ColumnEditor columnData={columnData} setColumnData={setColumnData} resetColumnData={resetList}></ColumnEditor>



            <button className="btn btn-primary" type="button" onClick={openEditor}>Edit columns</button>



            <Table selector={showSelector} detail={showDetail} header={getHeader()}>
                {
                    customerData.map((item, index) =>
                        <TableRow selector={showSelector} updater={updater} detail={showDetail} index={index} detailClick={detailClick}>
                            {columnData != null && columnData.map((column: ColumnData) => {
                                if (!column.active) return;

                                if (column.name == "vehicle")


                                    return <td>     <NumberPlate>{item.vehicle}</NumberPlate>     </td>



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

