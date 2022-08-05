import React, { useContext, useEffect, useState } from 'react';
import './Tasks.css';
import Task from './Task/Task';
import { MainStoreContext } from '../../store';
import {observer} from 'mobx-react';

const Tasks = () => {
    const {TasksStore} = useContext(MainStoreContext);
    const {UsersStore} = useContext(MainStoreContext);

    const [responsible, setResponsible] = useState('');
    const [date, setDate] = useState('');
    
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
                {/* <div className='date'>
                    <div>По дате</div>
                    <select defaultValue={date} onClick={event => setDate(event.target.value)}>
                        <option value={new Date().getDay()}>На сегодня</option>
                        <option value={new Date().getDay() + 7}>На неделю</option>
                        <option value={new Date().getDay() }>На будущее</option>
                    </select>
                    <button onClick={() => {
                        TasksStore.setResponsible(responsible);
                    }}>Применить фильтр</button>

                    <button onClick={() => {
                        TasksStore.removeFilter('');
                    }}>Сбросить фильтр</button>
                </div> */}
                
                <div className='responsibles'>
                    <div>Ответственный</div>
                    <select defaultValue='' onClick={event => setResponsible(event.target.value)}>
                        <option value='' disabled>Выберите ответственного</option>
                        {
                            UsersStore.responsibles?.map(element => {
                                return <option key={element.id} value={element.id}>{element.lastName} {element.name} {element.middleName}</option>
                            })
                        }
                    </select>
                    <button onClick={() => {
                        TasksStore.setResponsible(responsible);
                    }}>Применить фильтр</button>

                    <button onClick={() => {
                        TasksStore.removeFilter('');
                    }}>Сбросить фильтр</button>
                </div>
            </div>
            
            <div className='tasks_items'>
                {
                    TasksStore.filtered?.map(element => {
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