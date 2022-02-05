import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/apiClient";

type User = {
    email: string
    permissions: string[]
    roles: string[]
}

type SignInCredentials  = {
    email: string
    password: string
}

type AuthContextData = {
    signIn: (credentials: SignInCredentials) => Promise<void>
    signOut: () => void
    user: User
    isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

type AuthProviderProps = {
    children: ReactNode
}

export function signOut(){
    destroyCookie(undefined, 'nextauth.token')
    destroyCookie(undefined, 'nextauth.refreshtoken')

    Router.push('/')
    authChannel.postMessage('signOut')
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState({} as User)
    const isAuthenticated = !!user

    useEffect(()=>{
        authChannel = new BroadcastChannel('auth')
        authChannel.onmessage = (message) => {

            switch(message.data) {
                case 'signOut': 
                    signOut()
                    authChannel.close();
                    break
                case 'signIn':
                    Router.push('/dashboard')
                default:
                    break
            }
        }
    },[])

    useEffect(()=>{
        const { 'nextauth.token' : token} = parseCookies()

        if(token){
            api.get('/me').then( response => {
                const { email, permissions, roles } = response.data

                setUser({email, permissions, roles})
            })
            .catch(() => {signOut()})
        }

    }, [])

    async function signIn({ email, password } : SignInCredentials) {
        try{
            const response = await api.post('sessions', {
                email,
                password
            })
    
            const { permissions, roles, token, refreshToken } = response.data
            
            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 *60 * 24 * 30, // 30 dias
                path: '/'
            })

            setCookie(undefined, 'nextauth.refreshtoken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 dias
                path: '/'
            })
            
            setUser({
                email,
                permissions,
                roles
            })     

            api.defaults.headers['Authorization'] = `Bearer ${token}`
            
            authChannel.postMessage('signIn')
           Router.push('/dashboard')

        }catch(err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
            { children }
        </AuthContext.Provider>
    )
}