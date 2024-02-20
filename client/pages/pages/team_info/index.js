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


const Team_Info = () => {
    let empInfo = {
        name: '',
        father_name: '',
        mother_name: '',
        phone: [],
        nid: '',
        photo: '',
    };

    const [teamDatas, setTeamDatas] = useState(null);
    const [dataDialog, setDataDialog] = useState(false);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [teamData, setTeamData] = useState(empInfo);
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

        // ZoneService.getZone().then((res) => setTeamDatas(res.data.AllData));
        TeamInfoService.getTeamInfo().then((res) => setTeamDatas(res.data.AllData))

    }, [toggleRefresh]);

    console.log(teamDatas, "SOURCE DATAS")

    const openNew = () => {
        setTeamData(empInfo);
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
            selectEdit ? 'Add New Employee' : 'Edit Employee'
        )
    }

    const hideDeleteProductDialog = () => {
        setDeleteDataDialog(false);
    };

    const saveData = () => {
        setSubmitted(true);

        console.log("PPPP1",teamData)

        if( teamData.name && teamData.father_name && teamData.mother_name && teamData.phone, teamData._id) {
            TeamInfoService.editTeamInfo(
                teamData.name,
                teamData.father_name,
                teamData.mother_name,
                teamData.phone,
                teamData._id,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Team_Info is Updated', life: 3000 });
            })
        } else if( teamData.name && teamData.father_name && teamData.mother_name && teamData.phone ) {
            TeamInfoService.postTeamInfo(
                teamData.name,
                teamData.father_name,
                teamData.mother_name,
                teamData.phone,
                emp_pic,
                emp_nid,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'New Team Info is Created', life: 3000 });
            })
        }
    };

    const editData = (teamData) => {
        setTeamData({ ...teamData });
        setDataDialog(true);
        setSelectEdit(false)
    };


    const confirmDeleteData = (teamData) => {
        setTeamData(teamData);
        setDeleteDataDialog(true);
    };

    const deleteData = () => {
        ZoneService.deleteZone(teamData._id).then(() => {
            setTogleRefresh(!toggleRefresh);
            setDeleteDataDialog(false);
            setTeamData(empInfo);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Zone is Deleted', life: 3000 });
        })
    };



    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let data = { ...teamData };
        data[`${name}`] = val;

        setTeamData(data);
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
                <span className="p-column-title">fatherName</span>
                {rowData.father_name}
            </>
        );
    }

    const motherNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">motherName</span>
                {rowData.mother_name}
            </>
        );
    }

    const phoneBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">motherName</span>
                {rowData.phone}
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
                    <h2 className="m-0">Team Information</h2>
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <Button
                    label="Add Employee"
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

    const imageShow = () => {
        if(teamData.photo) {
            return teamData.photo.map((item, i) => {
                return (
                    <div className="p-fileupload-content px-1 py-1" key={i}>
                        <div>
                            <div>
                                </div>
                        </div>
                        <div>
                            <div className="p-fileupload-row">
                                <img role="presentation" className="p-fileupload-file-thumbnail mr-2" src={`${URL}/uploads/` + item}  width="50"></img>
                                <div>
                                    <span>{item}</span>
                                    <span className="p-badge p-component p-badge-success p-fileupload-file-badge">Completed</span>
                                </div>
                                <div>
                                    <button type="button" className="p-button p-component p-button-danger p-button-text p-button-rounded p-button-icon-only">
                                        <span className="p-button-icon p-c pi pi-times" onClick={()=> deleteImage(item, follow._id)}></span>
                                        <span className="p-button-label p-c">&nbsp;</span><span role="presentation" className="p-ink" style={{height: '42px', width: '42px'}}></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    // <div className='formgrid grid'>
                    //     <img src={`${URL}/uploads/` + item} width={100} height={60}/>
                    //     <button className='m-4' onClick={()=> deleteImage(item, follow._id)}>delete</button>
                    // </div>
                )
            })
        }
    }

    if(teamDatas == null) {
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
                        value={teamDatas}
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
                            field="phone"
                            header="Phone"
                            sortable
                            body={phoneBodyTemplate}
                            headerStyle={{ minWidth: "5rem" }}
                        ></Column>
                        <Column
                            field="father_name"
                            header="Father Name"
                            body={fatherNameBodyTemplate}
                            headerStyle={{ minWidth: "5rem" }}
                        ></Column>
                        <Column
                            field="mother_name"
                            header="Mother Name"
                            body={motherNameBodyTemplate}
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
                        style={{ width: "550px" }}
                        header={diaHeader}
                        modal
                        className="p-fluid"
                        footer={dataDialogFooter}
                        onHide={hideDialog}
                    >
                
                        <div className="field">
                            <label htmlFor="teamData">Name</label>
                            <InputText 
                                id="name" 
                                value={teamData.name} 
                                onChange={(e) => onInputChange(e, "name")} 
                                required 
                                autoFocus 
                                className={classNames({ 'p-invalid': submitted && !teamData.name })} 
                                />
                            {submitted && !teamData.name && <small className="p-invalid">
                                Name is required.
                            </small>}
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="teamData">Father Name</label>
                                <InputText
                                    id="father_name"
                                    value={teamData.father_name}
                                    onChange={(e) => onInputChange(e, "father_name")}
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !teamData.father_name,
                                    })}
                                />
                                {submitted && !teamData.father_name && (
                                    <small className="p-invalid">
                                        Father Name is required.
                                    </small>
                                )}
                            </div>
                            <div className="field col">
                                <label htmlFor="teamData">Mother Name</label>
                                <InputText
                                    id="mother_name"
                                    value={teamData.mother_name}
                                    onChange={(e) => onInputChange(e, "mother_name")}
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !teamData.mother_name,
                                    })}
                                />
                                {submitted && !teamData.mother_name && (
                                    <small className="p-invalid">
                                        Mother Name is required.
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="teamData">Phone</label>
                            <InputText 
                                id="phone" 
                                value={teamData.phone} 
                                onChange={(e) => onInputChange(e, "phone")} 
                                required 
                                className={classNames({ 'p-invalid': submitted && !teamData.phone })} 
                                />
                            {submitted && !teamData.phone && <small className="p-invalid">
                                Phone is required.
                            </small>}
                        </div>

                        <div className="field">
                            <label htmlFor="teamData">Upload Your Photo</label>
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
                            <label htmlFor="teamData">Upload Your NID or Birth-Certificate</label>
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
                            {teamData && (
                                <span>
                                    Are you sure you want to delete <b>{teamData.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                    
                </div>
            </div>
        </div>
    );
};

export default  Team_Info;