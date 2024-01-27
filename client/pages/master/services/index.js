import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ServiceGroupService } from '../../../demo/service/ServiceGroupService';

const Service = () => {
    
    let emptyService = {
        service_id: '',
        service_name: '',
        base_price: '',
        completion_time: '',
        is_active: '',
        details: '',
    };

    const [serviceDatas, setServiceDatas] = useState(null);
    const [dataDialog, setDataDialog] = useState(false);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [serviceData, setServiceData] = useState(emptyService);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggleRefresh, setTogleRefresh] = useState(false);


    useEffect(() => {

        ServiceGroupService.getService().then((res) => setServiceDatas(res.data.AllData));

    }, [toggleRefresh]);

    const openNew = () => {
        setServiceData(emptyService);
        setSubmitted(false);
        setDataDialog(true);
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

        console.log("PPPP1",serviceData)

        if( serviceData.service_id && serviceData.service_name && serviceData.base_price , serviceData.completion_time, serviceData._id) {
            ServiceGroupService.editService(
                serviceData.service_id,
                serviceData.service_name,
                serviceData.base_price,
                serviceData.completion_time,
                serviceData._id,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Service is Updated', life: 3000 });
            })
        } else if( serviceData.service_id && serviceData.service_name && serviceData.base_price , serviceData.completion_time) {
            ServiceGroupService.postService(
                serviceData.service_id,
                serviceData.service_name,
                serviceData.base_price,
                serviceData.completion_time
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'New Service is Created', life: 3000 });
            })
        }
    };

    const editData = (serviceData) => {
        setServiceData({ ...serviceData });
        setDataDialog(true);
    };


    const confirmDeleteData = (serviceData) => {
        setServiceData(serviceData);
        setDeleteDataDialog(true);
    };

    const deleteData = () => {
        ServiceGroupService.deleteService(serviceData._id).then(() => {
            setTogleRefresh(!toggleRefresh);
            setDeleteDataDialog(false);
            setServiceData(emptyService);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Service is Deleted', life: 3000 });
        })
    };



    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let data = { ...serviceData };
        data[`${name}`] = val;

        setServiceData(data);
    };

    const service_idBodyTemplete = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.service_id}
            </>
        );
    }

    console.log('Data',serviceData)

    const service_NameBodyTemplete = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.service_name}
            </>
        );
    }

    const base_priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Details</span>
                {rowData.base_price}
            </>
        );
    }

    const completion_timeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Details</span>
                {rowData.completion_time}
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
                ServiceGroupService.toggleService(is_active, rowData._id).then(() => {
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
                    <h2 className="m-0">Service</h2>
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <Button
                    label="Add Service"
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

    if(serviceDatas == null) {
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
                        value={serviceDatas}
                        selection={selectedDatas}
                        onSelectionChange={(e) => setSelectedDatas(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} Out of {totalRecords} Data-Source"
                        globalFilter={globalFilter}
                        emptyMessage="Data Group is Empty."
                        header={header}
                        responsiveLayout="scroll"
                    >

                        <Column
                            field="id"
                            header="Service ID"
                            sortable
                            body={service_idBodyTemplete}
                            headerStyle={{ minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="id"
                            header="Service Name"
                            sortable
                            body={service_NameBodyTemplete}
                            headerStyle={{ minWidth: "10rem" }}
                        ></Column>
                         <Column
                            field="base_price"
                            header="Base Price"
                            body={base_priceBodyTemplate}
                            headerStyle={{ minWidth: "15rem" }}
                        ></Column>
                        <Column
                            field="completion_time"
                            header="Completion Time"
                            body={completion_timeBodyTemplate}
                            headerStyle={{ minWidth: "5rem" }}
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
                        header="Add Service"
                        modal
                        className="p-fluid"
                        footer={dataDialogFooter}
                        onHide={hideDialog}
                    >
                
                        <div className="field">
                            <label htmlFor="serviceData">Service Name</label>
                            <InputText 
                                id="name" 
                                value={serviceData.service_name} 
                                onChange={(e) => onInputChange(e, "service_name")} 
                                required 
                                autoFocus 
                                className={classNames({ 'p-invalid': submitted && !serviceData.service_name })} 
                                />
                            {submitted && !serviceData.service_name && <small className="p-invalid">
                                Service Name is required.
                            </small>}
                        </div>
                        <div className="field">
                            <label htmlFor="serviceData">Base Price</label>
                            <InputText 
                                id="name" 
                                value={serviceData.base_price} 
                                onChange={(e) => onInputChange(e, "base_price")} 
                                required 
                                className={classNames({ 'p-invalid': submitted && !serviceData.base_price })} 
                                />
                            {submitted && !serviceData.base_price && <small className="p-invalid">
                                Base Price is required.
                            </small>}
                        </div>
                        <div className="field">
                            <label htmlFor="details">Completion Time</label>
                            <InputText 
                                id="details" 
                                value={serviceData.completion_time} 
                                onChange={(e) => onInputChange(e, "completion_time")} 
                            />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteDataDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDataDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {serviceData && (
                                <span>
                                    Are you sure you want to delete <b>{serviceData.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default  Service;