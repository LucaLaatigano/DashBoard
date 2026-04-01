import { useState, useEffect, createContext, useContext } from "react"
import getUsers from "../Services/users"
const usersContext = createContext()

export const useUserContext = () => useContext(usersContext)

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const loadUsers = async () => {
        try {
            setLoading(true);
            const savedData = localStorage.getItem('users')
            if (savedData) {
                setUsers(JSON.parse(savedData))
            } else {
                const data = await getUsers();
                setUsers(data);
                localStorage.setItem('users', JSON.stringify(data))
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadUsers();
    }, []);


    return <usersContext.Provider value={{ users, setUsers, loading }}>
        {children}
    </usersContext.Provider>
}