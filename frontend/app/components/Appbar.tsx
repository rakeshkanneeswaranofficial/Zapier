"use client";
import React from 'react';
import axios from 'axios';
import { PRIMARY_BACKEND } from '../config';
import { useRouter } from 'next/navigation';
import { LinkButton } from './buttons/LinkButton';// Assuming LinkButton is a separate component
import PrimaryButton from './buttons/PrimaryButton';


export default function Appbar() {
    const router = useRouter();

    return (
        <div className="h-14 flex justify-between items-center  shadow-md px-5 ">
            <div className="text-3xl font-bold cursor-pointer"  onClick={()=>{router.push("/")}}>
                <span className='text-orange-600'>_ </span>Zapier
            </div>
            <div className="flex space-x-4">
                <LinkButton onClick={() => router.push('/contact-sales')}>
                    Contact Sales
                </LinkButton>
                <LinkButton onClick={() => router.push('/login')}>
                    Login
                </LinkButton>
                <PrimaryButton size="small" onClick={async () => { 

                    
                    
                    router.push('/signup')
                    
                    }}>
                    Sign Up
                </PrimaryButton>
            </div>
        </div>
    );
}
