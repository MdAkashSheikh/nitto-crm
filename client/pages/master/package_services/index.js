import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { TankInfoService } from '../../../demo/service/TankInfoService';
import { PackageService } from '../../../demo/service/PackageService';
import { ServiceGroupService } from '../../../demo/service/ServiceGroupService';

const Package_Service = () => {
    let emptyPackage = {
        id: 0,
        name: '',
        pkg_details: [{service_id: '', service_name: '', completion_time: '', base_price: ''}],
    };

    const [packageDatas, setPackageDatas] = useState(null);
    const [dataDialog, setDataDialog] = useState(false);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [packageData, setPackageData] = useState(emptyPackage);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggleRefresh, setTogleRefresh] = useState(false);
    const [selectEdit, setSelectEdit] = useState(false);
    const [msPackage, setMSPackage] = useState(null);
    const [data1, setData1] = useState([]);

    useEffect(() => {

        // ZoneService.getZone().then((res) => setPackageDatas(res.data.AllData));
        PackageService.getPackage().then((res) => setPackageDatas(res.data.AllData));
        ServiceGroupService.getService().then((res) => setMSPackage(res.data.AllData));

    }, [toggleRefresh]);

    const diaHeader = () => {
        return (
            selectEdit ? 'Add Package Service' : 'Edit Package Service'
        )
    }
    console.log(msPackage)

    const openNew = () => {
        setPackageData(emptyPackage);
        setSubmitted(false);
        setDataDialog(true);
        setSelectEdit(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDataDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteDataDialog(false);
    };


    const saveData = () => {
        setSubmitted(true);

        console.log("PPPP1",packageData)

        if( packageData.name && packageData.pkg_details, packageData._id) {
            PackageService.editPackage(
                packageData.name,
                packageData.pkg_details,
                packageData._id,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Package is Updated', life: 3000 });
            })
        } else if( packageData.name && packageData.pkg_details.length != 0 ) {
            PackageService.postPackage(
                packageData.name,
                packageData.pkg_details,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Package is Created', life: 3000 });
            })
        }
    };

    const editData = (packageData) => {
        setPackageData({ ...packageData });
        setDataDialog(true);
        setSelectEdit(false);
    };


    const confirmDeleteData = (packageData) => {
        setPackageData(packageData);
        setDeleteDataDialog(true);
    };

    const deleteData = () => {
        PackageService.deletePackage(packageData._id).then(() => {
            setTogleRefresh(!toggleRefresh);
            setDeleteDataDialog(false);
            setPackageData(emptyPackage);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Package is Deleted', life: 3000 });
        })
    };

    const packList = msPackage?.filter(item => item.is_active == '1').map(item => {
        return { name: item.service_name, value: item.service_name}
    })

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let data = { ...packageData };
        data[`${name}`] = val;

        setPackageData(data);
    };

    const onSelectionChange = (e, name) => {
        let data = {...packageData };
        console.log( name, e.value)
        const newVal = [msPackage?.filter(item => item.name == e.value), {}];
        data[`${name}`] = newVal;
        console.log(data)
        setPackageData(data);
    }

    const onSelectionChange1 = (e, name) => {
        let data = {...packageData };
        const newVal = msPackage?.filter(item => item.service_name == e.value);

        data[`${name}`] = newVal;
        // console.log(data)
       
        const data3 = {...packageData} 
        setPackageData(data);
    }

    const onAdd = ( data ) => {
        console.log(packageData)
        const filterData = msPackage?.filter(item => item.service_name == data);
        const newData = {service_id: '', service_name: '', completion_time: '', base_price: ''};
        packageData.pkg_details = filterData
        const data2 = {...packageData, newData}
        console.log('Object Data--->', filterData)
        setPackageData(packageData)
        // console.log(newPackageData)
        // newPackageData.pkg_details = [...packageData.pkg_details, newData];
        // setPackageData(newPackageData);
    }

    console.log(packageData, 'Nai')

    const tankNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    }

    const detailsBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Details</span>
                {/* {rowData.pkg_details.map((item)=><ul><li>{item}</li></ul>)} */}
            </>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <ToggleButton onLabel="Active" offLabel="Inactive" onIcon="pi pi-check" offIcon="pi pi-times" 
            checked={rowData.is_active != '0'} onChange={(e) => {
                let is_active = '0';
                if (rowData.is_active == '0') {
                    is_active = '1'
                }
                PackageService.togglePackage(is_active, rowData._id).then(() => {
                setTogleRefresh(!toggleRefresh)
                })
             }} />
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editData(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteData(rowData)} />
            </>
        );
    };

        
    const topHeader = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <h2 className="m-0">Package Service</h2>
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <Button
                    label="Add Package Service"
                    icon="pi pi-plus"
                    severity="sucess"
                    className="mr-2"
                    onClick={openNew}
                />
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const dataDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveData} />
        </>
    );

    const deleteDataDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteData} />
        </>
    );

    if(packageDatas == null) {
        return (
            <div className="card">
                <div className="border-round border-1 surface-border p-4 surface-card">
                    <div className="flex mb-3">
                        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                        <div>
                            <Skeleton width="10rem" className="mb-2"></Skeleton>
                            <Skeleton width="5rem" className="mb-2"></Skeleton>
                            <Skeleton height=".5rem"></Skeleton>
                        </div>
                    </div>
                    <Skeleton width="100%" height="570px"></Skeleton>
                    <div className="flex justify-content-between mt-3">
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar
                        className="mb-4"
                        left={topHeader}
                    ></Toolbar>
                    <DataTable
                        ref={dt}
                        value={packageDatas}
                        selection={selectedDatas}
                        onSelectionChange={(e) => setSelectedDatas(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} Out of {totalRecords} Package Service"
                        globalFilter={globalFilter}
                        emptyMessage="Package Service is Empty."
                        header={header}
                        responsiveLayout="scroll"
                    >

                        <Column
                            field="name"
                            header="Tank Name"
                            sortable
                            body={tankNameBodyTemplate}
                            headerStyle={{ minWidth: "10rem" }}
                        ></Column>
                         <Column
                            field="details"
                            header="Details"
                            body={detailsBodyTemplate}
                            headerStyle={{ minWidth: "15rem" }}
                        ></Column>
                        <Column
                            header="Status"
                            body={statusBodyTemplate}
                            headerStyle={{ minWidth: "5rem" }}
                        ></Column>
                        <Column
                            header="Action"
                            body={actionBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
                        ></Column>
                    </DataTable>

                    <Dialog
                        visible={dataDialog}
                        style={{ width: "450px" }}
                        header={diaHeader}
                        modal
                        className="p-fluid"
                        footer={dataDialogFooter}
                        onHide={hideDialog}
                    >
                
                        <div className="field">
                            <label htmlFor="packageData">Package Name</label>
                            <InputText 
                                id="name" 
                                value={packageData.name} 
                                onChange={(e) => onInputChange(e, "name")} 
                                required 
                                autoFocus 
                                className={classNames({ 'p-invalid': submitted && !packageData.name })} 
                            />
                            {submitted && !packageData.name && <small className="p-invalid">
                                Package Name is required.
                            </small>} 
                        </div> 

                        {/* {packageData?.pkg_details?.map((item, i) => {
                            return (
                                <div className="field" key={i}> 
                                    <label htmlFor="details">Details</label> 
                                    {console.log('oooo', item)}
                                    <MultiSelect 
                                        value={item.name} 
                                        onChange={(e) => onSelectionChange1(e, 'pkg_details', i )} 
                                        required 
                                        options={packList} 
                                        optionLabel="name" 
                                        placeholder="Select Packages" 
                                        maxSelectedLabels={3} 
                                        className={classNames({ 'p-invalid': submitted && item.length === 0 })}
                                    />
                                    {submitted && item.length === 0 && <small className="p-invalid">
                                        Packages is required.
                                    </small>} 
                                </div>
                            )
                        })} */}

                        <div className="field"> 
                            <label htmlFor="details">Details</label> 
                            <Dropdown 
                                value={packageData.pkg_details.service_name} 
                                onChange={(e) => onSelectionChange1(e, "pkg_details")} 
                                required 
                                options={packList} 
                                optionLabel="name" 
                                placeholder="Select Packages" 
                                maxSelectedLabels={3} 
                                className={classNames({ 'p-invalid': submitted && packageData.pkg_details.length === 0 })}
                            />
                             {submitted && packageData.pkg_details.length === 0 && <small className="p-invalid">
                                Packages is required.
                            </small>} 
                        </div>
                    </Dialog>

                    <Dialog visible={deleteDataDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDataDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {packageData && (
                                <span>
                                    Are you sure you want to delete <b>{packageData.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default  Package_Service;