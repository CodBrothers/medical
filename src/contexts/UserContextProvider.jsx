import React, { useState } from "react";
import UserContext from "./UserContext";

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState("light");
    // multiple props we can use
    return (
        <UserContext.Provider value={{ user, setUser, theme, setTheme, }}>
            {children}
        </UserContext.Provider>
    );
};
