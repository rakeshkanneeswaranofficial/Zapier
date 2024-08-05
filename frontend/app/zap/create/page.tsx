"use client";

import React, { useState } from 'react';
import Zapcell from '@/app/components/Zapcell';
import Appbar from '@/app/components/Appbar';
import Actioncreate from '@/app/components/buttons/Actioncreate';
import { ZapModal } from '@/app/components/Modal';

export default function Createpage() {
    const [selectedTrigger, setSelectedTrigger] = useState("");
    const [selectedActions, setSelectedActions] = useState<{
        availableActionName: string,
        availableActionId: string
    }[]>([]);

    const [showModal, setShowModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    const [title, setTitle] = useState("");

    const [type, setType] = useState("trigger")

    const handleActionSelect = (actionName: string, index: number) => {
        const updatedActions = [...selectedActions];
        updatedActions[index].availableActionName = actionName;
        setSelectedActions(updatedActions);
        setShowModal(false);
    };

    const handleTiggerSelect = (triggerName: string, index: number) => {
        setSelectedTrigger(triggerName);
        setShowModal(false);
    }

const [handler , setHandler]  = useState("actions");
    return (
        <div>
            <Appbar></Appbar>
            <div className='flex flex-col justify-center items-center'>
                <div className='pt-28'>
                    <Zapcell onClick={() => {
                        setShowModal(true);
                        setTitle("Trigger");
                        setModalIndex(1);
                        setType("Trigger")
                    }} name={selectedTrigger ? selectedTrigger : "Trigger"} index={1}></Zapcell>
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
                    {JSON.stringify(selectedActions)}
                </div>
            </div>
        </div>
    );
}
