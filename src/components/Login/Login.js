import React, {useContext, useState} from 'react';
import './Login.css';
import {NavLink} from 'react-router-dom';
import {MainStoreContext} from '../../store';
import {observer} from 'mobx-react';

const Login = () => {
    const {AuthStore} = useContext(MainStoreContext);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const onLogin = async () => {
        validateForm();
        await AuthStore.getUser(login, password);
        setErrors({errors: AuthStore.errors?.message})
    }

    function validateForm() {
        if (login === '' && password === '') {
            setErrors({
                login: "Введите логин",
                password: "Введите пароль"
            })
            return;
        }
        if (login === '') {
            setErrors({login: "Введите логин"})
            return;
        }
        if (password === '') {
            setErrors({password: "Введите пароль"})
            return;
        }
    }

    return (
        <div className='login_form'>
            <form>
                <h2>Вход</h2>
                {
                    errors.errors && (<div className="error_message"> {errors.errors} </div>)
                }
                <div className="login_form_box">
                    <div>Логин</div>
                    <div className="error_message">{errors.login}</div>
                    <input
                        type="text"
                        placeholder="Введите логин"
                        value={login}
                        onChange={event => setLogin(event.target.value)}
                    ></input>
                </div>
                <div className="login_form_box">
                    <div>Пароль</div>
                    <div className="error_message">{errors.password}</div>
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