import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from 'primereact/multiselect';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import { CategoryService } from '../../../demo/service/CategoryService';
import { CustomerInformationService } from '../../../demo/service/CustomerInformationService';
import { ZoneService } from '../../../demo/service/ZoneService';
import { TankInfoService } from '../../../demo/service/TankInfoService';
import { DataSourceService } from '../../../demo/service/SourceDataService';
import { FolloUpService } from '../../../demo/service/FollowUpService';

const Lead_Info = () => {
    let emptyInfo = {
        id: 0,
        zone: '',
        dataSource: '',
        name: '',
        address: [{category: '', address: '', house_con: '', reserve_tank: '', overhead_tank: [], price: ''}],
        phone: '',
        email: '',
        whatsapp: '',
        details: '',
        followCheck: '',
    };

    const [infoDatas, setInfoDatas] = useState(null);
    const [dataDialog, setDataDialog] = useState(false);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [infoData, setInfoData] = useState(emptyInfo);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [msZone, setMsZone] = useState(null);
    const [msCategory, setMsCategory] = useState(null);
    const [msDataSource, setMSDataSource] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggleRefresh, setTogleRefresh] = useState(false);
    const [msTank, setMSTank] = useState(null);
    const [mAddress, setMAddress] = useState([{category: '', address: '', house_con: '', reserve_tank: '', overhead_tank: [''], price: ''}])
    const [show, setShow] = useState(false);


    useEffect(() => {

        CustomerInformationService.getCustomerInfo().then((res) => setInfoDatas(res.data.AllData));
        ZoneService.getZone().then((res) => setMsZone(res.data.AllData));
        CategoryService.getCategory().then((res) => setMsCategory(res.data.AllData));
        TankInfoService.getTank().then((res) => setMSTank(res.data.AllData));
        DataSourceService.getSourceData().then((res) => setMSDataSource(res.data.AllData));

    }, [toggleRefresh]);


    const sortDatas = infoDatas?.sort((a, b) => a.followUpDate - b.followUpDate)

    const openNew = () => {
        setInfoData(emptyInfo);
        setSubmitted(false);
        setDataDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDataDialog(false);
        setShow(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteDataDialog(false);
    };

    const saveData = () => {
        setSubmitted(true);

        if( infoData.zone && infoData.dataSource && infoData.name && mAddress || infoData.phone || infoData.email || infoData.whatsapp || infoData.reFollowUpDate || infoData.serviceDate || infoData.details, infoData._id ) {
            CustomerInformationService.editCustomerInfo(
                infoData.zone,
                infoData.dataSource,
                infoData.name,
                mAddress,
                infoData.phone,
                infoData.email,
                infoData.whatsapp,
                infoData.reFollowUpDate,
                infoData.serviceDate,
                infoData.details,
                infoData._id,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                setShow(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Information is Updated', life: 3000 });
            })
        } 
    };

    const followCreate = () => {
        setSubmitted(true);

        if( infoData.zone && infoData.dataSource && infoData.name && mAddress) {
            FolloUpService.postFollow(
                infoData.zone,
                infoData.dataSource,
                infoData.name,
                mAddress,
                infoData.phone,
                infoData.email,
                infoData.whatsapp,
                infoData.followUpDate,
                infoData.details,
            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setDataDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'New Follow is Created', life: 3000 });
            })
        }
    }

    const editData = (infoData) => {
        setInfoData({ ...infoData });
        setMAddress(infoData.address)
        setDataDialog(true);
        setShow(true);
    };

    const confirmDeleteData = (infoData) => {
        setInfoData(infoData);
        setDeleteDataDialog(true);
    };

    const deleteData = () => {
        CustomerInformationService.deleteCustomerInfo(infoData._id).then(() => {
            setTogleRefresh(!toggleRefresh);
            setDeleteDataDialog(false);
            setInfoData(emptyInfo);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer is Deleted', life: 3000 });
        })
    };
 
    const filteredZone = msZone?.filter((item) => item.is_active == '1');
    const zoneList = filteredZone?.map(item => {
        return { label: item.name, value: item.name }
    })

    const filterSource = msDataSource?.filter((item) => item.is_active == '1');
    const dataSourceList = filterSource?.map(item => {
        return { label: item.name, value: item.name }
    })

    const filteredCategory = msCategory?.filter((item) => item.is_active == '1');
    const categoryList = filteredCategory?.map(item => {
        return { label: item.name, value: item.name}
    })

    const filterTank = msTank?.filter((item) => item.is_active == '1');
    const tankList = filterTank?.map(item => {
        return { label: item.name, value: item.name }
    })

    const rerserveList = [
        { label: 'Yes', value: 'Reserve Tank'},
        { label: 'No', value: ''},
    ]

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let data = { ...infoData };
        data[`${name}`] = val;

        setInfoData(data);
    };

    const onSelectionChange = (e, name) => {
        let _infoData = {...infoData };
        _infoData[`${name}`] = e.value;
        setInfoData(_infoData);
    }

    const onDateChange = (e, name) => {
        let _infoData = {...infoData };
        _infoData[`${name}`] = e.value;
        setInfoData(_infoData);
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

    const followUpBodyTemplate = (rowData) => {

        if(rowData.followCheck === 'lead follow up' && rowData.is_customer === '0') {
            return (
                <>
                    <span className="p-column-title">Details</span>
                    {'Lead Follow Up'}
                </>
            );
        } else if(rowData.is_customer === '1') {
            return (
                <>
                    <span className="p-column-title">Details</span>
                    {'Customer Follow Up'}
                </>
            );
        } else if(rowData.confirm_status === 'cancelled' ){
            return (
                <>
                    <span className="p-column-title">Details</span>
                    {'Cancell Follow Up'}
                </>
            );
        }
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editData(rowData)} />
                {/* <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteData(rowData)} /> */}
            </>
        );
    };
        
    const topHeader = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <h2 className="m-0">Follow Sheet</h2>
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            {/* <Button
                label="Add Follow"
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
            <Button label="Confirm" icon="pi pi-check" text onClick={saveData} />
        </>
    );
    const deleteDataDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteData} />
        </>
    );

    if(infoDatas == null) {
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

    function onAdd(){
        const newInfoData = {...infoData}
        const num = Date.now().toString();
        const newAddr = {val: '', id: num, tank_con: '', house_con: ''}
        newInfoData.address = [...infoData.address, newAddr]
        setInfoData(newInfoData)
    }

    function onAsset() {
        const newInfoData = {...infoData}
        newInfoData.asset = [...infoData.asset, '']
        setInfoData(newInfoData);
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
                        value={sortDatas}
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
                        emptyMessage="Customer Information is Empty."
                        header={header}
                        responsiveLayout="scroll"
                    >

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
                        {/* <Column
                            field="category"
                            header="Follow Status"
                            body={followUpBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column> */}
                        
                        <Column
                            header="Action"
                            body={actionBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
                        ></Column>
                    </DataTable>

                    <Dialog
                        visible={dataDialog}
                        style={{ width: "650px" }}
                        header="Follow Information"
                        modal
                        className="p-fluid"
                        footer={dataDialogFooter}
                        onHide={hideDialog}
                    >

                            <Formik
                                initialValues={{
                                    address: !infoData.address?.length ? [{category: '', address: '', house_con: '', reserve_tank: '', overhead_tank: [], price: ''}] : infoData.address
                                }}
                            >
                                {(formik) => (
                                    <Form>
                                        <div>
                                            <FieldArray
                                                name='address'
                                                render={(arrayHelpers) => {
                                                    return (
                                                        <div>
                                                            <div className="formgrid grid">
                                                                <div className="field col">
                                                                    <label htmlFor="infoData">Zone</label>
                                                                    <Dropdown
                                                                        value={infoData.zone}
                                                                        name='zone'
                                                                        onChange={(e) => onSelectionChange(e, "zone")}
                                                                        options={zoneList}
                                                                        optionLabel="value"
                                                                        showClear
                                                                        placeholder="Select a Zone"
                                                                        required
                                                                        disabled={show}
                                                                        className={classNames({
                                                                            "p-invalid": submitted && !infoData.zone,
                                                                        })}
                                                                    />
                                                                    {submitted && !infoData.zone && (
                                                                        <small className="p-invalid">
                                                                            Zone is required.
                                                                        </small>
                                                                    )}
                                                                </div>
                                                                <div className="field col">
                                                                    <label htmlFor="infoData">Data Source</label>
                                                                    <Dropdown
                                                                        value={infoData.dataSource}
                                                                        name='dataSource'
                                                                        onChange={(e) => onSelectionChange(e, "dataSource")}
                                                                        options={dataSourceList}
                                                                        optionLabel="value"
                                                                        showClear
                                                                        placeholder="Select a Data Source"
                                                                        required
                                                                        disabled={show}
                                                                        className={classNames({
                                                                            "p-invalid": submitted && !infoData.dataSource,
                                                                        })}
                                                                    />
                                                                    {submitted && !infoData.dataSource && (
                                                                        <small className="p-invalid">
                                                                            Data Source is required.
                                                                        </small>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="formgrid grid">
                                                                <div className="field col">
                                                                    <label htmlFor="infoData">Name</label>
                                                                    <InputText
                                                                        id="name"
                                                                        value={infoData.name}
                                                                        onChange={(e) => onInputChange(e, "name")}
                                                                        required
                                                                        disabled={show}
                                                                        className={classNames({
                                                                            "p-invalid": submitted && !infoData.name,
                                                                        })}
                                                                    />
                                                                    {submitted && !infoData.name && (
                                                                        <small className="p-invalid">
                                                                            Name is required.
                                                                        </small>
                                                                    )}
                                                                </div>
                                                                <div className="field col">
                                                                    <label htmlFor="infoData">Phone</label>
                                                                    <InputText
                                                                        id="age"
                                                                        value={infoData.phone}
                                                                        disabled={show}
                                                                        onChange={(e) => onInputChange(e, "phone")}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="formgrid grid">
                                                                <div className="field col">
                                                                    <label htmlFor="infoData">Email</label>
                                                                    <InputText
                                                                        id="email"
                                                                        value={infoData.email}
                                                                        disabled={show}
                                                                        onChange={(e) => onInputChange(e, "email")}
                                                                    />
                                                                </div>
                                                                <div className="field col">
                                                                    <label htmlFor="infoData">What's App</label>
                                                                    <InputText
                                                                        id="whatsapp"
                                                                        value={infoData.whatsapp}
                                                                        disabled={show}
                                                                        onChange={(e) => onInputChange(e, "whatsapp")}
                                                                    />
                                                                </div>
                                                            </div>

                                                            {setMAddress(formik.values.address)}
                                                            {formik.values.address.map((address, i) => (
                                                                <div key={i}>
                                                                    <div className='card my-3'>
                                                                        <div className='field'>
                                                                            <div className='formgrid grid'>
                                                                                <div className='field col'>
                                                                                    <label htmlFor='address'>Address - {i+1}</label>
                                                                                    <InputText
                                                                                        id='address'
                                                                                        value={formik.values.address[i].address}
                                                                                        disabled={show}
                                                                                        onChange={(e) => {
                                                                                            formik.setFieldValue(`address.${i}.address`, e.target.value)
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="formgrid grid mt-2">
                                                                                <div className="field col">
                                                                                    <label htmlFor='address'>Category</label>
                                                                                    <Dropdown
                                                                                        inputId="category"
                                                                                        name="category"
                                                                                        value={formik.values.address[i].category}
                                                                                        options={categoryList}
                                                                                        optionLabel="label"
                                                                                        placeholder="Select a Category"
                                                                                        onChange={(e) => {
                                                                                            formik.setFieldValue(`address.${i}.category`, e.value)
                                                                                        }}
                                                                                    />
                                                                                </div>

                                                                                <div className='field col'>
                                                                                    <label htmlFor='address'>Building Status</label>
                                                                                    <InputText
                                                                                        id='house_con'
                                                                                        value={formik.values.address[i].house_con}
                                                                                        placeholder='Num of floor'
                                                                                        onChange={(e) => {
                                                                                            formik.setFieldValue(`address.${i}.house_con`, e.target.value)
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className='formgrid grid mt-2'> 
                                                                                <div className='field col'>
                                                                                    <label htmlFor='address'>Reserve Tank</label>
                                                                                    <Dropdown
                                                                                        inputId="reserve_tank"
                                                                                        name="reserve_tank"
                                                                                        value={formik.values.address[i].reserve_tank}
                                                                                        options={rerserveList}
                                                                                        optionLabel="label"
                                                                                        placeholder="Select a Tank"
                                                                                        onChange={(e) => {
                                                                                            formik.setFieldValue(`address.${i}.reserve_tank`, e.value)
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className='field col'>
                                                                                    <label htmlFor='address'>Over Head Tank</label>
                                                                                    <MultiSelect
                                                                                        inputId="overhead_tank"
                                                                                        name="overhead_tank"
                                                                                        value={formik.values.address[i].overhead_tank}
                                                                                        options={tankList}
                                                                                        optionLabel="label"
                                                                                        placeholder="Select a Tank"
                                                                                        display="chip"
                                                                                        onChange={(e) => {
                                                                                            formik.setFieldValue(`address.${i}.overhead_tank`, e.value)
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className='formgrid grid'>
                                                                                <div className='field col'>
                                                                                    <label htmlFor='address'>Price</label>
                                                                                    <InputText
                                                                                        id='address'
                                                                                        value={formik.values.address[i].price}
                                                                                        onChange={(e) => {
                                                                                            formik.setFieldValue(`address.${i}.price`, e.target.value)
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='formgrid grid mt-2' hidden={show}>
                                                                            <div className='field col'>
                                                                                {i > 0 && <Button 
                                                                                    label="Remove" 
                                                                                    icon="pi pi-times" 
                                                                                    text onClick={() => arrayHelpers.remove(i)} 
                                                                                />}
                                                                            </div>
                                                                            <div className='field col'></div>
                                                                            <div className='field col'></div>
                                                                            <div className='field col'></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className='formgrid grid mt-2' hidden={show}>
                                                                <div className='field col'>
                                                                    <Button 
                                                                        label='add' 
                                                                        icon="pi pi-plus" 
                                                                        text 
                                                                        onClick={() => arrayHelpers.insert(formik.values.address.length + 1, 
                                                                            {category:'', address: '', tank_con: '', house_con: ''}
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className='field col'></div>
                                                                <div className='field col'></div>
                                                                <div className='field col'></div>
                                                                <div className='field col'></div>
                                                            </div>
                                                            <div className="formgrid grid" hidden={!show}>
                                                                <div className="field col">
                                                                    <label htmlFor="infoData">Re Follow Up Date</label>
                                                                    <InputText
                                                                        id="reFollowUpDate"
                                                                        value={infoData.reFollowUpDate}
                                                                        placeholder='Enter Month'
                                                                        onChange={(e) => onInputChange(e, "reFollowUpDate")}
                                                                    />
                                                                    {/* <Calendar 
                                                                        value={infoData.reFollowUpDate} 
                                                                        onChange={(e) => onDateChange(e, 'reFollowUpDate')} 
                                                                        dateFormat="dd/mm/yy" 
                                                                        numberOfMonths={2}
                                                                    /> */}
                                                                </div>
                                                            </div>
                                                    
                                                            <div className="formgrid grid">
                                                                <div className="field col">
                                                                    <label htmlFor="infoData">Service Date</label>
                                                                    <Calendar 
                                                                        value={new Date(infoData.serviceDate)} 
                                                                        onChange={(e) => onDateChange(e, 'serviceDate')} 
                                                                        dateFormat="dd/mm/yy"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="formgrid grid">
                                                                <div className="field col">
                                                                    <label htmlFor="infoData">Details</label>
                                                                    <InputTextarea
                                                                        id="details"
                                                                        value={infoData.details}
                                                                        onChange={(e) => onInputChange(e, "details")}
                                                                        rows={3} cols={30}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }}
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                    </Dialog>

                    <Dialog visible={deleteDataDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDataDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {infoData && (
                                <span>
                                    Are you sure you want to delete <b>{infoData.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                    
                </div>
            </div>
        </div>
    );
};

export default  Lead_Info;