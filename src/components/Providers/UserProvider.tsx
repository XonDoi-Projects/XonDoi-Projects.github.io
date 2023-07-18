import React, {
    createContext,
    FunctionComponent,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react'
import { useFirebase } from './FirebaseProvider'
import { Container, Spinner } from '../LayoutComponents'
import { Typography } from '../LayoutComponents/Typography'

export interface User {
    username: string
}

export interface IUserContext {
    user?: User
    setUser: (value: User) => void
}

export const UserContext = createContext<IUserContext | undefined>(undefined)

export interface IUserProviderProps {
    children: ReactNode
}

export const UserProvider: FunctionComponent<IUserProviderProps> = (props) => {
    const [user, setUser] = useState<User>()

    return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>
}

export const useUser = () => {
    const ctx = useContext(UserContext)

    if (!ctx) {
        throw new Error('User context not found! Check your AppProvider')
    }

    return ctx
}
