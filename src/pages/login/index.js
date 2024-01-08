// pages/index.js
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import styles from './login.module.css';  // Import the CSS Module

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const passwordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = () => {
    // Your login logic here
    // Example: window.location.href = "../Todolist/todolist.html";
  };

  return (
    <div className={styles.body}>
      <div className={styles.login_container}>
      <div className={styles.titulo}>
        <p>Insira seus dados para fazer login</p>
      </div>
      <div className={styles.formulario}>
        <label htmlFor="user">Usuário:</label>
        <input className={styles['input-field']} type="text" id="user" name="user" /><br />
        
        <div className={styles.passwordContainer}>
          <label htmlFor="password">Senha:</label>
          <input
            className={styles['input-field']}
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
          />
          <label>
            <input type="checkbox" onClick={passwordToggle} />
            Show Password
          </label>
        </div>
        
        <a href="cadastro.html">Ainda não tem conta?</a>
      </div>
      <div className={styles.botao}>
        <button className={styles.button} onClick={handleLogin} name="button">
          Fazer Login
        </button>
      </div>
    </div>
    </div>
    
  );
}
