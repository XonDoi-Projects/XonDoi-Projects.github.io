import React, { createContext, FunctionComponent, ReactNode, useContext, useState } from 'react'

export interface IContactFormContext {
    displayName: string
    setDisplayName: (value: string) => void
    email: string
    setEmail: (value: string) => void
    message: string
    setMessage: (value: string) => void

    errorName: string
    setErrorName: (value: string) => void
    errorEmail: string
    setErrorEmail: (value: string) => void
    errorMessage: string
    setErrorMessage: (value: string) => void
}

export const ContactFormContext = createContext<IContactFormContext | undefined>(undefined)

export interface IContactFormProviderProps {
    children: ReactNode
}

export const ContactFormProvider: FunctionComponent<IContactFormProviderProps> = (props) => {
    const [displayName, setDisplayName] = useState('')
    const [errorName, setErrorName] = useState('')
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    return (
        <ContactFormContext.Provider
            value={{
                displayName,
                email,
                message,
                setDisplayName,
                setEmail,
                setMessage,
                errorEmail,
                errorMessage,
                errorName,
                setErrorEmail,
                setErrorMessage,
                setErrorName
            }}
        >
            {props.children}
        </ContactFormContext.Provider>
    )
}

export const useContactForm = () => {
    const ctx = useContext(ContactFormContext)

    if (!ctx) {
        throw new Error('ContactForm context not found! Check your AppProvider')
    }

    return ctx
}
