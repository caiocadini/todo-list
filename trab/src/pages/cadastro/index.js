import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import styles from './login.module.css';
import { useRouter } from 'next/router';


const inter = Inter({ subsets: ['latin'] });

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router=useRouter()


  const passwordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Obter os valores dos campos de input no momento do envio do formulário
    const userValue = document.getElementById('user').value;
    const passwordValue = document.getElementById('password').value;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!userValue || !passwordValue) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userValue,
          password: passwordValue,
          todo: [],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Usuário cadastrado com sucesso!');
        localStorage.setItem('token', data.token);
        router.push('/todoList');
        // Redirecione ou tome ação apropriada após o cadastro bem-sucedido
      } else {
        console.error('Erro ao fazer cadastro:', data.message);
        // Trate o erro (usuário já existe, erro interno do servidor, etc.)
        setErrorMessage(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
      setErrorMessage('Erro interno do servidor');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.login_container}>
        <div className={styles.titulo}>
          <p>Insira seus dados para fazer Cadastro</p>
        </div>
        <form className={styles.formulario} onSubmit={handleSignup}>
          <div className={styles.formulario}>
            <label htmlFor="user">Usuário:</label>
            <input
              className={styles['input-field']}
              type="text"
              id="user"
              name="user"
            />
            <br />

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

            <Link href="/login">Já possui uma conta?</Link>
          </div>
          <div className={styles.botao}>
            <button className={styles.button} type="submit" name="button">
              Fazer cadastro
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className={styles.errorMessage}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
