import React, { useEffect, useRef, useState } from 'react'
import styles from './task.module.scss'

interface TaskProps {
    id: string,
    title: string,
    onDone: (id: string) => void,
    onEdited: (id: string, title: string) => void,
    onRemoved: (id: string) => void
}

const Task: React.FC<TaskProps> = ({onDone, id, title, onEdited, onRemoved}) => {
  const [checked, setChecked] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState(title)
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(editMode) {
      editInputRef?.current?.focus()
    }
  }, [editMode])

  const onCheck = (e: any) => {
    if(checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
    
    e.style.background = 'red'
    // if (e.target.checked) {
    //   setTimeout(() => {
    //     onDone(id)
    //   },1000)
    // }
  }

  const remove: any = () => {
    if(confirm('Are you sure?')) {
      onRemoved(id)
    }
  }

  return (
    <div className={checked ? styles.taskChecked :styles.task} >
      <label className={styles.taskLabel}>
        <input
        type="checkbox"
        disabled={editMode}
        checked={checked}
        className={styles.taskCheckBox}
        onChange={onCheck} />
      </label>
      {editMode ? (
        <input
          type="text"
          ref={editInputRef}
          className={styles.taskEditable}
          value={value}
          onChange ={e => setValue(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              onEdited(id, value)
              setEditMode(false)
            }}} />
      ) : (
        <h3 className={styles.taskTitle}>{title}</h3>
      )}
      {editMode ? (
        <button
        aria-label='save'
        className={styles.taskSave}
        onClick={() => {
          onEdited(id, value)
          setEditMode(false)
        }} />
      ) : (
        <button
        aria-label='edit'
        className={styles.taskEdit}
        onClick={() => setEditMode(true)} />
      )}
      <button
        aria-label='remove'
        className={styles.taskRemove}
        onClick={remove} />
    </div>
  )
}

export default Task
