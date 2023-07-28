import React, { createContext, FunctionComponent, ReactNode, useContext, useMemo } from 'react'
import { FirebaseOptions, initializeApp } from 'firebase/app'
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
