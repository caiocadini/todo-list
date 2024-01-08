// pages/index.js
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import styles from './index.module.css'
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={styles.background_image}>
        <main className={styles.main}>
            <div className={styles.introduction_text}>
                <h1 className={styles.h1}>TO-DO List</h1>
                <h2 className={styles.h1}>Para conseguir fazer mais em menos tempo</h2>
           </div> 
           <div className={styles.buttons}>
                <a href = "./login/login.html">
                    <button className={styles.login_button}>Já tem conta?</button>
                </a>
                <p className={styles.p}>ou</p>
                <a href = "./login/cadastro.html">
                    <button className={styles.signup_button}>Cadastre-se</button>
                </a>
           </div>
        </main>
    </div>
    )}