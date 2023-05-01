import React, { useContext, useEffect, useState } from 'react';
import './ModalTask.css';
import { MainStoreContext } from '../../store';
import {observer} from 'mobx-react';

const ModalTask = ({active, setActive, id}) => {
    const {TasksStore} = useContext(MainStoreContext);
    const {UsersStore} = useContext(MainStoreContext);
    
    const [status, setStatus] = useState(TasksStore.taskData?.status);
    const [task, setTask] = useState(TasksStore.taskData?.task);
    const [description, setDescription] = useState(TasksStore.taskData?.description);
    const [priority, setPriority] = useState(TasksStore.taskData?.priority);
    const [responsible, setResponsible] = useState(TasksStore.taskData?.responsible);
    const [finishedAt, setFinishedAt] = useState(TasksStore.taskData?.finishedAt);

    let defaultDate = TasksStore.taskData?.finishedAt;
    // let creatorId = TasksStore.taskData?.creator;

    useEffect(
        () => {
            TasksStore.getTask(id);
            UsersStore.getResponsibles();
        },
        [id]
    )

    const updateTask = () => {
        TasksStore.updateTask(id, task, description, finishedAt, priority, status, responsible);
        setActive(false);
    }
    
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal_content active" : "modal_content"} onClick={(event) => event.stopPropagation()}>
                <form method='POST' className='task_form'>
                    <h2>Задача</h2>
                    {
                        TasksStore.isAuthor ?
                            <div className="green_modal">Вы можете редактировать все поля</div> :
                            <div className="green_modal">Вы можете редактировать только статус выполнения</div>
                    }

                    <div className="task_form_box">
                        <div>Заголовок</div>
                        {
                            TasksStore.isAuthor ?
                                <input
                                    type="text"
                                    defaultValue={TasksStore.taskData?.task}
                                    onChange={event => setTask(event.target.value)}
                                    className='task_form_box_data'
                                /> :
                                <div className='task_form_box_data'>{TasksStore.taskData?.task}</div>
                        }
                    </div>

                    <div className="task_form_box">
                        <div>Описание</div>
                        {
                            TasksStore.isAuthor ?
                                <input
                                    type="text"
                                    defaultValue={TasksStore.taskData?.description}
                                    onChange={event => setDescription(event.target.value)}
                                    className='task_form_box_data'
                                /> :
                                <div className='task_form_box_data'>{TasksStore.taskData?.description}</div>
                        }
                    </div>

                    <div className="task_form_box">
                        <div>Приоритет</div>
                        {
                            TasksStore.isAuthor ?
                                <select
                                    value={TasksStore.taskData?.priority}
                                    onChange={event => setPriority(event.target.value)}>
                                    <option value='Высокий'>Высокий</option>
                                    <option value='Средний'>Средний</option>
                                    <option value='Низкий'>Низкий</option>
                                </select> :
                                <div className='task_form_box_data'>{TasksStore.taskData?.priority}</div>
                        }
                    </div>

                    <div className="task_form_box">
                        <div>Дата окончания</div>
                        {
                            TasksStore.isAuthor ?
                                <input
                                    type="datetime-local"
                                    defaultValue={defaultDate?.slice(0, 16)}
                                    onChange={event => setFinishedAt(event.target.value)}
                                    className='task_form_box_data'
                                /> :
                                <div className='task_form_box_data'>{new Date(defaultDate)?.toLocaleString('ru')?.slice(0, -3)}</div>
                        }
                    </div>

                    <div className="task_form_box">
                        <div>Статус</div>
                        <select value={TasksStore.taskData?.status} onChange={event => setStatus(event.target.value)}>
                            <option value='К выполнению'>К выполнению</option>
                            <option value='Выполняется'>Выполняется</option>
                            <option value='Выполнена'>Выполнена</option>
                            <option value='Отменена'>Отменена</option>
                        </select>
                    </div>

                    <div className="task_form_box">
                        <div>Ответственный</div>
                        {
                            TasksStore.isAuthor ?
                                <select
                                    className='task_form_box_data'
                                    value={TasksStore.taskData?.responsible}
                                    onClick={event => setResponsible(event.target.value)}>
                                    <option value='' disabled>Выберите ответственного</option>
                                    {
                                        UsersStore.responsibles?.map(element => {
                                            return <option key={element.id} value={element.id}>{element.lastName} {element.name} {element.middleName}</option>
                                        })
                                    }
                                </select> :
                                <div className='task_form_box_data'>{TasksStore.taskData?.responsibleLastName} {TasksStore.taskData?.responsibleName} {TasksStore.taskData?.responsibleMiddleName}</div>
                        }
                    </div>

                    <div className="task_form_box">
                        <div>Создатель</div>
                        <div className='task_form_box_data'>{TasksStore.taskData?.creatorLastName} {TasksStore.taskData?.creatorName} {TasksStore.taskData?.creatorMiddleName}</div>
                    </div>

                    <button type='button' className='task_button' onClick={updateTask}>Сохранить</button>
                </form>
            </div>
        </div>
    );
}

export default observer(ModalTask);