const { makeObservable, reaction, flow, observable, action, computed } = require('mobx');

export class TasksStore {
    @observable allTasksData = [];
    @observable taskData = [];

    constructor() {
        makeObservable(this);
    }

    // @action setResponsible(value) {
    //     this.responsible = value;
    // }
    //
    // @action removeFilter(value) {
    //     this.responsible = value;
    // }

    @computed get isEmpty() {
        return this.allTasksData.length === 0;
    }

    @computed get isAuthor() {
        let userId = localStorage.getItem('login_user');
        let creatorId = this.taskData?.creator;
        return userId === creatorId?.toString();
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

    @flow *getTasks(responsible, finishDate) {
        let url = 'http://localhost:3001/api/tasks';
        if (responsible) {
            url = `http://localhost:3001/api/tasks?responsible=${responsible}`
        }
        if (finishDate) {
            url = `http://localhost:3001/api/tasks?finishDate=${finishDate}`
        }
        if (responsible && finishDate) {
            url = `http://localhost:3001/api/tasks?responsible=${responsible}&finishDate=${finishDate}`
        }
        const response = yield fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'include'
        });
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

    @flow *updateTask(taskId, task, description, finishedAt, priority, status, responsible) {
        yield fetch('http://localhost:3001/api/tasks/' + taskId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'include',
            body: JSON.stringify({ task, description, finishedAt, priority, status, responsible })
        });
    }
}