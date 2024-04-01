'use client'

import { API_URL } from "@/config/app-config";
import Link from "next/link";
import { useEffect, useState } from "react";

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

    console.log(data);

    return (
        <>
        <h1>PRIVATE ROUTE</h1>
        {data && data.message && data.message}
        <Link href={'/'}>HOME</Link>
        </>
    )
}