import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({children}) {

    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        axios.get("/profile").then(userToken => {
            setUserId(userToken.data.userId);
            setUserEmail(userToken.data.email);
        })
    }, []);

    return ( 
        <AuthContext.Provider value={{userId, setUserId, userEmail, setUserEmail}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;