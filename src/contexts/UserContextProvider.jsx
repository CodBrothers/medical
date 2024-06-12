import React, { useState } from "react";
import UserContext from "./UserContext";

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState("light");
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [respType, setRespType] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    // multiple props we can use
    return (
        <UserContext.Provider value={{ user, setUser, theme, setTheme, isVisible, setIsVisible, loading, setLoading, error, setError, respType, setRespType, message, setMessage }}>
            {children}
        </UserContext.Provider>
    );
};
