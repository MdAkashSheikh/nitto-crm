import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ZoneService } from '../../../demo/service/ZoneService';
import { URL } from '../../../demo/service/SourceDataService';
import { TeamInfoService } from '../../../demo/service/TeamInfoService';
import { CustomerInformationService } from '../../../demo/service/CustomerInformationService';


const Report_Info = () => {
    let empInfo = {
        name: '',
        father_name: '',
        mother_name: '',
        phone: [],
        nid: '',
        photo: '',
    };

    const [reportDatas, setReportDatas] = useState(null);
    const [dataDialog, setDataDialog] = useState(false);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [reportData, setReportData] = useState(empInfo);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggleRefresh, setTogleRefresh] = useState(false);
    const [selectEdit, setSelectEdit] = useState(false);
    const [emp_pic, setEmpPic] = useState('');
    const [emp_nid, setEmpNid] = useState('');


    useEffect(() => {

        // ZoneService.getZone().then((res) => setReportDatas(res.data.AllData));
        CustomerInformationService.getfCustomer().then((res) => setReportDatas(res.data.AllData))

    }, [toggleRefresh]);

    console.log(reportDatas, "SOURCE DATAS")

    const openNew = () => {
        setReportData(empInfo);
        setSubmitted(false);
        setDataDialog(true);
        setSelectEdit(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDataDialog(false);
    };

    const diaHeader = () => {
        return (
            selectEdit ? 'Add New Report' : 'Edit Report'
        )
    }

    const hideDeleteProductDialog = () => {
        setDeleteDataDialog(false);
    };

    const saveData = () => {
        setSubmitted(true);

        console.log("PPPP1",reportData)

        if( reportData.name && reportData.father_name && reportData.mother_name && reportData.phone, reportData._id) {
            TeamInfoService.editTeamInfo(
                reportData.name,
                reportData.father_name,
                reportData.mother_name,
                reportData.phone,
                reportData._id,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Report_Info is Updated', life: 3000 });
            })
        } else if( reportData.name && reportData.father_name && reportData.mother_name && reportData.phone ) {
            TeamInfoService.postTeamInfo(
                reportData.name,
                reportData.father_name,
                reportData.mother_name,
                reportData.phone,
                emp_pic,
                emp_nid,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'New Team Info is Created', life: 3000 });
            })
        }
    };

    const editData = (reportData) => {
        setReportData({ ...reportData });
        setDataDialog(true);
        setSelectEdit(false)
    };


    const confirmDeleteData = (reportData) => {
        setReportData(reportData);
        setDeleteDataDialog(true);
    };

    const deleteData = () => {
        ZoneService.deleteZone(reportData._id).then(() => {
            setTogleRefresh(!toggleRefresh);
            setDeleteDataDialog(false);
            setReportData(empInfo);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Zone is Deleted', life: 3000 });
        })
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let data = { ...reportData };
        data[`${name}`] = val;

        setReportData(data);
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    }

    const fatherNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Address</span>
                {rowData.address}
            </>
        );
    }

    const motherNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">motherName</span>
                {rowData.confirm_status}
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
                TeamInfoService.toggleTeamInfo(is_active, rowData._id).then(() => {
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
                    <h2 className="m-0">Report Information</h2>
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            {/* <Button
                label="Add Report"
                icon="pi pi-plus"
                severity="sucess"
                className="mr-2"
                onClick={openNew}
            /> */}
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

    if(reportDatas == null) {
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
                        value={reportDatas}
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
                            header="Name"
                            sortable
                            body={nameBodyTemplate}
                            headerStyle={{ minWidth: "5rem" }}
                        ></Column>
                        <Column
                            field="father_name"
                            header="Father Name"
                            body={fatherNameBodyTemplate}
                            headerStyle={{ minWidth: "5rem" }}
                        ></Column>
                        <Column
                            field="report_status"
                            header="Report Status"
                            body={motherNameBodyTemplate}
                            headerStyle={{ minWidth: "5rem" }}
                        ></Column>
                    </DataTable>

                    <Dialog
                        visible={dataDialog}
                        style={{ width: "550px" }}
                        header={diaHeader}
                        modal
                        className="p-fluid"
                        footer={dataDialogFooter}
                        onHide={hideDialog}
                    >
                
                        <div className="field">
                            <label htmlFor="reportData">Name</label>
                            <InputText 
                                id="name" 
                                value={reportData.name} 
                                onChange={(e) => onInputChange(e, "name")} 
                                required 
                                autoFocus 
                                className={classNames({ 'p-invalid': submitted && !reportData.name })} 
                                />
                            {submitted && !reportData.name && <small className="p-invalid">
                                Name is required.
                            </small>}
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="reportData">Father Name</label>
                                <InputText
                                    id="father_name"
                                    value={reportData.father_name}
                                    onChange={(e) => onInputChange(e, "father_name")}
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !reportData.father_name,
                                    })}
                                />
                                {submitted && !reportData.father_name && (
                                    <small className="p-invalid">
                                        Father Name is required.
                                    </small>
                                )}
                            </div>
                            <div className="field col">
                                <label htmlFor="reportData">Mother Name</label>
                                <InputText
                                    id="mother_name"
                                    value={reportData.mother_name}
                                    onChange={(e) => onInputChange(e, "mother_name")}
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !reportData.mother_name,
                                    })}
                                />
                                {submitted && !reportData.mother_name && (
                                    <small className="p-invalid">
                                        Mother Name is required.
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="reportData">Phone</label>
                            <InputText 
                                id="phone" 
                                value={reportData.phone} 
                                onChange={(e) => onInputChange(e, "phone")} 
                                required 
                                className={classNames({ 'p-invalid': submitted && !reportData.phone })} 
                                />
                            {submitted && !reportData.phone && <small className="p-invalid">
                                Phone is required.
                            </small>}
                        </div>

                        <div className="field">
                            <label htmlFor="reportData">Upload Your Photo</label>
                            <FileUpload 
                                multiple
                                accept="image/*" 
                                name='photo'
                                url={`${URL}/upload-emp-pic`}
                                maxFileSize={1000000} 
                                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} 
                                className='mt-1'
                                onUpload={(e)=> { 
                                    console.log( "slidufgoidh", e)
                                    const data = JSON.parse(e.xhr.responseText)
                                    console.log('Data---->',data)
                                    setEmpPic(data.file1);
                                }}
                                onRemove={(e)=> { 
                                    console.log("remove", e)
                                }}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="reportData">Upload Your NID or Birth-Certificate</label>
                            <FileUpload 
                                multiple
                                accept="image/*" 
                                name='photo'
                                url={`${URL}/upload-emp-nid`}
                                maxFileSize={1000000} 
                                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} 
                                className='mt-1'
                                onUpload={(e)=> { 
                                    console.log( "slidufgoidh", e)
                                    const data = JSON.parse(e.xhr.responseText)
                                    console.log(data)
                                    setEmpNid(data.file1);
                                }}
                                onRemove={(e)=> { 
                                    console.log("remove", e)
                                }}
                            />
                        </div>

                    </Dialog>

                    <Dialog visible={deleteDataDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDataDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {reportData && (
                                <span>
                                    Are you sure you want to delete <b>{reportData.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                    
                </div>
            </div>
        </div>
    );
};

export default  Report_Info;