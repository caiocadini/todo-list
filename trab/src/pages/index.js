// pages/index.js
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';  // Importe o Link do pacote next/link
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
                <Link href = "/login">
                    <button className={styles.login_button}>Já tem conta?</button>
                </Link>
                <p className={styles.p}>ou</p>
                <Link href = "/cadastro">
                    <button className={styles.signup_button}>Cadastre-se</button>
                </Link>
           </div>
        </main>
    </div>
    )}