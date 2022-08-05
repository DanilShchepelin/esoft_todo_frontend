import { createContext } from "react";
import { AuthStore } from "./AuthStore";
import { TasksStore } from "./TasksStore";
import { UsersStore } from "./UsersStore";

export const MainStoreContext = createContext(null);

export class MainStore {
    constructor() {
        this.AuthStore = new AuthStore();
        this.TasksStore = new TasksStore();
        this.UsersStore = new UsersStore();
    }
}