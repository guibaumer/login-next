'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

async function check() {
    const response = await fetch('http://localhost:3000/user/secured-data', { credentials: 'include' });
    const data = await response.json();
    console.log(data);
    return data;
}

export default function Page() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const newData = await check();
            setData(newData);
        };
        fetchData();
    }, []);

    console.log(data);

    return (
        <>
        <h1>Oi</h1>
        {data && data.message && data.message}
        {data && data.user && data.user.username && data.user.username}

        <Link href={'/'}>HOME</Link>
        </>
    )
}