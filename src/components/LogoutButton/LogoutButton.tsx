import { API_URL } from "@/config/app-config";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import styles from './styles.module.css';

export default function LogoutButton() {
    const { logout } = useAuth();

    async function handleLogout() {
        try {
          const response = await fetch(`${API_URL}/user/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
    
        const resText = await response.text();
    
        if (!response.ok) {
            toast.error(resText);
        } else {
            toast.success(resText);
            logout();
        }
    
        } catch (err) {
            toast.error('Erro ao processar a requisição.');
        }
    }

    return (
        <button className={styles.button} type='button' onClick={handleLogout}>LOGOUT</button>
    )
}