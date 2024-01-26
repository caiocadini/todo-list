import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import styles from './login.module.css';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router=useRouter()

  const passwordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Obter os valores dos campos de input no momento do envio do formulário
    const usernameValue = document.getElementById('user').value;
    const passwordValue = document.getElementById('password').value;

    // Verificar se os campos obrigatórios foram preenchidos
    if (!usernameValue || !passwordValue) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Fazer a solicitação GET para verificar o login
      const response = await fetch(`/api/user?id=${usernameValue}&password=${passwordValue}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Login bem-sucedido!');
        localStorage.setItem('token', data.token);
        router.push('/todoList');
        // Redirecione ou tome ação apropriada após o login bem-sucedido
      } else {
        console.error('Erro ao fazer login:', data.message);
        // Trate o erro (exibir mensagem de erro, limpar campos, etc.)
        setErrorMessage(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Erro interno do servidor');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.login_container}>
        <div className={styles.titulo}>
          <p>Insira seus dados para fazer login</p>
        </div>
        <form className={styles.formulario} onSubmit={handleLogin}>
          <div className={styles.formulario}>
            <label htmlFor="user">Usuário:</label>
            <input
              required  // Campo obrigatório
              className={styles['input-field']}
              type="text"
              id="user"
              name="user"
            /><br />

            <div className={styles.passwordContainer}>
              <label htmlFor="password">Senha:</label>
              <input
                required  // Campo obrigatório
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

            <Link href="/cadastro ">Ainda não tem conta?</Link>
          </div>
          <div className={styles.botao}>
            <button className={styles.button} type="submit" name="button">
              Fazer Login
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
