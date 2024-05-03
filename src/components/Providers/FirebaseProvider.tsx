import React, { createContext, FunctionComponent, ReactNode, useContext, useMemo } from 'react'
import { FirebaseOptions, initializeApp } from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    UserCredential
} from 'firebase/auth'
import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_BUCKET,
    FIREBASE_PROJECT_ID
} from '../Server'

const firebaseConfig: FirebaseOptions = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_BUCKET,
    appId: FIREBASE_APP_ID
}

export interface IFirebaseContext {
    loaded?: boolean
    login?: (email: string, password: string) => Promise<UserCredential>
    register?: (email: string, password: string) => Promise<UserCredential>
    logout?: () => Promise<void>
}

export const FirebaseContext = createContext<IFirebaseContext | undefined>(undefined)

export interface IFirebaseProviderProps {
    children: ReactNode
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export const FirebaseProvider: FunctionComponent<IFirebaseProviderProps> = (props) => {
    const loaded = useMemo(() => (app ? true : false), [])

    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const register = async (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        return auth.signOut()
    }

    return (
        <FirebaseContext.Provider value={{ loaded, login, register, logout }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export const useFirebase = () => {
    const ctx = useContext(FirebaseContext)

    if (!ctx) {
        throw new Error('Firebase context not found! Check your AppProvider')
    }

    return ctx
}
