import React, { useContext, useEffect, useState } from 'react';
import './ModalTask.css';
import { MainStoreContext } from '../../store';
import {observer} from 'mobx-react';

const ModalTask = ({active, setActive, id}) => {
    const {TasksStore} = useContext(MainStoreContext);
    
    const [status, setStatus] = useState(TasksStore.taskData?.status);
    // const [task, setTask] = useState(TasksStore.taskData?.task);
    // const [description, setDescription] = useState(TasksStore.taskData?.deskription);
    // const [priority, setPriority] = useState(TasksStore.taskData?.priority);
    // const [responsible, setResponsible] = useState(TasksStore.taskData?.responsible);
    // const [finishedAt, setFinishedAt] = useState(TasksStore.taskData?.finishedAt);
    
    useEffect(
        () => {
            TasksStore.getTask(id);
        },
        [id]
    )

    const updateTask = () => {
        TasksStore.updateTask(id, status);
        // console.log(task, description, priority, finishedAt, responsible);
        console.log(status);
        setActive(false);
    }
    
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal_content active" : "modal_content"} onClick={(event) => event.stopPropagation()}>
                <form action='POST' className='task_form'>
                    <h2>Задача</h2>

                    <div className="task_form_box">
                        <div>Заголовок</div>
                        <div className='task_form_box_data'>{TasksStore.taskData?.task}</div>  
                    </div>

                    <div className="task_form_box">
                        <div>Описание</div>
                        <div className='task_form_box_data'>{TasksStore.taskData?.description}</div>
                    </div>

                    <div className="task_form_box">
                        <div>Приоритет</div>
                        <div className='task_form_box_data'>{TasksStore.taskData?.priority}</div>  
                    </div>

                    <div className="task_form_box">
                        <div>Дата окончания</div>
                        <div className='task_form_box_data'>{new Date(TasksStore.taskData?.finishedAt).toLocaleString('ru').slice(0, -3)}</div> 
                    </div>

                    <div className="task_form_box">
                        <div>Статус</div>
                        <select value={status} onChange={event => setStatus(event.target.value)}>
                            <option value='К выполнению'>К выполнению</option>
                            <option value='Выполняется'>Выполняется</option>
                            <option value='Выполнена'>Выполнена</option>
                            <option value='Отменена'>Отменена</option>
                        </select> 
                    </div>

                    <div className="task_form_box">
                        <div>Ответственный</div>
                        <div className='task_form_box_data'>{TasksStore.taskData?.responsibleName} {TasksStore.taskData?.responsipbleLastName} {TasksStore.taskData?.responsibleMiddleName}</div>  
                    </div>

                    <button type='button' className='task_button' onClick={updateTask}>Сохранить</button>
                </form>
            </div>
        </div>
    );
}

export default observer(ModalTask);