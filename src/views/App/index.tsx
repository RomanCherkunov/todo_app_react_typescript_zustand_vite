import React from "react";
import { useToDoStore } from "../../data/stores/useToDoStore";

import styles from './index.module.scss'
import InputPlus from './../components/inputPlus/InputPlus';
import Task from "../components/task/Task";

export const App: React.FC = () => {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask
    ])

    const onAdd = () => {
        console.log(1111111111)
    }

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do App</h1>
            <section className={styles.articleSection}>
                <InputPlus onAdd={(title) => {
                    if(title) {
                        createTask(title)
                    }
                }} />
            </section>
            <section className={styles.articleSection}>
                {!tasks.length && <p className={styles.articleText}>You dont have tasks</p>}
                {tasks.map((task) => {
                   return <Task
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            onDone={removeTask}
                            onEdited={updateTask}
                            onRemoved={removeTask} />
                })}
            </section>
        </article>
    )
}