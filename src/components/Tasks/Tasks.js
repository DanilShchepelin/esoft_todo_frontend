import React, { useContext, useEffect, useState } from 'react';
import './Tasks.css';
import Task from './Task/Task';
import { MainStoreContext } from '../../store';
import {observer} from 'mobx-react';

const Tasks = () => {
    const {TasksStore} = useContext(MainStoreContext);
    const {UsersStore} = useContext(MainStoreContext);

    const [responsible, setResponsible] = useState('');
    const [finishDate, setFinishDate] = useState('');
    
    useEffect(
        () => {
            TasksStore.getTasks();
            UsersStore.getResponsibles();
        },
        []
    )

    return (
        <div className='tasks'>
            <div className='filter'>
                <div className='responsibles'>
                    <div>По дате</div>
                    <select
                        className='date_filter'
                        defaultValue=''
                        onClick={event => setFinishDate(event.target.value)}>
                        <option value='' disabled selected>Выберите дату</option>
                        <option value={'today'}>На сегодня</option>
                        <option value={'week'}>На неделю</option>
                        <option value={'moreThanWeek'}>На будущее</option>
                    </select>
                    {
                        UsersStore.isLeader ?
                            <>
                                <div>Ответственный</div>
                                <select
                                    className='responsible_filter'
                                    defaultValue=''
                                    onClick={event => setResponsible(event.target.value)}>
                                    <option value='' disabled selected>Выберите ответственного</option>
                                    {
                                        UsersStore.responsibles?.map(element => {
                                            return <option key={element.id} value={element.id}>{element.lastName} {element.name} {element.middleName}</option>
                                        })
                                    }
                                </select>
                            </> :
                            <div></div>
                    }
                    <button onClick={() => {
                        TasksStore.getTasks(responsible, finishDate);
                    }}>Применить фильтр</button>

                    <button onClick={() => {
                        let selectDate = document.querySelector('.date_filter');
                        let selectResponsible = document.querySelector('.responsible_filter');
                        TasksStore.getTasks();
                        selectDate.options[0].selected = true;
                        selectResponsible.options[0].selected = true;
                        setResponsible('');
                        setFinishDate('');
                    }}>Сбросить фильтр</button>
                </div>
            </div>
            
            <div className='tasks_items'>
                {
                    TasksStore.isEmpty ?
                        <div className='empty'>Задач не найдено</div> :
                        TasksStore.allTasksData?.map(element => {
                            return (
                                <Task
                                    key={element.id}
                                    id={element.id}
                                    task={element.task}
                                    priority={element.priority}
                                    finishedAt={element.finishedAt}
                                    responsibleName={element.responsibleName}
                                    responsipbleLastName={element.responsipbleLastName}
                                    responsibleMiddleName={element.responsibleMiddleName}
                                    status={element.status}
                                />
                            );
                    })
                }
            </div>
        </div>
        
    );
}

export default observer(Tasks);