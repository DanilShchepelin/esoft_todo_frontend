import React, { useState, useContext, useEffect } from 'react';
import './NewTask.css';
import { MainStoreContext } from '../../store';
import {observer} from 'mobx-react';

const NewTask = ({active, setActive}) => {
    const {TasksStore} = useContext(MainStoreContext);
    const {UsersStore} = useContext(MainStoreContext);

    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState();
    const [responsible, setResponsible] = useState('');
    const [finishedAt, setFinishedAt] = useState('');

    useEffect(
        () => {
            UsersStore.getResponsibles();
        },
        []
    )

    const createTask = () => {
        TasksStore.createTask(task, description, priority, finishedAt, responsible);
        setActive(false);
        setTask('');
        setDescription('');
        setPriority('');
        setResponsible('');
        setFinishedAt('');
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal_content active" : "modal_content"} onClick={(event) => event.stopPropagation()}>
                <form className='new_task_form'>
                    <h2>Новая задача</h2>

                    <div className="new_task_form_box">
                        <div>Заголовок</div>
                        <input 
                            type="text"
                            placeholder="Введите заголовок"
                            value={task}
                            onChange={event => setTask(event.target.value)}
                        ></input>  
                    </div>

                    <div className="new_task_form_box">
                        <div>Описание</div>
                        <textarea
                            placeholder="Введите описание"
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        ></textarea>  
                    </div>

                    <div className="new_task_form_box">
                        <div>Приоритет</div>
                        <select value={priority} onChange={event => setPriority(event.target.value)}>
                            <option selected disabled>Выберите приоритет</option>
                            <option value='Высокий'>Высокий</option>
                            <option value='Средний'>Средний</option>
                            <option value='Низкий'>Низкий</option>
                        </select>  
                    </div>

                    <div className="new_task_form_box">
                        <div>Дата окончания</div>
                        <input 
                            type="datetime-local"
                            value={finishedAt}
                            onChange={event => setFinishedAt(event.target.value)}
                        ></input>  
                    </div>

                    <div className="new_task_form_box">
                        <div>Ответственный</div>
                        <select value={responsible} onChange={event => setResponsible(event.target.value)}>
                            <option value='' disabled>Выберите ответственного</option>
                            {
                                UsersStore.responsibles?.map(element => {
                                    return <option key={element.id} value={element.id}>{element.lastName} {element.name} {element.middleName}</option>
                                })
                            }
                        </select>  
                    </div>

                    <button type='button' onClick={createTask} className='new_task_button'>Создать задачу</button>
                </form>
            </div>
        </div>
    );
}

export default observer(NewTask);