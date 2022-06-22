import create from "zustand";

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

export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [
        {id:'1', title: 'default task 1', createdAt: 211221},
        {id:'2', title: 'default task 2', createdAt: 211222},
        {id:'3', title: 'default task 3', createdAt: 211223},
    ],
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
}))