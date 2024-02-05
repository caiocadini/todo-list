// pages/index.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../edicao/atividade.module.css';
import Link from 'next/link';
const jwt = require ('jsonwebtoken');

export default function Home() {
  const router = useRouter();
  const taskId = router.query.taskId;
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskCategory, setTaskCategory] = useState('urgente');
  const [userTasks, setUserTasks] = useState([]);
  const storedToken = localStorage.getItem('token');
  const decodedToken = jwt.verify(storedToken, 'sua-chave-secreta');
  const userID = decodedToken.id;

  const getUserTasks = async () => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${userID}`);
      if (response.ok) {
        const userData = await response.json();
        const index = userData.todo.findIndex(task => task.id === taskId);
        if (index !== -1){
          setTaskName(userData.todo[index].id || '');
          setTaskDescription(userData.todo[index].description || '');
          setTaskDueDate(userData.todo[index].dueDate || '');
          setTaskCategory(userData.todo[index].category || '');
        }
        setUserTasks(userData.todo || []);
      } else {
        console.error('Erro ao obter tarefas do usuário.');
      }
    } catch (error) {
      console.error('Erro ao conectar-se ao servidor:', error);
    }
  };


  useEffect(() => {
    getUserTasks();
  }, []);

  const handleTaskSubmission = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:3001/todos/${userID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: userTasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  id: taskName, 
                  description: taskDescription,
                  dueDate: taskDueDate,
                  category: taskCategory,
                }
              : task
          ),
        }),
      });
  
      if (response.ok) {
        console.log('Tarefa atualizada com sucesso!');
        getUserTasks();
        router.push('/todoList');
      } else {
        console.error('Erro ao atualizar tarefa.');
      }
    } catch (error) {
      console.error('Erro ao conectar-se ao servidor:', error);
    }
  };
  

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h2>Inscrição de Tarefa</h2>
        <form className={styles.form} onSubmit={handleTaskSubmission}>
          <label className={styles.label} htmlFor="taskName">
            Nome da Tarefa:
          </label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            placeholder="Título"
            required
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <label className={styles.label} htmlFor="taskDescription">
            Descrição:
          </label>
          <textarea
            id={styles.taskDescription}
            name="taskDescription"
            placeholder="Descrição"
            required
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          ></textarea>

          <label className={styles.label} htmlFor="taskDueDate">
            Data de Vencimento:
          </label>
          <input
            type="date"
            id="taskDueDate"
            name="taskDueDate"
            required
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
          />

          <h2>Categoria:</h2>
          <label className={styles.label}>
            <input
              type="radio"
              id="urgente"
              name="taskCategory"
              placeholder="Urgente"
              checked={taskCategory === 'urgente'}
              onChange={() => setTaskCategory('urgente')}
            />
            Urgente
          </label>
          <label className={styles.label}>
            <input
              type="radio"
              id="bomfazer"
              name="taskCategory"
              placeholder="BomFazer"
              checked={taskCategory === 'bomfazer'}
              onChange={() => setTaskCategory('bomfazer')}
            />
            Bom Fazer
          </label>
          <button id={styles.btn_submit} type="submit">
            Inscrever Tarefa
          </button>
        </form>
          <Link id={styles.btn_cancel} href = "/todoList">Voltar</Link> 
      </div>
    </div>
  );
}
