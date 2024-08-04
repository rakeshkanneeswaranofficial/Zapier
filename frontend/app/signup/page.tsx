import React from 'react';
import Signupcard from '../components/Signupcard';
import Appbar from '../components/Appbar';

export default function Page() {
    return (
        <div>
<Appbar></Appbar>
        
        <div className='flex flex-row justify-center items-center py-44'>
            <div className='w-1/2 flex flex-col pl-7'>
                <h1 className='font-sans text-6xl font-bold'>
                    Join millions worldwide who automate their work using Zapier.
                </h1>
                <div className='pt-5'>
                    <div className='flex flex-row items-center gap-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20" color="success400" name="formCheckCircle">
                            <path fill="#2D2E2E" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8.21 10.79l2.79 2.8 5.29-5.3 1.42 1.42-6.71 6.7-4.21-4.2 1.42-1.42Z"></path>
                        </svg>
                        Easy setup, no coding required
                    </div>
                    <div className='flex flex-row items-center gap-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20" color="success400" name="formCheckCircle">
                            <path fill="#2D2E2E" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8.21 10.79l2.79 2.8 5.29-5.3 1.42 1.42-6.71 6.7-4.21-4.2 1.42-1.42Z"></path>
                        </svg>
                        Free forever for core features
                    </div>
                    <div className='flex flex-row items-center gap-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20" color="success400" name="formCheckCircle">
                            <path fill="#2D2E2E" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8.21 10.79l2.79 2.8 5.29-5.3 1.42 1.42-6.71 6.7-4.21-4.2 1.42-1.42Z"></path>
                        </svg>
                        Free forever for core features
                    </div>
                </div>
            </div>
            <Signupcard />
        </div>
        </div>
    );
}
