const { makeObservable, reaction, flow, observable, action, computed } = require('mobx');

export class AuthStore {
    @observable currentSession = localStorage.getItem('SessionID');
    @observable loginUser = '';
    @observable.ref errors = [];

    constructor() {
        makeObservable(this);

        reaction(
            () => this.currentSession,
            (currentSession) => {
                if (currentSession) {
                    localStorage.setItem('SessionID', currentSession);
                } else {
                    localStorage.removeItem('SessionID');
                    localStorage.removeItem('login_user');
                }
            }
        )
    }

    @computed get isNotValidate() {
        return Boolean(this.errors);
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
        const {sessionID, loginUser, message} = yield response.json();
        if (message) {
            this.errors['message'] = yield message;
        }
        localStorage.setItem('login_user', loginUser);
        this.loginUser = loginUser;
        this.currentSession = sessionID;
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