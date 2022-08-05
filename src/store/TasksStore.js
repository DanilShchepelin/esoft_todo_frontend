const { makeObservable, reaction, flow, observable, action, computed } = require('mobx');

export class TasksStore {
    @observable allTasksData = [];
    @observable taskData = null;
    @observable responsible = '';

    constructor() {
        makeObservable(this);
    }

    @action setResponsible(value) {
        this.responsible = value;
    } 

    @action removeFilter(value) {
        this.responsible = value;
    }

    @computed get filtered() {
        let filteredData = [];
        if (this.responsible == '') {
            filteredData = this.allTasksData;
        } else {
            filteredData = this.allTasksData.filter(
                item => item['responsible'] == this.responsible
            );
        }

        return filteredData
    }


    @flow *createTask(task, description, priority, finishedAt, responsible) {
        yield fetch('http://localhost:3001/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'include',
            body: JSON.stringify({ task, description, priority, finishedAt, responsible })
        });
    }

    @flow *getTasks() {
        const response = yield fetch('http://localhost:3001/api/tasks', {
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

        const {tasks} = yield response.json();

        this.allTasksData = tasks;
    }

    @flow *getTask(taskId) {
        const response = yield fetch('http://localhost:3001/api/tasks/' + taskId, {
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

        const {task} = yield response.json();

        this.taskData = task;
    }

    @flow *updateTask(taskId, status) {
        yield fetch('http://localhost:3001/api/tasks/' + taskId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'include',
            body: JSON.stringify({ status })
        });
    }
}