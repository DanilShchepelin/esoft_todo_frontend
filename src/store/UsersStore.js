const { makeObservable, reaction, flow, observable, action, computed } = require('mobx');

export class UsersStore {
    @observable responsibles = null;

    constructor() {
        makeObservable(this);
    }

    @computed get isLeader() {
        return this.responsibles?.length > 0;
    }

    @flow *getResponsibles() {
        const response = yield fetch('http://localhost:3001/api/users', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'include'
        });

        const {responsibles} = yield response.json();

        this.responsibles = responsibles;
    }
}