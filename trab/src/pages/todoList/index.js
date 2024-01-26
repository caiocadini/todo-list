import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './todo.module.css'

const TodoList = () => {
  const [draggedTodo, setDraggedTodo] = useState(null);

  const checkNRemove = (e) => {
    e.target.style.backgroundImage = "url('/check.png')";
    setTimeout(() => e.target.parentNode.remove(), 200);
  };

  const checkNRedirect = () => {
    window.location.href = '/edicao'; // Ajuste conforme necessário
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

  const dragDrop = (e) => {
    e.preventDefault();
    const target = e.target;
    if (draggedTodo && target.classList.contains(styles.atividades)) {
      target.appendChild(draggedTodo);
      console.log("dropped");
    }
  };

  return (
    
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.user_welcome}>Olá, Usuário</span>
        <Link href="/">Sair</Link>
        <h1 className={styles.titulo_header}>TO-DO LIST</h1>
        <Link href="/inscricao">Adicionar Atividade</Link>
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
              <div
                className={styles.atividade_atrasada_container}
                draggable
                onDragStart={dragStart}
                onDragEnd={dragEnd}
                onClick={checkNRedirect}
              >
                <div className={styles.activity_text}>
                  <h3>Título</h3>
                  <span>Descrição</span>
                  <br />
                  <span>MM/DD/AAA</span>
                </div>
                <div className={styles.unchecked} onClick={checkNRemove}></div>
              </div>
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
              {[...Array(6)].map((_, index) => (
                <div
                  className={styles.atividade_em_dia_container}
                  draggable
                  onDragStart={dragStart}
                  onDragEnd={dragEnd}
                  onClick={checkNRedirect}
                  key={index}
                >
                  <div className={styles.activity_text}>
                    <h3>Título</h3>
                    <span>Descrição</span>
                    <br />
                    <span>MM/DD/AAA</span>
                  </div>
                  <div className={styles.unchecked} onClick={checkNRemove}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TodoList;
