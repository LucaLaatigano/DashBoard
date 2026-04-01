import { useState, useContext, useEffect, createContext } from "react"
import cvJohnSmith from "/src/Images/cv-john-smith.pdf"
import defaultImg from "../Images/empresario.jpg"

const profileContext = createContext()

export const useProfileContext = () => useContext(profileContext)


export const ProfileProvider = ({ children }) => {
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : {
            fullName: "John Smith",
            profileImage: defaultImg,
            email: "john.smith@gmail.com",
            title: "UX Lead",
            cv: cvJohnSmith
        };
    });

    useEffect(() => {
        localStorage.setItem('userProfile', JSON.stringify(formData));
    }, [formData]);

    return (
        <profileContext.Provider value={{ formData, setFormData }}>
            {children}
        </profileContext.Provider>
    );
}