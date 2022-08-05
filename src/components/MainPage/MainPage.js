import React from 'react';
import Header from '../Header/Header';
import Tasks from '../Tasks/Tasks';
import './MainPage.css';

const MainPage = () => {
    return (
        <div className='content'>
            <Header />
            <Tasks />
        </div>
    );
}

export default MainPage;