import React from 'react'
import styles from './task.module.scss'

interface TaskProps {
    id: string,
    title: string,
    onDone: (id: string) => void,
    onEdited: (id: string, title: string) => void,
    onRemoved: (id: string) => void
}

const Task: React.FC<TaskProps> = ({onDone, id, title, onEdited, onRemoved}) => {
  return (
    <div>
      {title}
    </div>
  )
}

export default Task
