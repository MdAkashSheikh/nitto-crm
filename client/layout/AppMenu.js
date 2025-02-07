import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Lead Sheet',
                    icon: 'pi pi-fw pi-list',
                    to: '/pages/lead_info1'
                },
                {
                    label: 'Follow Up',
                    icon: 'pi pi-fw pi-box',
                    to: '/pages/follow_up'
                },
                {
                    label: 'Invoice Information',
                    icon: 'pi pi-fw pi-print',
                    to: '/pages/invoice_info'
                },
                {
                    label: 'Customer',
                    icon: 'pi pi-fw pi-pencil',
                    to: '/pages/cutomer'
                },
                {
                    label: 'Booking',
                    icon: 'pi pi-fw pi-briefcase',
                    to: '/pages/booking_info'
                },
                
                {
                    label: 'Cancel',
                    icon: 'pi pi-fw pi-times',
                    to: '/pages/cancel_info'
                },
                {
                    label: 'Report Information',
                    icon: 'pi pi-fw pi-book',
                    to: '/pages/report_info'
                },
                // {
                //     label: 'Team Information',
                //     icon: 'pi pi-fw pi-users',
                //     to: '/pages/team_info'
                // },
                // {
                //     label: 'Manager Panel',
                //     icon: 'pi pi-fw pi-stop-circle',
                //     to: '/pages/manager_panel'
                // },


                //invoice_info

                // {
                //     label: 'Timeline',
                //     icon: 'pi pi-fw pi-calendar',
                //     to: '/pages/timeline'
                // },
                // {
                //     label: 'Not Found',
                //     icon: 'pi pi-fw pi-exclamation-circle',
                //     to: '/pages/notfound'
                // },
                // {
                //     label: 'Empty',
                //     icon: 'pi pi-fw pi-circle-off',
                //     to: '/pages/empty'
                // }
            ]
        },

        {
            label: 'Setting',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Team Information',
                    icon: 'pi pi-fw pi-users',
                    to: '/pages/team_info'
                },
                {
                    label: 'Master Data',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'Data Source',
                            icon: 'pi pi-fw pi-database',
                            to: '/master/data_source'
                        },
                        {
                            label: 'Data Group',
                            icon: 'pi pi-fw pi-server',
                            to: '/master/data_group'
                        },
                        // {
                        //     label: 'Priority Group',
                        //     icon: 'pi pi-fw pi-angle-double-up',
                        //     to: '/master/priority_group'
                        // },
                        // {
                        //     label: 'Potential Customer Group',
                        //     icon: 'pi pi-fw pi-users',
                        //     to: '/master/potential_customer'
                        // },
                        {
                            label: 'Zone',
                            icon: 'pi pi-fw pi-globe',
                            to: '/master/zone'
                        },
                        {
                            label: 'Category',
                            icon: 'pi pi-fw pi-list',
                            to: '/master/category'
                        },
                        {
                            label: 'Services',
                            icon: 'pi pi-fw pi-truck',
                            to: '/master/services'
                        },
                        {
                            label: 'Package Services',
                            icon: 'pi pi-fw pi-truck',
                            to: '/master/package_services'
                        },
                        {
                            label: 'Tank Information',
                            icon: 'pi pi-fw pi-clone',
                            to: '/master/tank_info'
                        },
                        {
                            label: 'Contact Information',
                            icon: 'pi pi pi-user',
                            to: '/master/contact'
                        },
                    ]
                },
            ]
        },
        // {
        //     label: 'Hierarchy',
        //     items: [
        //         {
        //             label: 'Submenu 1',
        //             icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 1.1',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 1.2',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Submenu 2',
        //             icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 2.1',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 2.2',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //                 }
        //             ]
        //         }
        //     ]
        // },
        
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
