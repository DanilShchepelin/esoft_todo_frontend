const { makeObservable, reaction, flow, observable, action, computed } = require('mobx');

export class AuthStore {
    @observable currentSession = localStorage.getItem('SessionID');
    @observable loginUser = '';

    constructor() {
        makeObservable(this);

        reaction(
            () => this.currentSession,
            (currentSession) => {
                if (currentSession) {
                    localStorage.setItem('SessionID', currentSession);
                } else {
                    localStorage.removeItem('SessionID');
                }
            }
        )
    }

    @flow *getUser(login, password) {
        const response = yield fetch('http://localhost:3001/api/login/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'include',
            body: JSON.stringify({ login, password }),
        });

        if (response.status == 301) {
            alert('Неверный пароль');
            return;
        }
        if (response.status == 303) {
            alert('Введите логин и пароль');
            return;
        }
        if (response.status == 304) {
            alert('Такого пользователя не существует');
            return;
        }

        if (response.status >= 400) {
            console.log('err');
            return;
        }
        const {sessionID, loginUser} = yield response.json();
        this.loginUser = loginUser;
        this.currentSession = sessionID;

        // if (this.loginUser !== login) {
        //     alert("Такого логина не существует");
        //     return;
        // }
    }

    @action logout() {
        fetch('http://localhost:3001/api/login/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'include'
        });

        this.currentSession = null;
    }

    @computed get isLoggedIn() {
        return Boolean(this.currentSession);
    }
}