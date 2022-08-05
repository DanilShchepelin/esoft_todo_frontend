const { makeObservable, reaction, flow, observable, action, computed } = require('mobx');

export class UsersStore {
    @observable responsibles = null;

    constructor() {
        makeObservable(this);
    }

    @flow *getResponsibles() {
        const response = yield fetch('http://localhost:3001/api/users', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'include'
        });

        if (response.status >= 400) {
            console.log('err');
            return;
        }

        const {responsibles} = yield response.json();

        this.responsibles = responsibles;
    }
}