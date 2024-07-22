import { getCurrentAccount } from '../../@/lib/appwrite/Api';
import { IUser } from '../../@/types';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
}

const INITIAL_STATE = {
    user : INITIAL_USER, 
    isLoading : false , 
    setUser : () => {} , 
    isAuthenticated : false, 
    setIsAuthenticated: () => {},
    checkAuthUser : async () => false as boolean
}

type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
};


const AuthContext = createContext<IContextType>(INITIAL_STATE) 
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user , setUser] = useState<IUser>(INITIAL_USER) ; 
    const [isLoading , setIsLoading] = useState(false); 
    const [isAuthenticated , setIsAuthenticated] = useState(false);

    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentAccount() ; 
            if(currentAccount){
                setUser({
                    id : currentAccount.$id ,
                    name : currentAccount.name ,
                    username : currentAccount.userName ,
                    email : currentAccount.email ,
                    imageUrl : currentAccount.imageUrl ,
                    bio : currentAccount.bio
                })
                setIsAuthenticated(true) ; 
                return true ; 
            }
            return false ; 
        } catch (error) {
            console.log(error);
            return false ;
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (
            cookieFallback === null  ||
            cookieFallback === "[]" 
        // cookieFallback === undefined
        ) {
        navigate("/sign-in");
        }

        checkAuthUser();
    }, []);



    return (
        <AuthContext.Provider value={{ user , isLoading , setUser , isAuthenticated , setIsAuthenticated , checkAuthUser}}>

        {children}
        </AuthContext.Provider>
    )
}
export const useUserContext = () => useContext(AuthContext);