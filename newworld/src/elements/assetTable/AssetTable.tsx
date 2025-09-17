import { Table, TableRow, Pagination } from '../../components'
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { POST, SafeFetchJson } from '../../helpers/fetch';
import type { pagination } from '../../models/Pagination';
import type { AssetFilterOptions } from '../../models/AssetFilterOptions';
import type { AssetFilterValues } from '../../models/AssetFilterValues';
import { useContext } from "react";
import type { GlobalData } from '../../models/GlobalData';
import { UserContext } from '../../helpers/globalData';
import type { ColumnData } from '../../models/ColumnData';
import ColumnEditor, { OpenColumnEditor, LoadColumnData, SaveColumnData } from '../columEditor/ColumnEditor';
import TableFilter from '../tableFilter/TableFilter';
import type { SortData } from '../../models/SortData';
import type { Asset } from '../../models/Asset';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function AccountTable() {

    //const navigate = useNavigate()

    const pageSize = 12;
    const [assetData, setAssetData] = useState<Asset[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pagination, setPagination] = useState<pagination>({ pageId: 0, totalPages: 0});

    const globalData: GlobalData = useContext(UserContext);

    type AssetWrapper = {
        data: Asset[];
        pagination: pagination;
    }

    // Load data from server
    const { data: AssetWrapper } = useQuery({
        queryKey: ["todo", pageIndex],
        queryFn: () => loadAssetData(pageIndex)
    });
    const loadAssetData = async (newPageIndex: number) => {
        newPageIndex = newPageIndex || 0;
        globalData.SetSpinnerVisible(true);
        const newData: AssetWrapper = await SafeFetchJson(`api/GetAsset/${newPageIndex}/${pageSize}`, POST({ sortValues: sortData, filterValues: filterValues }));
        setAssetData(newData.data);
        setPagination(newData.pagination);
        setPageIndex(newPageIndex);
        globalData.SetSpinnerVisible(false);


        return assetData;
    }
    const updatePage = (localPageIndex: number) => {
        setPageIndex(localPageIndex * pageSize);
    }





    // Load filter options from server
    const [filterOptions] = useState<AssetFilterOptions>({ assetName: "", assetTypeId: "", registrationNumber: "" });
    //useQuery({
    //    queryKey: ["accountfilter"],
    //    queryFn: () => getAccountFilter()
    //});
    //const getAccountFilter = async () => {
    //    const data = await SafeFetchJson(`api/GetAssetFilter`, GET());
    //    setFilterOptions(data);
    //    return data;
    //}setFilterOptions






    // When filter is updated, reload the data
    const [filterValues, setFilterValues] = useState<AssetFilterValues>({ assetName: "", assetTypeId: "", registrationNumber: "" });
    useEffect(() => {
        loadAssetData(pageIndex);
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
        setColumnData(LoadColumnData("liststructure_asset", resetList));
    }, []);
    const resetList = () => {
        return [
            { id: 0, active: true, name: "recordId", text: "Record ID", sortable: true },
            { id: 1, active: true, name: "registrationNumber", text: "Reg No", sortable: true },
            { id: 2, active: true, name: "assetTypeId", text: "Asset Type", sortable: true },
            { id: 3, active: true, name: "assetName", text: "Asset Name", sortable: true },
            { id: 4, active: false, name: "customerId", text: "Customer ID", sortable: false },
            { id: 5, active: false, name: "customerDepotId", text: "Customer Depot", sortable: false },
            { id: 6, active: false, name: "fleetManagerId", text: "Fleet Manager", sortable: false },
            { id: 7, active: false, name: "makeId", text: "Make", sortable: false },
            { id: 8, active: false, name: "modelId", text: "Model", sortable: false },
            { id: 9, active: false, name: "derivative", text: "Derivative", sortable: false },
            { id: 10, active: false, name: "assetWeight", text: "Asset Weight", sortable: false }
        ]
    }
    const [columnData, setColumnData] = useState<ColumnData[]>(LoadColumnData("liststructure_asset", resetList));
    useEffect(() => {
        SaveColumnData("liststructure_asset", columnData);
    }, [columnData])






    // Add sorting
    const [sortData, setSortData] = useState<SortData<Asset>>({ fieldName: "assetName", sortOrder: "ascending" });
    useEffect(() => {
        loadAssetData(pageIndex);
    }, [sortData])




    return (
        <>
            <ColumnEditor columnData={columnData} setColumnData={setColumnData} resetColumnData={resetList}></ColumnEditor>

            <TableFilter applyFilter={applyFilter} filterData={filterOptions} onEditColumn={OpenColumnEditor}></TableFilter>

            <Table<Asset> columnData={columnData} onViewClick={viewClick} setSortData={setSortData} sortData={sortData}>
                {
                    assetData.map((item, index) =>
                        <TableRow index={index} onViewClick={viewClick} viewText="Edit"> 
                            {columnData != null && columnData.map((column: ColumnData) => {
                                if (column.active) {

                                    if (typeof item[column.name as keyof typeof item] == "boolean")
                                        return <td className="text-center"> {item[column.name as keyof typeof item] ? <FaCheck className="inline" /> : <FaTimes className="inline" />} </td>
                                    else
                                        return <td>{item[column.name as keyof typeof item]}</td>
                                }
                            })}
                        </TableRow>
                    )
                }
            </Table>

            <Pagination data={pagination} updatePage={updatePage}></Pagination>
        </>
    )
}

