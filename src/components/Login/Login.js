import React, { useContext, useState } from 'react';
import './Login.css';
import { NavLink } from 'react-router-dom';
import { MainStoreContext } from '../../store';
import {observer} from 'mobx-react';

const Login = () => {
    const {AuthStore} = useContext(MainStoreContext);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = () => {
        AuthStore.getUser(login, password);
    }

    return (
        <div className='login_form'>
            <form>
                <h2>Вход</h2>
                <div className="login_form_box">
                    <div>Логин</div>
                    <input 
                        type="text"
                        placeholder="Введите логин"
                        value={login}
                        onChange={event => setLogin(event.target.value)}
                    ></input>  
                </div>
                <div className="login_form_box">
                    <div>Пароль</div>
                    <input 
                        type="password" 
                        placeholder="Введите пароль"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    ></input>  
                </div>
                <NavLink to={'/'}>
                    <button onClick={onLogin} className="login_button">Войти</button>
                </NavLink>
            </form>
        </div>
    );
}

export default observer(Login);