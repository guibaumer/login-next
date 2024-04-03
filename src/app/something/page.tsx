'use client'

import { API_URL } from "@/config/app-config";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from './styles.module.css';

async function check() {
    const response = await fetch(`${API_URL}/user/secured-data`, { credentials: 'include' });
    const data = await response.json();
    console.log(data);
    return data;
}

export type SecuredData = {
    message: string;
}

export default function Page() {
    const [data, setData] = useState<SecuredData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const newData = await check();
            setData(newData);
        };
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.private_div}>
                <h2 className={styles.h2}>PRIVATE ROUTE</h2>
                <p className={styles.p}>{data && data.message && data.message}</p>
                <Link className={styles.link} href={'/'}>HOME</Link>
            </div>
        </div>
    )
}