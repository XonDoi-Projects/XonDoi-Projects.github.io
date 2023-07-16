import { CSSProperties, FunctionComponent, ReactNode } from 'react'
import { Container } from './Container'
import { Header } from './Header'
import { Footer } from './Footer'
import { ChatButton } from '../InputComponents'
import { colors } from '../Colors'
import { useDarkTheme, useFirebase, useSize } from '../Providers'
import { useRouter } from 'next/router'
import { Spinner } from './Spinner'
import { Typography } from './Typography'

export interface PageProps {
    sx?: CSSProperties
    children: ReactNode
}

export const Page: FunctionComponent<PageProps> = (props) => {
    const { light } = useDarkTheme()
    const { loaded } = useFirebase()
    const mobile = useSize()

    const router = useRouter()

    return !loaded ? (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Spinner />
            <Typography sx={{ color: '#252525' }}>Getting assets from Firebase</Typography>
        </div>
    ) : light === undefined && !mobile.size ? (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Spinner />
            <Typography sx={{ color: '#252525' }}>Setting up your Theme</Typography>
        </div>
    ) : (
        <Container
            sx={{
                flex: 1,
                flexDirection: 'column',
                width: '100vw',
                maxWidth: '100vw',
                height: '100dvh',
                maxHeight: '100dvh',
                overflowY: 'auto',
                overflowX: 'hidden',
                backgroundColor: light ? colors.light.background : colors.dark.background,
                ...props.sx
            }}
            hidescrollBar
        >
            <Header />
            {props.children}
            {mobile.mobile ? <Footer /> : <></>}
            {router.pathname !== '/contact' ? <ChatButton /> : <></>}
        </Container>
    )
}
