import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import { URL } from '../../../demo/service/SourceDataService';
import { getJWTToken, saveJWTToken, saveUserName } from '../../../utils/utils';

const LoginPage = () => {
    const router = useRouter();
    const toast = useRef()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const { layoutConfig } = useContext(LayoutContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${URL}/signin`, formData);
           
            const token = res?.data.token;
            const jwtEmail = res?.data.email;

            saveJWTToken(token)
            saveUserName(jwtEmail);

            router.push('/')
        } catch (error) {
            console.log(error)
            toast.current.show({ severity: 'warn',  summary: 'ERROR', detail: 'Please add valid email and password!', life: 3000 })
        }
    }


    
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <Toast ref={toast} position="top-center"/>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo.png`} alt="CleanBattle" width="250px" height={'100px'}  />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src="/demo/images/login/logo1.jpg" alt="Image" width={"120px"} height="70"/>
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, CleanBattle!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText 
                                id="email" 
                                type="text" 
                                placeholder="Email address" 
                                onChange={handleChange}
                                className="w-full md:w-30rem mb-5" 
                                style={{ padding: '1rem' }} 
                            />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                    
                            <InputText 
                                id="password" 
                                type="password" 
                                placeholder="Password" 
                                onChange={handleChange}
                                className="w-full md:w-30rem mb-5" 
                                style={{ padding: '1rem' }} 
                            />

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                {/* <div className="flex align-items-center">
                                    <Checkbox inputid="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a> */}
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl"></Button>
                        </form>
                        <Button label="Go to Sign Up Page" text onClick={() => router.push('/auth/register')} />
                    </div>
                </div>
            </div>
        </div>
    );
};


LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;
