import { AppProps } from 'next/app'
import { DefaultFonts, GlobalStyle } from '..'
import {
    ContactFormProvider,
    DarkThemeProvider,
    FirebaseProvider,
    SizeProvider,
    UserProvider
} from '@/components/Providers'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'

const MyApp = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        document.title = 'Nathan M Portfolio'
    })

    return (
        <>
            <DefaultFonts />
            <GlobalStyle />
            <FirebaseProvider>
                <DarkThemeProvider>
                    <SizeProvider>
                        <UserProvider>
                            <ContactFormProvider>
                                <Component {...pageProps} />
                                <Analytics />
                            </ContactFormProvider>
                        </UserProvider>
                    </SizeProvider>
                </DarkThemeProvider>
            </FirebaseProvider>
        </>
    )
}

export default MyApp
