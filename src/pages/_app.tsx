import { AppProps } from 'next/app'
import { DefaultFonts, GlobalStyle } from '..'
import {
    ContactFormProvider,
    DarkThemeProvider,
    FirebaseProvider,
    SizeProvider,
    UserProvider
} from '@/components/Providers'

const MyApp = ({ Component, pageProps }: AppProps) => {
    document.title = 'Nathan M Portfolio'
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
                            </ContactFormProvider>
                        </UserProvider>
                    </SizeProvider>
                </DarkThemeProvider>
            </FirebaseProvider>
        </>
    )
}

export default MyApp
