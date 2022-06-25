import create, {State, StateCreator} from "zustand";

import {generateId} from '../heplers'

interface Task {
    id: string;
    title: string;
    createdAt: number
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void
}

function isTodoStore(obj: any): obj is ToDoStore {
    return 'tasks' in obj
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
    if(isTodoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(
            nextState.tasks
        ))
    }
    set(nextState, ...args)
}, get, api)


const getCurrentState = () => {
    try {
        const currentState = (JSON.parse(window.localStorage.getItem('tasks' || '[]')))
        return currentState
    } catch (error) {
        console.log(error)
        window.localStorage.setItem('tasks', '[]')
    }
    return []
}
const currentState = (JSON.parse(window.localStorage.getItem('tasks' || '[]')))


export const useToDoStore = create<ToDoStore>(localStorageUpdate((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title) => {
        const {tasks} = get()
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now()
        }

        set({
            tasks: [newTask].concat(tasks)
        })
    },
    updateTask: (id: string, title: string) => {
        const {tasks} = get()
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title
            }))
        })
    },
    removeTask: (id: string) => {
        const {tasks} = get()
        set({
            tasks: tasks.filter(task => task.id !== id )
        })
    }
})))