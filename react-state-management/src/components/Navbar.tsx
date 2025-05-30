import React from "react";
import { useTheme } from "../context/ThemeContext";
import styles from "./Navbar.module.css";
import { DARK_THEME, LIGHT_THEME } from "../constants/theme";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  
  const buttonStyle = {
    backgroundColor: theme === LIGHT_THEME ? '#1E90FF' : '#85D1B0',
    color: theme === LIGHT_THEME ? '#FFFFFF' : '#000000'
  };

  return (
    <nav className={styles.navbar}>
      <span className={styles.brand}>React App</span>
      <button 
        className={styles.toggleButton} 
        onClick={toggleTheme}
        style={buttonStyle}
      >
        Switch to {theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME} Mode
      </button>
    </nav>
  );
};

export default Navbar;