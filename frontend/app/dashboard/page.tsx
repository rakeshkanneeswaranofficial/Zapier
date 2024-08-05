"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Appbar from '../components/Appbar'
import { useRouter } from 'next/navigation'
import { PRIMARY_BACKEND } from '../config'
import { LinkButton } from '../components/buttons/LinkButton'

interface Zap {
    id: string,
    triggerId: string,
    userId: number,
    actions: {
        id: string,
        zapId: string,
        actionId: string,
        sortingOrder: number,
        type: {
            id: string,
            name: string,
            image: string
        }
    }[],
    trigger: {
        id: string,
        zapId: string,
        triggerId: string,
        type: {
            id: string,
            name: string,
            image: string
        }
    }
}

function useZaps() {
    const [zaps, setZaps] = useState<Zap[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${PRIMARY_BACKEND}/api/v1/zap`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`
                    }
                })
                setZaps(res.data.zaps);
                setLoading(false);
                console.log(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                alert("Error fetching zaps. Please try again.");
            }
        }
        fetchData();
    }, [])

    return { zaps, loading }
}

export default function Dashboard() {

    const { zaps, loading } = useZaps();
    const router = useRouter();


    return (
        <div>

            <Appbar />
            <div className='flex py-6 justify-between px-10 items-center'>
                <div className='text-2xl font-bold '>
                    My Zaps
                </div>
                <button onClick={()=>{
                    router.push("/zap/create")
                }} className=' text-sm px-4 py-2 bg-purple-700 text-white rounded-lg hover:shadow-md focus:outline-none flex items-center justify-center'>
                    Create Zap
                </button>
            </div>
            <div className='px-9'>
            <Zaptable zaps={zaps}></Zaptable>
            </div>
   

        </div>
    )
}

function Zaptable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter();
    return (<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-lg text-gray-700  bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                    <th scope="col" className="px-6 py-3">Last Edit</th>
                    <th scope="col" className="px-6 py-3">Running</th>
                    <th scope="col" className="px-6 py-3">go</th>
                </tr>
            </thead>
            <tbody>

                {Array.isArray(zaps) && zaps.length > 0 ? zaps.map((z) => {
                    return <tr key={z.id} className="bg-white border-b">
                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{z.trigger.type.name} </td>
                        <td className='px-6 py-4'>
                            <div className='flex gap-2'>
                                {z.actions.map(action => (
                                    <div key={action.id}>{action.type.name}</div>
                                ))}
                            </div>
                        </td>
                        <td className='px-6 py-4'>{new Date(z.trigger.id).toLocaleDateString()}</td>
                        <td className='px-6 py-4'>{new Date(z.trigger.id).toLocaleDateString()}</td>

                        <td className='px-6 py-4'>
                            <LinkButton onClick={() => { router.push(`/zap/${z.id}`) }}>Go</LinkButton>
                        </td>
                    </tr>
                }) : "this"}

            </tbody>
        </table>
    </div>)
}
