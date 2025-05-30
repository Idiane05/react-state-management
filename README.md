# react-state-management
React Guided Learning Activity: Theme Switcher & useReducer
Title: Implementing a Theme Switcher with useContext & State Management with useReducer

Objective: Learn how to use the React Context API (useContext) for global state management (theme switching) and useReducer for managing complex state (task manager).

Tools:
GitHub Classroom
GitHub Codespaces (or a local development environment with Node.js and a suitable IDE like VS Code)
Vite
React
TypeScript
Color Palette
Use these colors for styling:

Light Theme
===========
Background: #FFFFFF
Text: #000000
Button: #1E90FF

Dark Theme
===========
Background: #242629
Text: #FFFFFF
Button: #85D1B0
GitHub Classroom Setup
Create a Repository: Set up a new repository on GitHub.
Add a README.md: Copy and paste these instructions into a README.md file.
Initial Commit: Make an initial commit to the repository.
GitHub Classroom Assignment: Create a new assignment in GitHub Classroom and link it to the repository.
Guided Learning Activity Steps
Part 1: Project Setup with Vite
Open GitHub Codespaces or Clone Locally
Create the React Project
npm create vite@latest react-state-management -- --template react-ts
Navigate to the Project Directory
cd react-state-management
Install Dependencies
npm install
Start the Development Server
npm run dev
Ensure the development server is running at http://localhost:5173/.

Section 1: Theme Switcher with useContext (Navbar Example)
Step 1: Creating Theme Constants
Inside src/, create a folder named constants/.
Inside constants/, create theme.ts:
export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";
Step 2: Creating the Theme Context
Inside src/context/, create a file named ThemeContext.tsx:
import React, { createContext, useContext, useState, ReactNode } from "react";
import { LIGHT_THEME, DARK_THEME } from "../constants/theme";

type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(LIGHT_THEME);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
Step 3: Creating the Navbar with Theme Toggle
Inside src/components/, create Navbar.tsx:

import React from "react";
import { useTheme } from "../context/ThemeContext";
import styles from "./Navbar.module.css";
import { DARK_THEME, LIGHT_THEME } from "../constants/theme";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <span className={styles.brand}>React App</span>
      <button className={styles.toggleButton} onClick={toggleTheme}>
        Switch to {theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME} Mode
      </button>
    </nav>
  );
};

export default Navbar;
Create Navbar.module.css for styling:

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1E90FF;
  color: white;
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.toggleButton {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: #1E90FF;
}
Section 2: State Management with useReducer (Task Manager Example)
Step 1: Creating the Task Reducer
Inside src/reducers/, create taskReducer.ts:

type Task = { id: number; text: string };

type State = Task[];

type Action =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number };

export function taskReducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.payload }];
    case "remove":
      return state.filter((task) => task.id !== action.payload);
    default:
      throw new Error("Unknown action type");
  }
}
Step 2: Creating the Task Manager Component
Inside src/components/, create TaskManager.tsx:

import React, { useReducer, useState } from "react";
import { taskReducer } from "../reducers/taskReducer";
import { useTheme } from "../context/ThemeContext";
import { LIGHT_THEME } from "../constants/theme";
import styles from "./TaskManager.module.css";

const TaskManager = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [task, setTask] = useState("");
  const { theme } = useTheme();

  const addTask = () => {
     dispatch({ type: "add", payload: task });
     setTask("");
  };

  return (
    <div className={`${styles.container} ${theme === LIGHT_THEME ? styles.light : styles.dark}`}>
      <h2>Task Manager</h2>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask} disabled={!task.trim()}>Add Task</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.text} <button onClick={() => dispatch({ type: "remove", payload: t.id })}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
Step 3: Styling Task Manager (TaskManager.module.css)
.container {
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: auto;
  text-align: center;
  transition: background 0.3s, color 0.3s;
}

.light {
  background-color: #ffffff;
  color: #000000;
}

.dark {
  background-color: #242629;
  color: #ffffff;
}

button {
  margin: 10px;
}
Step 4: Importing Task Manager in App.tsx
Modify App.tsx:

import TaskManager from "./components/TaskManager";
...
<Navbar />
<TaskManager />
...
