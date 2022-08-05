import React, { useState, useContext } from 'react';
import NewTask from '../NewTask/NewTask';
import { NavLink } from 'react-router-dom';
import './Header.css';

import { MainStoreContext } from '../../store';

const Header = () => {
    const {AuthStore} = useContext(MainStoreContext);
    
    const [modalActive, setModalActive] = useState(false);

    const logout = () => {
        AuthStore.logout();
    }

    return (
        <header className='header'>
            <button className='header_newTask' onClick={() => setModalActive(true)}>Новая задача</button>
            <NavLink to={'/'} onClick={logout}>Выйти</NavLink>
            <NewTask active={modalActive} setActive={setModalActive}/>
        </header>
    );
}

export default Header;