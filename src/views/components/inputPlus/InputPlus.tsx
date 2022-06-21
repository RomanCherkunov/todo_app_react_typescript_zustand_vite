import React, { useCallback, useState } from 'react';
import styles from './index.module.scss'

interface InputPlusProps {
    onAdd: (title: string) => void
}

const InputPlus: React.FC<InputPlusProps> = ({onAdd}) => {
    const [value, setValue] = useState('')

    const addTask = useCallback(() => {
        onAdd(value)
        setValue('')
    }, [value])

  return (
    <div className={styles.inputPlus}>
      <input
      type="text"
      placeholder='Add new task'
      className={styles.inputPlusValue}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if(e.key === 'Enter') {
            addTask()
        }
      }} />
      <button onClick={addTask} aria-label='Add' className={styles.inputPlusButton}>
        
      </button>
    </div>
  )
}

export default InputPlus
