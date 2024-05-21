
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { CustomerInformationService } from '../../../demo/service/CustomerInformationService';
import { PriorityGroupService } from '../../../demo/service/PriorityGroupService';
import { PotentialCustomerService } from '../../../demo/service/PotentialCustomerService';
import { ServiceGroupService } from '../../../demo/service/ServiceGroupService';
import { PackageService } from '../../../demo/service/PackageService';
import { TeamInfoService } from '../../../demo/service/TeamInfoService';

const Manager_Panel = () => {
    let managerInfo = {
        follows: {id: 0, aid: 0, add1: '', priority: '', potential: '', followDate: '', feedback: ''}
    };

    let customerInfo = {
        customerId:'', address: '', service: '', customerName: '', price: '', slot: '', team_member: [], team_lead: '', cancel_cause: ''
    }


    const [managerDatas, setManagerDatas] = useState(null);
    const [customerDatas, setCustomerDatas] = useState(null);
    const [dataDialog, setDataDialog] = useState(false);
    const [customerDaialog, setCustomerDaialog] = useState(false)
    const [cancelDialog, setCancelDialog] = useState(false);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [managerData, setManagerData] = useState(managerInfo);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [msPriority, setMsPriority] = useState(null);
    const [msPotential, setMsPotential] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggleRefresh, setTogleRefresh] = useState(false);
    const [one, setOne] = useState(null);
    const [check, setCheck] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [customer, setCustomer] = useState(customerInfo);
    const [mService, setMService] = useState(null);
    const [mPackage, setMPackage] = useState(null);
    const [mteam, setMteam] = useState(null);


    useEffect(() => {

        CustomerInformationService.getCustomerInfo().then((res) => setManagerDatas(res.data.AllData));
        PriorityGroupService.getPriority().then((res) => setMsPriority(res.data.AllData));
        PotentialCustomerService.getPotential().then((res) => setMsPotential(res.data.AllData)); 
        ServiceGroupService.getService().then((res) => setMService(res.data.AllData));
        PackageService.getPackage().then((res) => setMPackage(res.data.AllData));
        TeamInfoService.getTeamInfo().then((res) => setMteam(res.data.AllData));
        CustomerInformationService.getfCustomer().then((res) => setCustomerDatas(res.data.AllData));

    }, [toggleRefresh]);

    const openNew = () => {
        setManagerData(managerInfo);
        setSubmitted(false);
        setDataDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDataDialog(false);
    };

    const hideCusDialog = () => {
        setSubmitted(false);
        setCustomerDaialog(false);
        setCancelDialog(false)
    }


    const hideCancelDialog = () => {
        setSubmitted(false);
        setCancelDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteDataDialog(false);
    };


    const saveData = () => {
        setSubmitted(true);
        if( managerData.follows, managerData._id ) {
            CustomerInformationService.editManagerPanel(
                managerData.follows,
                managerData._id
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Follow is Updated', life: 3000 });
            })
        }
    };

    const saveCancelData = () => {
        setSubmitted(true);

        if(customer.cancel_cause && customer._id) {
            CustomerInformationService.cancelDeal(
                customer.cancel_cause,
                customer._id
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setCancelDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Deal Cancel', life: 3000 })
            })
        }
    }

    const saveCustomerData = () => {
        setSubmitted(true);
        if(customer.address && customer.service && customer.slot && customer.team_member && customer.team_lead && customer._id) {
            CustomerInformationService.editfCustomer(
                customer.address,
                customer.service,
                customer.slot,
                customer.team_member,
                customer.team_lead,
                customer._id
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setCustomerDaialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer Updated', life: 3000 })
                onNewPage(managerData._id);
            })
        }
        else if(customer.address && customer.service && customer.slot && customer.team_member && customer.team_lead) {
            CustomerInformationService.postfCustomer(
                managerData.name,
                customer.address,
                customer.service,
                customer.slot,
                customer.team_member,
                customer.team_lead,
                managerData._id
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setCustomerDaialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer Created', life: 3000 })
                onNewPage(managerData._id);
            })
        }
    }

    const followDate = (managerData) => {
        setManagerData({ ...managerData });
        setDataDialog(true);
        setOne(1);
    };

    const editFollowDat = (managerData) => {
        setManagerData({...managerData});
        setDataDialog(true);
        setOne(1);
    }

    const confirmDeleteData = (managerData) => {
        setManagerData(managerData);
        setDeleteDataDialog(true);
    };

    const deleteData = () => {
        CustomerInformationService.deleteCustomerInfo(managerData._id).then(() => {
            setTogleRefresh(!toggleRefresh);
            setDeleteDataDialog(false);
            setManagerData(managerInfo);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer is Deleted', life: 3000 });
        })
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let data = { ...managerData };
        data.follows[`${name}`] = val;

        setManagerData(data);
    };

    const onSelectionChange = (e, name) => {
        let _infoData = {...managerData };
        _infoData.follows[`${name}`] = e.value;
        
        setManagerData(_infoData);
    }

    const onCusSelectionChange = (e, name) => {
        let _infoData = {...customer };
        _infoData[`${name}`] = e.value;
        
        setCustomer(_infoData);
    }

    const onCancelChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _infoData = {...customer };
        _infoData[`${name}`] = val;

        setCustomer(_infoData);
    };

    // const onSelectionChange1 = (e, name) => {
    //     let data = {...customer };
    //     const newVal = mteam?.filter(item => e.value.includes(item.service_name));

    //     data[`${name}`] = newVal;
       
    //     const data3 = {...customer} 
    //     setCustomer(data);
    // }


    const onAddressChange = (e, prev_address) => {
        let id1 = prev_address?.filter(item => item.add == e.value)?.map(item=> item.id).toString();
        const num = Math.random().toString().slice(2);
        let _infoData = {...managerData };
        _infoData.follows = {}
        _infoData.follows['id'] = num;
        _infoData.follows['aid'] = id1;
        _infoData.follows['add1'] = e.value;
        setManagerData(_infoData);
    }

    const onDateChange = (e) => {
        let _manageData = {...managerData };
        _manageData.follows.followDate = e.value;
        setManagerData(_manageData);
    }

    const onPtimeChange = (e, name) => {
        let _manageData = {...managerData };
        _manageData.follows[`${name}`] = e.value;
        setManagerData(_manageData);
    }

    let addressList;
    if(one == 1 || check == 1) {
        let m = managerData.address;
        addressList = m?.map(item => {
            return { label: item.address, value: item.address, id: item.id }
        })
    }

    const filteredPriority = msPriority?.filter((item) => item.is_active == '1');
    const priorityList = filteredPriority?.map(item => {
        return { label: item.name, value: item.name }
    }) 

    const filteredPotential = msPotential?.filter((item) => item.is_active == '1');
    const potentialList = filteredPotential?.map(item => {
        return { label: item.name, value: item.name };
    })

    const filteredService = mService?.filter((item) => item.is_active == '1');
    const filteredPackge = mPackage?.filter((item) => item.is_active == '1');

    let serviceList;
    if(check == 1) {
        serviceList = filteredService.concat(filteredPackge)

        serviceList = serviceList?.map(item => {
            return { label: item.service_name, value: item.service_name}
        })
    }

    const slotList = [
        {label: 'Moraning', value: 'Moraning'},
        {label: 'Evening', value: 'Evening'}
    ];

    const filteredTeam = mteam?.filter(item => item.is_active == '1');
    const teamList = filteredTeam?.map(item => {
        return { label: item.name, value: item.name}
    })

    
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
                {rowData.address?.map((item, i) => <ol start={i+1}><li>{item.address}</li></ol>)}
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
                {rowData.address?.map((item, i) => <ol start={i+1}><li>{item.category}</li></ol>)}
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

    const coustomerData = (customer) => {
        setCustomer(customerInfo)
        setManagerData({ ...customer})
        setCustomerDaialog(true);
        setCheck(1)
    };

    const editCustomerData = (customer, ch1) => {
        const filteredData = customerDatas.filter(item => item.customerId == customer._id);
        setCustomer(...filteredData);
        setManagerData({...customer });
        if(ch1 == 'edit') {
            setCustomerDaialog(true);
        } else {
            setCancelDialog(true);
        }
        setCheck(1);
    }

    const onNewPage = (id) => {
       
        window.open(`/pages/invoice?id=${id}`, '_blank', 'noreferrer')
    }


    const actionBodyTemplate = (rowData) => {
       
        const filData = customerDatas?.filter(item => item.customerId == rowData._id)
        if(JSON.stringify(rowData.follows) !== '{}' && filData !=undefined && filData.length > 0  ) {
            return (
                <>
                    <Button label='Follow' severity="success"  className="m-1" onClick={() => editFollowDat(rowData)} />
                    <Button label='Make deal' severity="success" className="m-1"  onClick={() => editCustomerData(rowData, 'edit')} />
                    <Button label='Deal Cancel' severity="danger" className="m-1" onClick={() => editCustomerData(rowData, 'cancel')} />
                </>
            );
        } else if(JSON.stringify(rowData.follows) !== '{}' && (filData == undefined || filData?.length == 0)) {
            return (
                <>
                    <Button label='Follow' severity="success"  className="m-1" onClick={() => followDate(rowData)} />
                    <Button label='Make deal' severity="warning" className="m-1" onClick={() => coustomerData(rowData, 'edit')} />
                    <Button label='Deal Cancel' disabled severity="danger" className="m-1" onClick={() => editCustomerData(rowData, 'cancel')} />
                </>
            );
        } else if(JSON.stringify(rowData.follows) === '{}' && (filData !=undefined && filData?.length > 0)) {
            return(
                <>
                    <Button label='Follow' severity="warning"  className="m-1" onClick={() => followDate(rowData)} />
                    <Button label='Make deal' severity="success" className="m-1" onClick={() => editCustomerData(rowData, 'edit')} />
                    <Button label='Deal Cancel' severity="danger" className="m-1" onClick={() => editCustomerData(rowData, 'cancel')} />
                </>
            )
        } else {
            return(
                <>
                    <Button label='Follow' severity="warning"  className="m-1" onClick={() => followDate(rowData)} />
                    <Button label='Make deal' severity="warning" className="m-1" onClick={() => coustomerData(rowData)} />
                    <Button label='Deal Cancel' disabled severity="danger" className="m-1" onClick={() => editCustomerData(rowData)} />
                </>
            )
        }
    };
        
    const topHeader = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <h2 className="m-0">Manager Panel</h2>
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

    const coustomerDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideCusDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveCustomerData} />
        </>
    )

    const cancelDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideCancelDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveCancelData} />
        </>
    )

    const deleteDataDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteData} />
        </>
    );

    const filteredManagerDatas = managerDatas?.filter(item => item.is_active == '1');

    if(filteredManagerDatas == null) {
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
                        value={filteredManagerDatas}
                        selection={selectedDatas}
                        onSelectionChange={(e) => setSelectedDatas(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} Out of {totalRecords} Category"
                        globalFilter={globalFilter}
                        emptyMessage="Manager Panel is Empty."
                        header={header}
                        responsiveLayout="scroll"
                    >

                        <Column
                            field="name"
                            header="Name"
                            sortable
                            body={nameBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
                        ></Column>
                        <Column
                            field="phone"
                            header="Phone"
                            body={phoneBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
                        ></Column>
                        <Column
                            field="email"
                            header="Email"
                            body={emailBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
                        ></Column>
                        <Column
                            field="address"
                            header="Address"
                            body={addressBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
                        ></Column>
                        <Column
                            field="zone"
                            header="Zone"
                            body={zoneBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
                        ></Column>
                        <Column
                            field="category"
                            header="Category"
                            body={categoryBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
                        ></Column>
                         <Column
                            field="details"
                            header="Details"
                            body={detailsBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
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
                        header="Add Following"
                        modal
                        className="p-fluid"
                        footer={dataDialogFooter}
                        onHide={hideDialog}
                    >

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="managerData">Address</label>
                                <Dropdown
                                    value={managerData.follows?.add1}
                                    name='address'
                                    onChange={(e) => onAddressChange(e, managerData.address)}
                                    options={addressList}
                                    optionLabel="value"
                                    showClear
                                    placeholder="Select a address"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !managerData.follows,
                                    })}
                                />
                                {submitted && !managerData.follows && (
                                    <small className="p-invalid">
                                        follows is required.
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="managerData">Follow Up Date</label>
                                <Calendar 
                                    value={new Date(managerData.follows?.followDate)}
                                    name='followDate' 
                                    onChange={(e) => onDateChange(e)} 
                                    dateFormat="dd/mm/yy" 
                                    placeholder="Select a Date"
                                    required
                                    showIcon
                                    className={classNames({
                                        "p-invalid": submitted && !managerData.follows.followDate,
                                    })}
                                />
                                {submitted && !managerData.follows.followDate && (
                                    <small className="p-invalid">
                                        Follow Up Date is required.
                                    </small>
                                )}
                            </div>
                            {/* <div className="field col">
                                <label htmlFor="managerData">Phone Time</label>
                                <Calendar 
                                    id="calendar-timeonly" 
                                    value={managerData.follows.ptime}
                                    onChange={(e) => onPtimeChange(e, "ptime")} 
                                    timeOnly 
                                    hourFormat="12" 
                                />
                            </div> */}
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="managerData">Priority Group</label>
                                <Dropdown
                                    value={managerData.follows?.priority}
                                    name='priority'
                                    onChange={(e) => onSelectionChange(e, "priority")}
                                    options={priorityList}
                                    optionLabel="value"
                                    showClear
                                    placeholder="Select a Priority"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !managerData.follows.priority,
                                    })}
                                />
                                {submitted && !managerData.follows.priority && (
                                    <small className="p-invalid">
                                        Priority is required.
                                    </small>
                                )}
                            </div>

                            <div className="field col">
                                <label htmlFor="managerData">Potential Group</label>
                                <Dropdown
                                    value={managerData.follows?.potential}
                                    name='potential'
                                    onChange={(e) => onSelectionChange(e, "potential")}
                                    options={potentialList}
                                    optionLabel="value"
                                    showClear
                                    placeholder="Select a Potential"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !managerData.follows.potential,
                                    })}
                                />
                                {submitted && !managerData.follows.potential && (
                                    <small className="p-invalid">
                                        Potential is required.
                                    </small>
                                )}
                            </div>
                        </div>


                        <div className="field">
                            <label htmlFor="managerData">Feedback</label>
                            <InputTextarea
                                id="feedback"
                                value={managerData.follows?.feedback}
                                onChange={(e) =>
                                    onInputChange(e, "feedback")
                                }
                                required
                                rows={3}
                                cols={20}
                            />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteDataDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDataDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {managerData && (
                                <span>
                                    Are you sure you want to delete <b>{managerData.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog
                        visible={customerDaialog}
                        style={{ width: "550px" }}
                        header="Convert to Customer"
                        modal
                        className="p-fluid"
                        footer={coustomerDialogFooter}
                        onHide={hideCusDialog}
                    >
                        <div className="formgrid grid">
                            <div className="field col">
                            <label htmlFor="customer">Address</label>
                                <Dropdown
                                    value={customer.address}
                                    name='address'
                                    onChange={e => onCusSelectionChange(e, 'address')}
                                    options={addressList}
                                    placeholder="Select a Service"
                                    required
                                    className={classNames({ "p-invalid": submitted && customer.address.length < 1 || customer.address == undefined })}
                                />
                                {submitted && customer.address.length < 1 || customer.address == undefined && (
                                    <small className="p-invalid">
                                        Address is required.
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="customer">Service</label>
                                <Dropdown
                                    value={customer.service}
                                    name='service'
                                    onChange={e => onCusSelectionChange(e, 'service')}
                                    options={serviceList}
                                    placeholder="Select a Service"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !customer.service,
                                    })}
                                />
                                {submitted && !customer.service && (
                                    <small className="p-invalid">
                                        Service is required.
                                    </small>
                                )}
                            </div>

                            <div className="field col">
                                <label htmlFor="customer">Slot</label>
                                <Dropdown
                                    value={customer.slot}
                                    name='slot'
                                    onChange={e => onCusSelectionChange(e, 'slot')}
                                    options={slotList}
                                    placeholder="Select a Service"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !customer.slot,
                                    })}
                                />
                                {submitted && !customer.slot && (
                                    <small className="p-invalid">
                                        slot is required.
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="customer">Team Member</label> 
                                <MultiSelect 
                                    value={customer.team_member} 
                                    onChange={(e) => onCusSelectionChange(e, "team_member")} 
                                    required 
                                    options={teamList} 
                                    optionLabel="label" 
                                    placeholder="Select Team Member" 
                                    maxSelectedLabels={3} 
                                    display="chip"
                                    className={classNames({ 'p-invalid': submitted && customer.team_member.length < 1 || customer.team_member == undefined })}
                                />
                                {submitted && customer.team_member.length < 1 || customer.team_member == undefined && <small className="p-invalid">
                                    Team Member is required.
                                </small>} 
                            </div>

                            <div className="field col">
                                <label htmlFor="customer">Team Lead</label>
                                <Dropdown
                                    value={customer.team_lead}
                                    name='team_lead'
                                    onChange={e => onCusSelectionChange(e, 'team_lead')}
                                    options={teamList}
                                    placeholder="Select a Service"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !customer.team_lead,
                                    })}
                                />
                                {submitted && !customer.team_lead && (
                                    <small className="p-invalid">
                                        Team Lead is required.
                                    </small>
                                )}
                            </div>
                        </div>

                    </Dialog>

                    <Dialog
                        visible={cancelDialog}
                        style={{ width: "550px" }}
                        header="Cancel Customer"
                        modal
                        className="p-fluid"
                        footer={cancelDialogFooter}
                        onHide={hideCusDialog}
                    >

                        <div className="field">
                            <label htmlFor="customer">Cancelling Cause</label>
                            <InputTextarea
                                id="cancel_cause"
                                value={customer.cancel_cause}
                                onChange={(e) =>
                                    onCancelChange(e, "cancel_cause")
                                }
                                required
                                rows={3}
                                cols={20}
                            />
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default  Manager_Panel;

