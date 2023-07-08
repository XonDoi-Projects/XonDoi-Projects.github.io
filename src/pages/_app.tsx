import { AppProps } from 'next/app'
import { DefaultFonts, GlobalStyle } from '..'
import { ContactFormProvider, DarkThemeProvider, SizeProvider } from '@/components/Providers'

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <DefaultFonts />
            <GlobalStyle />
            <DarkThemeProvider>
                <SizeProvider>
                    <ContactFormProvider>
                        <Component {...pageProps} />
                    </ContactFormProvider>
                </SizeProvider>
            </DarkThemeProvider>
        </>
    )
}

export default MyApp
