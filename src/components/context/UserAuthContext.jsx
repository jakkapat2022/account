import React ,{createContext, useContext ,useEffect ,useState} from 'react'
import { createUserWithEmailAndPassword,
        signInWithEmailAndPassword, 
        onAuthStateChanged,
        signOut } from 'firebase/auth'

import { auth } from '../firebase'

const userAuthContext = createContext();

export function UserAuthContext({ children }) {

    const [user, setUser] = useState({});
    //const [state, setState] = useState(false);

    function login(email,password){
        return signInWithEmailAndPassword(auth , email ,password );
    }

    function signUp(email ,password){
        return createUserWithEmailAndPassword(auth , email , password);
    }

    function logOut(){
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , (currentUser) => {
            console.log('Auth Uid',currentUser);
            setUser(currentUser);
        })

        
        return () => {
            unsubscribe();
        }

        
    },[]);

    return (
        <userAuthContext.Provider value={{ user  , login ,signUp, logOut }}>
            { children }
        </userAuthContext.Provider>
    )
}

export function useUserAuth(){
    return useContext(userAuthContext);
}
