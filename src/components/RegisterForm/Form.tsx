'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';
import validator from 'validator';

type FormData = {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

export default function Form() {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name && lastname && email && password) {
            if (validateValues({name, lastname, email, password})) {
                // SEND
            }
        } else {
            toast.error('Campos não preenchidos.');
        }
    }

    const validateValues = ({name, lastname, email, password}: FormData): boolean => {
        const errors = [];

        if (name.length < 3) errors.push('Nome deve ser maior ou igual a 3 caracteres.');
        if (lastname.length < 3) errors.push('Sobrenome deve ser maior ou igual a 3 caracteres.');
        if (!(validator.isEmail(email))) errors.push('Email inválido.');
        if (password.length < 8) errors.push('Senha precisa ter pelo menos 8 caracteres.');

        if (errors[0]) {
             toast.error(errors[0]);  
            return false;
        } else {
            return true;
        } 
    }

  return (

    <>
      <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" placeholder="Seu nome" className={styles.input} value={name} onChange={e => setName(e.target.value)}/>
      <input type="text" placeholder="Seu sobrenome" className={styles.input} value={lastname} onChange={e => setLastname(e.target.value)}/>
      <input type="email" placeholder="Seu email" className={styles.input} value={email} onChange={e => setEmail(e.target.value)}/>
      <input type="password" placeholder="Sua senha" className={styles.input} value={password} onChange={e => setPassword(e.target.value)}/>
      <input type="submit" value="ENVIAR" className={`${styles.input} ${styles.submit}`} />
    </form>


</>
    
  );
}
