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

const Data_Group = () => {
    let emptyGroup = {
        id: 0,
        name: '',
        is_active: '',
        details: '',
    };

    const [groupDatas, setGroupDatas] = useState(null);
    const [dataDialog, setDataDialog] = useState(false);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [groupData, setGroupData] = useState(emptyGroup);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggleRefresh, setTogleRefresh] = useState(false);
    const [selectEdit, setSelectEdit] = useState(false);

    useEffect(() => {

        DataGroupService.getDataGroup().then((res) => setGroupDatas(res.data.AllData));

    }, [toggleRefresh]);

    const diaHeader = () => {
        return (
            selectEdit ? 'Add Data Group' : 'Edit Data Group'
        )
    }

    const openNew = () => {
        setGroupData(emptyGroup);
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


        if( groupData.name && groupData.details, groupData._id) {
            DataGroupService.editDataGroup(
                groupData.name,
                groupData.details,
                groupData._id,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Data Group is Updated', life: 3000 });
            })
        } else if( groupData.name && groupData.details) {
            DataGroupService.postDataGroup(
                groupData.name,
                groupData.details,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'New Data Group is Created', life: 3000 });
            })
        }
    };

    const editData = (groupData) => {
        setGroupData({ ...groupData });
        setDataDialog(true);
        setSelectEdit(false);
    };


    const confirmDeleteData = (groupData) => {
        setGroupData(groupData);
        setDeleteDataDialog(true);
    };

    const deleteData = () => {
        DataGroupService.deleteDataGroup(groupData._id).then(() => {
            setTogleRefresh(!toggleRefresh);
            setDeleteDataDialog(false);
            setGroupData(emptyGroup);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Data Group is Deleted', life: 3000 });
        })
    };



    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let data = { ...groupData };
        data[`${name}`] = val;

        setGroupData(data);
    };

    const dataGroupBodyTemplate = (rowData) => {
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
                {rowData.details}
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
                DataGroupService.toggleDataGroup(is_active, rowData._id).then(() => {
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
                    <h2 className="m-0">Data Group</h2>
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <Button
                    label="Add Data Group"
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

    if(groupDatas == null) {
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
                        value={groupDatas}
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
                            field="name"
                            header="Data Group"
                            sortable
                            body={dataGroupBodyTemplate}
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
                            <label htmlFor="groupData">Data Group</label>
                            <InputText 
                                id="name" 
                                value={groupData.name} 
                                onChange={(e) => onInputChange(e, "name")} 
                                required 
                                autoFocus 
                                className={classNames({ 'p-invalid': submitted && !groupData.name })} 
                                />
                            {submitted && !groupData.name && <small className="p-invalid">
                                Data Group is required.
                            </small>}
                        </div>
                        <div className="field">
                            <label htmlFor="details">Details</label>
                            <InputText 
                                id="details" 
                                value={groupData.details} 
                                onChange={(e) => onInputChange(e, "details")} 
                            />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteDataDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDataDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {groupData && (
                                <span>
                                    Are you sure you want to delete <b>{groupData.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                    
                </div>
            </div>
        </div>
    );
};

export default  Data_Group;