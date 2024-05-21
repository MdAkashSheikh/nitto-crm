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
import { DataGroupService } from '../../../demo/service/DataGroupService';
import { CustomerInformationService } from '../../../demo/service/CustomerInformationService';

const Cancel_Info = () => {
    let emptyGroup = {
        id: 0,
        name: '',
        is_active: '',
        details: '',
    };

    const [cancelDatas, setCancelDatas] = useState(null);
    const [dataDialog, setDataDialog] = useState(false);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [cancelData, setCancelData] = useState(emptyGroup);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggleRefresh, setTogleRefresh] = useState(false);
    const [selectEdit, setSelectEdit] = useState(false);

    useEffect(() => {

        CustomerInformationService.getCustomerInfo().then((res) => setCancelDatas(res.data.AllData))

    }, [toggleRefresh]);

    const diaHeader = () => {
        return (
            selectEdit ? 'Add Data Group' : 'Edit Data Group'
        )
    }

    const filterCancelDatas = cancelDatas?.filter((item) => item.confirm_status === 'cancelled');

    const openNew = () => {
        setCancelData(emptyGroup);
        setSubmitted(false);
        setDataDialog(true);
        setSelectEdit(true)
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


        if( cancelData.name && cancelData.details, cancelData._id) {
            DataGroupService.editDataGroup(
                cancelData.name,
                cancelData.details,
                cancelData._id,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Data Group is Updated', life: 3000 });
            })
        } else if( cancelData.name && cancelData.details) {
            DataGroupService.postDataGroup(
                cancelData.name,
                cancelData.details,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'New Data Group is Created', life: 3000 });
            })
        }
    };

    const editData = (cancelData) => {
        setCancelData({ ...cancelData });
        setDataDialog(true);
        setSelectEdit(false);
    };


    const confirmDeleteData = (cancelData) => {
        setCancelData(cancelData);
        setDeleteDataDialog(true);
    };

    const deleteData = () => {
        DataGroupService.deleteDataGroup(cancelData._id).then(() => {
            setTogleRefresh(!toggleRefresh);
            setDeleteDataDialog(false);
            setCancelData(emptyGroup);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Data Group is Deleted', life: 3000 });
        })
    };



    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let data = { ...cancelData };
        data[`${name}`] = val;

        setCancelData(data);
    };

    const serviceDateBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.serviceDate?.slice(0, 10)}
            </>
        )
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    }

    const phoneBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Phone</span>
                {rowData.phone}
            </>
        );
    }

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    }
    
    const addressBodyTemplate = (rowData) => {

        return (
            <>
                <span className="p-column-title">Address</span>
                {rowData.address.map((item, i)=><ol start={i+1}><li>{item.address}</li></ol>)}
            </>
        );
    }

    const zoneBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Zone</span>
                {rowData.zone}
            </>
        );
    }

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.address.map((item, i)=><ol start={i+1}><li>{item.category}</li></ol>)}
            </>
        );
    }

    const cancelCauseBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Cancel Cause</span>
                {rowData.cancel_cause}
            </>
        );
    }

    const detailsBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Details</span>
                {rowData.details}
            </>
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
                    <h2 className="m-0">Cancel Page</h2>
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
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

    if(cancelDatas == null) {
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
                        value={filterCancelDatas}
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
                            field="servceDate"
                            header="Service Date"
                            sortable
                            body={serviceDateBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="name"
                            header="Name"
                            sortable
                            body={nameBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="phone"
                            header="Phone"
                            body={phoneBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="email"
                            header="Email"
                            body={emailBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="address"
                            header="Address"
                            body={addressBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="zone"
                            header="Zone"
                            body={zoneBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="category"
                            header="Category"
                            body={categoryBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="cancel_cause"
                            header="Cancel Cause"
                            body={cancelCauseBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="details"
                            header="Details"
                            body={detailsBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        {/* <Column
                            header="Action"
                            body={actionBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
                        ></Column> */}
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
                            <label htmlFor="cancelData">Data Group</label>
                            <InputText 
                                id="name" 
                                value={cancelData.name} 
                                onChange={(e) => onInputChange(e, "name")} 
                                required 
                                autoFocus 
                                className={classNames({ 'p-invalid': submitted && !cancelData.name })} 
                                />
                            {submitted && !cancelData.name && <small className="p-invalid">
                                Data Group is required.
                            </small>}
                        </div>
                        <div className="field">
                            <label htmlFor="details">Details</label>
                            <InputText 
                                id="details" 
                                value={cancelData.details} 
                                onChange={(e) => onInputChange(e, "details")} 
                            />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteDataDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDataDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {cancelData && (
                                <span>
                                    Are you sure you want to delete <b>{cancelData.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                    
                </div>
            </div>
        </div>
    );
};

export default  Cancel_Info;