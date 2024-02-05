import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './todo.module.css'
const jwt = require ('jsonwebtoken');

const TodoList = () => {
  const [draggedTodo, setDraggedTodo] = useState(null);
  const storedToken = localStorage.getItem('token');
  const decodedToken = jwt.verify(storedToken, 'sua-chave-secreta');
  const userId = decodedToken.id;
  const [userTasks, setUserTasks] = useState([]);


    

    const getUserTasks = async () => {
      // Simula uma requisição ao servidor para obter as tarefas do usuário
      try {
        const response = await fetch(`http://localhost:3001/todos/${userId}`);
        if (response.ok) {
          const userData = await response.json();
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
    }, []); // Executa apenas uma vez no carregamento inicial
  
  //Rendering the tasks
  const renderTasks = (tasks) => {
    const currentDate = new Date();

    return tasks.map((task) => {
      const dueDate = new Date(task.dueDate);
      const isOverdue = dueDate < currentDate;

      return (
        
          <div
            key={task.id}
            className={`${isOverdue ? styles.atividade_atrasada_container: styles.atividade_em_dia_container}`}
            draggable
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            onClick={checkNRedirect}>
            <div className={styles.activity_text}>
            <Link href={`/edicao?taskId=${task.id}`} key={task.id} style={{textDecoration:'none'}}>
              <h3>{task.id}</h3>
            </Link>
              <span>{task.description}</span>
              <br />
              <span>{task.dueDate}</span>
            </div>
            <div className={styles.unchecked} onClick={(e) => { e.stopPropagation(); checkNRemove(task.id); }}></div>

            {/* Add more details as needed */}
          </div>
       
      );
    });
  };


  const checkNRemove = async (taskId) => {
    try {
      const deleteTaskResponse = await fetch(`/api/todolist?userId=${userId}&taskId=${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (deleteTaskResponse.ok) {
        console.log('Task removed successfully');
        // Update the userTasks state to reflect the changes
        getUserTasks();
      } else {
        console.error('Error removing task from the server');
      }
    } catch (error) {
      console.error('Error connecting to the server:', error);
    }

  };

  const checkNRedirect = () => {
    <Link href='/edicao'></Link> // Ajuste conforme necessário
  };

  const dragStart = (e) => {
    setDraggedTodo(e.target);
    console.log("dragstart");
  };

  const dragEnd = () => {
    setDraggedTodo(null);
    console.log("dragend");
  };
  
  const dragOver = (e) => {
    e.preventDefault();
    console.log("dragover");
  };

  const dragEnter = () => {
    console.log("dragenter");
  };

  const dragLeave = () => {
    console.log("dragleave");
  };

  const dragDrop = async (e) => {
    e.preventDefault();
    const target = e.target;
    if (draggedTodo && target.classList.contains(styles.atividades)) {
      const taskId = draggedTodo.querySelector('h3').textContent;
      try {
        const updateTaskResponse = await fetch(`/api/todolist?userId=${userId}&taskId=${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (updateTaskResponse.ok) {
          console.log('Category updated successfully');
          // Update the userTasks state to reflect the changes
          getUserTasks();
        } else {
          console.error('Error updating task category on the server');
        }
      } catch (error) {
        console.error('Error connecting to the server:', error);
      }
    }
  };
  
  
  return (
    
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.user_welcome}>Olá, {userId}</span>
        <Link className = {styles.exit_account} href="/">Sair</Link>
        <h1 className={styles.titulo_header}>TO-DO LIST</h1>
        <Link className = {styles.add_activity} href="/inscricao">Adicionar Atividade</Link>
      </header>
      <main>
        <div className={styles.listas}>
          <div className={styles.lista} id={styles.listaUrgente}>
            <h2 className={styles.titulo_lista}>URGENTE</h2>
            <div
              className={styles.atividades}
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={dragDrop}
            >
              {userTasks ? renderTasks(userTasks.filter((task) => task.category === 'urgente')) : null}
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.lista} id={styles.listaBomFazer}>
            <h2 className={styles.titulo_lista}>BOM FAZER</h2>
            <div
              className={styles.atividades}
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={dragDrop}
            >
                   {userTasks ? renderTasks(userTasks.filter((task) => task.category === 'bomfazer')) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TodoList;
