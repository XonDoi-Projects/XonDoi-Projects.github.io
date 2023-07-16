import React, { createContext, FunctionComponent, ReactNode, useContext, useMemo } from 'react'
import { initializeApp } from 'firebase/app'
import { FIREBASE_API_KEY } from '../Server'

const firebaseConfig = {
    apiKey: 'AIzaSyDsUo_yvCbarkU5Q3RBnQZw2XghA6Mb_tw',
    authDomain: 'portfolio-3b624.firebaseapp.com',
    projectId: 'portfolio-3b624',
    storageBucket: 'portfolio-3b624.appspot.com',
    messagingSenderId: '625703437389',
    appId: '1:625703437389:web:799d42f18d95b17d4e4804',
    measurementId: 'G-5VEXDSBHK5'
}

// Initialize Firebase

export interface IFirebaseContext {
    loaded?: boolean
}

export const FirebaseContext = createContext<IFirebaseContext | undefined>(undefined)

export interface IFirebaseProviderProps {
    children: ReactNode
}

const app = initializeApp(firebaseConfig)

export const FirebaseProvider: FunctionComponent<IFirebaseProviderProps> = (props) => {
    const loaded = useMemo(() => (app ? true : false), [])

    return <FirebaseContext.Provider value={{ loaded }}>{props.children}</FirebaseContext.Provider>
}

export const useFirebase = () => {
    const ctx = useContext(FirebaseContext)

    if (!ctx) {
        throw new Error('Firebase context not found! Check your AppProvider')
    }

    return ctx
}
