import { useEffect } from "react";
import { logout } from "../../services/auth";

export default function Logout() {
    useEffect(() => {
        logout().then((_) => {
            window.location.href = "/";
        }).catch((_) => {
            window.location.href = "/";
        });
    }, []);

    return;
}