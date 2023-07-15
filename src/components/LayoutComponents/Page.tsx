import { CSSProperties, FunctionComponent, ReactNode } from 'react'
import { Container } from './Container'
import { Header } from './Header'
import { Footer } from './Footer'
import { ChatButton } from '../InputComponents'
import { colors } from '../Colors'
import { useDarkTheme, useSize } from '../Providers'
import { useRouter } from 'next/router'
import { Spinner } from './Spinner'

export interface PageProps {
    sx?: CSSProperties
    children: ReactNode
}

export const Page: FunctionComponent<PageProps> = (props) => {
    const { light } = useDarkTheme()
    const mobile = useSize()

    const router = useRouter()

    return mobile.size && light !== undefined ? (
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
    ) : (
        <Container sx={{ width: '100vw', height: '100vh' }}>
            <Spinner />
        </Container>
    )
}
