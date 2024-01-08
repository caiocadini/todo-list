import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import styles from './login.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const passwordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userInput,
          password: passwordInput,
          todo: [],
        }),
      });

      if (response.ok) {
        console.log('Cadastro realizado com sucesso!');
        // Redirecione ou realize outra ação após o cadastro bem-sucedido
      } else {
        console.error('Erro ao cadastrar usuário.');
        // Lide com erros de cadastro aqui, se necessário
      }
    } catch (error) {
      console.error('Erro ao conectar-se ao servidor:', error);
      // Lide com erros de conexão aqui, se necessário
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.login_container}>
        <div className={styles.titulo}>
          <p>Insira seus dados para fazer Cadastro</p>
        </div>
        <div className={styles.formulario}>
          <label htmlFor="user">Usuário:</label>
          <input
            className={styles['input-field']}
            type="text"
            id="user"
            name="user"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          /><br />

          <div className={styles.passwordContainer}>
            <label htmlFor="password">Senha:</label>
            <input
              className={styles['input-field']}
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <label>
              <input type="checkbox" onClick={passwordToggle} />
              Show Password
            </label>
          </div>
          
          <Link href="/login">
            Já possui uma conta?
          </Link>
        </div>
        <div className={styles.botao}>
          <button className={styles.button} onClick={handleLogin} name="button">
            Fazer cadastro
          </button>
        </div>
      </div>
    </div>
  );
}
