import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react';
import { CustomerInformationService } from '../../../demo/service/CustomerInformationService';


const Invoice_Info = () => {

    const [invoiceDatas, setInvoiceDatas] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggleRefresh, setTogleRefresh] = useState(false);


    useEffect(() => {
        CustomerInformationService.getCustomerInfo().then((res) => setInvoiceDatas(res.data.AllData))

    }, [toggleRefresh]);

    const filterData = invoiceDatas?.filter((item) => item.confirm_status === 'confirm' || item.confirm_status === 'cancelled')


    const showInvoice = (reportData) => {
        window.open(`/pages/invoice?id=${reportData._id}`, '_blank', 'noreferrer')
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
                {rowData.address?.map((item, i)=><ol start={i+1}><li>{item.address}</li></ol>)}
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
                {rowData.address?.map((item, i)=><ol start={i+1}><li>{item.category}</li></ol>)}
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
        return <Tag value={rowData.confirm_status} severity={getProductSeverity(rowData)}></Tag>;
    };

    // const actionBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <Button label='Show' severity="success" className="mr-2" onClick={() => showInvoice(rowData)} />
    //         </>
    //     );
    // };

    const actionBodyTemplate = (rowData) => {

        if(rowData.confirm_status == 'cancelled') {
            return (
                <>
                    <Button label='Show' disabled severity="warning" className="mr-2"/>
                </>
            );
        } else {
            return (
                <>
                    <Button label='Show' severity="secondary" className="mr-2" onClick={() => showInvoice(rowData)} />
                </>
            );
        }
    };

    const getProductSeverity = (product) => {
        switch (product.confirm_status) {
            case 'confirm':
                return 'success';

            case 'cancelled':
                return 'danger';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };
        
    const topHeader = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <h2 className="m-0">Invoice Information</h2>
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

    if(invoiceDatas == null) {
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
                        value={filterData}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} Out of {totalRecords} Data-Source"
                        globalFilter={globalFilter}
                        emptyMessage="Invoice Information is Empty."
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
                            field="status"
                            header="Status"
                            body={statusBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            header="Action"
                            body={actionBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default  Invoice_Info;