import { AppProps } from 'next/app'
import { DefaultFonts, GlobalStyle } from '..'
import {
    ContactFormProvider,
    DarkThemeProvider,
    FirebaseProvider,
    SizeProvider
} from '@/components/Providers'

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <DefaultFonts />
            <GlobalStyle />
            <FirebaseProvider>
                <DarkThemeProvider>
                    <SizeProvider>
                        <ContactFormProvider>
                            <Component {...pageProps} />
                        </ContactFormProvider>
                    </SizeProvider>
                </DarkThemeProvider>
            </FirebaseProvider>
        </>
    )
}

export default MyApp
