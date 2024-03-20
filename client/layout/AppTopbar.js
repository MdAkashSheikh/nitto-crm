import Link from 'next/link';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));
    const [date, setDate] = useState(null);

    const [date3, setDate3] = useState();
    const [isVisible, setIsVisible] = useState(false);
    
    const handleVisibility = (e) => {
      setIsVisible(!isVisible);
    };

    const handleVisibleChange = (e) => {
        console.log(e);
    };
    

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo.png`} width="150px" height={'70px'} widt={'true'} alt="logo" />
                {/* <span>SAKAI</span> */}
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" onClick={handleVisibility}  className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <Calendar
                    id="icon"
                    value={date3}
                    onChange={(e) => setDate3(e.value)}
                    showOnFocus={false}
                    visible={isVisible}
                    onVisibleChange={handleVisibleChange}
                    numberOfMonths={3}
                    hidden
                />
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
            </div>
        </div>
    );
});

export default AppTopbar;
