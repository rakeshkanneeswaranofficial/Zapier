"use client";

import React, { useState } from 'react';
import Zapcell from '@/app/components/Zapcell';
import Appbar from '@/app/components/Appbar';
import Actioncreate from '@/app/components/buttons/Actioncreate';
import { ZapModal } from '@/app/components/Modal';
import axios from 'axios';
import { PRIMARY_BACKEND } from '@/app/config';
import { headers } from 'next/headers';

const options = {
    headers: {
        Authorization: localStorage.getItem("token")
    }
};

interface CreateZap {
    availableTriggerId: string,
    triggerMeta?: string,
    actions: {
        availableActionId: string,
        actionMetadata?: string,
    }[]
}
export default function Createpage() {
    const [selectedTrigger, setSelectedTrigger] = useState<{
        availableTriggerName: string,
        availableTriggerId: string
    }>();
    const [selectedActions, setSelectedActions] = useState<{
        availableActionName: string,
        availableActionId: string
    }[]>([]);

    const [showModal, setShowModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    const [title, setTitle] = useState("");

    const [type, setType] = useState("trigger")

    const handleActionSelect = (actionName: string, actionId: string, index: number) => {
        const updatedActions = [...selectedActions];
        updatedActions[index].availableActionName = actionName;
        updatedActions[index].availableActionId = actionId;
        setSelectedActions(updatedActions);
        setShowModal(false);
    };

    const handleTiggerSelect = (triggerName: string, triggerId: string, index: number) => {
        setSelectedTrigger({
            availableTriggerName: triggerName,
            availableTriggerId: triggerId
        });
        setShowModal(false);
    }
    const [handler, setHandler] = useState("actions");
    return (
        <div>
            <Appbar></Appbar>
            <div className='flex justify-center'>
                <button className='bg-primarybutton' onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/zap", {
                        availableTriggerId: selectedTrigger?.availableTriggerId,
                        actions: selectedActions
                    }, options)

                    if (response.status == 200) {
                        alert("added zap")
                    }
                    else {
                        alert("Failed to add zap")
                    }

                }}>Publish Z</button>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <div className='pt-28'>
                    <Zapcell onClick={() => {
                        setShowModal(true);
                        setTitle("Trigger");
                        setModalIndex(1);
                        setType("Trigger")
                    }} name={selectedTrigger?.availableTriggerName ? selectedTrigger.availableTriggerName : "Trigger"} index={1}></Zapcell>
                </div>
                <div>
                    {selectedActions.map((action, index) => (
                        <div className='py-2' key={index}>
                            <Zapcell onClick={() => {
                                setShowModal(true);
                                setTitle("Actions");
                                setModalIndex(index);
                                setType("action")
                                setHandler("actions")
                            }} name={action.availableActionName ? action.availableActionName : "Actions"} index={2 + index}></Zapcell>
                        </div>
                    ))}
                </div>

                <div className='py-2'>
                    <Actioncreate onClick={() => {
                        setSelectedActions(a => [...a, {
                            availableActionName: "action",
                            availableActionId: ""
                        }]);
                    }} size='small'>+</Actioncreate>
                </div>

                {showModal &&
                    <ZapModal
                        index={modalIndex}
                        title={title}
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        onSelectAction={type == "action" ? handleActionSelect : handleTiggerSelect}
                        type={type}
                    />
                }

                <div>
                    <div className='flex flex-col'>
                        <div>
                            {JSON.stringify(selectedActions)}
                        </div>
                        <div>
                            {JSON.stringify(selectedTrigger)}
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
}
