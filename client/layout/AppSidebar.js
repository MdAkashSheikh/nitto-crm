import { useEffect, useState } from 'react';
import { getJWTToken } from '../utils/utils';
import AppMenu from './AppMenu';

const AppSidebar = () => {
    // const [tokenState, setTokenState] = useState();

    // useEffect(() => {
    //     const token = getJWTToken();
    //     if(!token) {
    //         window.location = '/auth/login'
    //     }

    //     setTokenState(token)
    // })
    return <AppMenu></AppMenu>;
};

export default AppSidebar;
