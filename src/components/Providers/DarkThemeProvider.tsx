import React, { createContext, FunctionComponent, ReactNode, useContext, useState } from 'react'

export interface IDarkThemeContext {
    light: boolean
    setLight: (value: boolean) => void
}

export const DarkThemeContext = createContext<IDarkThemeContext | undefined>(undefined)

export interface IDarkThemeProviderProps {
    children: ReactNode
}

export const DarkThemeProvider: FunctionComponent<IDarkThemeProviderProps> = (props) => {
    const [light, setLight] = useState(true)

    return (
        <DarkThemeContext.Provider value={{ light, setLight }}>
            {props.children}
        </DarkThemeContext.Provider>
    )
}

export const useDarkTheme = () => {
    const ctx = useContext(DarkThemeContext)

    if (!ctx) {
        throw new Error('DarkTheme context not found! Check your AppProvider')
    }

    return ctx
}
