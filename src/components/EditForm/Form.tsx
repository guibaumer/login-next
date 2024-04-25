'use client';

import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/form-styles.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { API_URL } from '@/config/app-config';
import { useAuth } from '@/contexts/AuthContext';
import validator from 'validator';
import { useRouter } from 'next/navigation';

type FormData = {
    name: string;
    lastname: string;
    email: string;
}

export default function Form() {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, id, setUsername } = useAuth();
    const router = useRouter();

    useEffect(() => {
       if (id) getUserData();
    }, []);

    const getUserData = async () => {
        setLoading(true);

        const response = await fetch(`${API_URL}/user/get-user-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
            credentials: 'include',
        });

        const {user, message} = await response.json();

        if (!response.ok) {
            setLoading(false);
            return toast.error(message);
        } 

        setName(user.name);
        setLastname(user.lastname);
        setEmail(user.email);
        setLoading(false);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (name && lastname && email) {
            if (validateValues({ name, lastname, email })) {
                try {
                    const response = await fetch(`${API_URL}/user/edit-user`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, lastname }),
                        credentials: 'include',
                    });

                    const { message } = await response.json();

                    if (!response.ok) {
                        toast.error(message);
                    } else {
                        setUsername(name);
                        toast.success(message);
                        router.push('/');
                    }

                } catch (err) { 
                    console.log(err);
                }
            }
        } else {
            toast.error('Campos não preenchidos.');
        }

        setLoading(false);
    }

    const validateValues = ({ name, lastname, email }: FormData): boolean => {
        const errors = [];

        if (name.length < 3) errors.push('Nome deve ser maior ou igual a 3 caracteres.');
        if (lastname.length < 3) errors.push('Sobrenome deve ser maior ou igual a 3 caracteres.');

        if (errors[0]) {
            toast.error(errors[0]);
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            <h2>Editar perfil</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" placeholder="Seu nome" className={styles.input} value={name} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder="Seu sobrenome" className={styles.input} value={lastname} onChange={e => setLastname(e.target.value)} />
                <input type="email" disabled placeholder="Seu email" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
                <button type="submit" className={`${styles.input} ${styles.submit}`} disabled={loading} >
                    {loading ? <ClipLoader size={25} /> : "EDITAR"}
                </button>
            </form>
        </>
    );
}
