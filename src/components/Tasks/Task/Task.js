import React, {useState} from 'react';
import ModalTask from '../../ModalTask/ModalTask';
import './Task.css';
import {observer} from 'mobx-react';

const Task = (props) => {
    const [modalActive, setModalActive] = useState(false);
    const [taskId, setTaskId] = useState('');


    const openModal = () => {
        setModalActive(true);
    }

    return (
        <>
            <div className='tasks_item'
                onClick={() => {
                    openModal();
                    setTaskId(props.id)
                }}>
                <div className='tasks_item_data'>
                    <div className={
                        props.status === 'К выполнению' && new Date(props.finishedAt) < new Date() || props.status === 'Выполяется' && new Date(props.finishedAt) < new Date() ?
                        'tasks_item_name red' :
                            props.status === 'Выполнена' ?
                            'tasks_item_name green' :
                            'tasks_item_name grey'
                    }>
                        {props.task}
                    </div>
                    <div className='tasks_item_priority'>
                        <b>Приоритет:</b> {props.priority}
                    </div>
                    <div className='tasks_item_date'>
                        <b>Дата окончания:</b> {new Date(props.finishedAt).toLocaleString('ru').slice(0, -3)}
                    </div>
                    <div className='tasks_item_responsible'>
                        <b>Ответственный:</b> {props.responsibleName} {props.responsipbleLastName} {props.responsibleMiddleName}
                    </div>
                    <div className='tasks_item_status'>
                        <b>Статус:</b> {props.status}
                    </div>
                </div>
            </div>
            <ModalTask active={modalActive} setActive={setModalActive} id={taskId}/>
        </>
    );
}

export default observer(Task);