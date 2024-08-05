import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PRIMARY_BACKEND } from '../config';

interface ZapModalProps {
    showModal: boolean;
    onClose: () => void;
    title: string;
    index: number;
    onSelectAction: (actionName: string, index: number) => void;
    type : string;
}

type availableAction = {
    id: string,
    name: string,
    image: string,
}[]

type availableTriggers = {
    id: string,
    name: string,
    image: string
}[]

export function ZapModal({ showModal, onClose, title, index, onSelectAction , type }: ZapModalProps) {
    const [availableActions, setAvailableActions] = useState<availableAction>([]);
    const [availableTrigger, setAvailableTrigger] = useState<availableTriggers>([]);
    useEffect(() => {


        async function fetchAction() {
            try {
                const responseActoin = await axios.get("http://localhost:3000/api/v1/action/available");
                setAvailableActions(responseActoin.data.availableActions);
                console.log(responseActoin.data.availableActions)

                const responseTrigger = await axios.get("http://localhost:3000/api/v1/trigger/avaliable");
                setAvailableTrigger(responseTrigger.data.availableTriggers);
                console.log(responseTrigger.data.availableActions)

            } catch (error) {
                console.log("something went wrong")
            }

        }

        fetchAction();

    }, [])
    return (
        <div className="bg-gray-100 p-4 flex items-center justify-center h-screen">
            <div>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-96 max-w-full shadow-lg transform transition-all duration-300">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
                                <h2 className="text-2xl font-semibold">Choose Your {title}</h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-x"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            <div className="mt-6 space-y-4">
                                <p className="text-lg text-gray-600">Choose Your actions</p>
                                <div className="flex flex-col space-y-4">

                                    {type == "action" ? availableActions.map(action => <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                        onClick={() => onSelectAction(action.name, index)}
                                    >
                                        {action.name}
                                    </button>) : availableTrigger.map(action => <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                        onClick={() => onSelectAction(action.name, index)}
                                    >
                                        {action.name}
                                    </button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
