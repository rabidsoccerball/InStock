import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token, uid) => {},
    tokenTrim: '',
    // authTrim: (token, trim) => {},
    logout: () => {}
})

function AuthContextProvider({children}) {
    const [authToken, setAuthToken] = useState('');
    const [authTrimArray, setAuthTrimArray] = useState({});
    const [userId, setUserId] = useState(null);

    function authenticate(token, uid) {
        setAuthToken(token)
        setUserId(uid);
    }
    
    function logout() {
        setAuthToken(null);
    }

    // function authTrim(token, trim){
    //     setAuthTrimArray(prev => ({...prev, [token]: trim}));
    // }

    const value = {
        token: authToken,
        userId: userId,
        isAuthenticated: !!authToken,
        tokenTrim: authTrimArray[authToken] || '',
        authenticate: authenticate,
        // authTrim: authTrim,
        logout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;