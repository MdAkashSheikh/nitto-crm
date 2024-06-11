import React from 'react'

function tiForm() {
    
    return (
        <div>
            <Dialog visible={dataDialog}
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
                            value={managerData.follows.add1}
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
                            value={new Date(managerData.follows.followDate)}
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
                        {submitted && !managerData.followDate && (
                            <small className="p-invalid">
                                Follow Up Date is required.
                            </small>
                        )}
                    </div>
                    <div className="field col">
                        <label htmlFor="managerData">Phone Time</label>
                        <Calendar 
                            id="calendar-timeonly" 
                            value={managerData.follows.ptime}
                            onChange={(e) => onPtimeChange(e, "ptime")} 
                            timeOnly 
                            hourFormat="12" 
                        />
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="managerData">Priority Group</label>
                        <Dropdown
                            value={managerData.follows.priority}
                            name='priority'
                            onChange={(e) => onSelectionChange(e, "priority")}
                            options={priorityList}
                            optionLabel="value"
                            showClear
                            placeholder="Select a Priority"
                            required
                            className={classNames({
                                "p-invalid": submitted && !managerData.priority,
                            })}
                        />
                        {submitted && !managerData.priority && (
                            <small className="p-invalid">
                                Priority is required.
                            </small>
                        )}
                    </div>

                    <div className="field col">
                        <label htmlFor="managerData">Potential Group</label>
                        <Dropdown
                            value={managerData.follows.potential}
                            name='potential'
                            onChange={(e) => onSelectionChange(e, "potential")}
                            options={potentialList}
                            optionLabel="value"
                            showClear
                            placeholder="Select a Potential"
                            required
                            className={classNames({
                                "p-invalid": submitted && !managerData.potential,
                            })}
                        />
                        {submitted && !managerData.potential && (
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
                        value={managerData.feedback}
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
        </div>
    )
}

export default tiForm