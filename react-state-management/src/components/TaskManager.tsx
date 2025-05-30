import React, { useReducer, useState } from "react";
import { taskReducer } from "../reducers/taskReducer";
import { useTheme } from "../context/ThemeContext";
import styles from "./TaskManager.module.css";

const TaskManager = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [taskText, setTaskText] = useState("");
  const { theme } = useTheme();

  const addTask = () => {
    if (taskText.trim()) {
      dispatch({ type: "add", payload: taskText });
      setTaskText("");
    }
  };

  return (
    <div className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
      <h2>Task Manager</h2>
      
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter new task"
          className={styles.inputField}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button 
          onClick={addTask} 
          disabled={!taskText.trim()}
          className={styles.addButton}
        >
          Add
        </button>
      </div>
      
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} className={styles.taskItem}>
            <span 
              className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}
              onClick={() => dispatch({ type: "toggle", payload: task.id })}
            >
              {task.text}
            </span>
            <button 
              onClick={() => dispatch({ type: "remove", payload: task.id })}
              className={styles.removeButton}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;