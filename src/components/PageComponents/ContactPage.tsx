import { FunctionComponent } from 'react'
import { Container } from '../LayoutComponents'
import { useDarkTheme, useSize } from '../Providers'
import { Typography } from '../LayoutComponents/Typography'
import Link from 'next/link'
import { colors } from '../Colors'
import { ContactMeForm } from './ContactMeForm'

export interface ContactPageProps {}

export const ContactPage: FunctionComponent<ContactPageProps> = (props) => {
    const mobile = useSize()
    const { light } = useDarkTheme()

    return (
        <Container
            sx={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}
            hidescrollBar
        >
            <Container
                sx={{
                    flexDirection: mobile.mobile ? 'column' : 'row',
                    width: mobile.mobile ? mobile.size?.width : '100%',
                    height: mobile.mobile ? '100%' : '100%'
                }}
            >
                <Container
                    sx={{
                        width: mobile.mobile ? '100%' : '35%',
                        height: mobile.mobile ? 'fit-content' : '100vh',
                        padding: '30px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: mobile.mobile ? 'center' : 'flex-start',
                        backgroundColor: light ? colors.light.accent : colors.dark.accent
                    }}
                >
                    <Typography
                        variant="supertitle"
                        sx={{
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
                            marginLeft: mobile.mobile ? '0px' : '20px'
                        }}
                    >
                        Contact Me
                    </Typography>

                    <Typography
                        variant="subtitle"
                        sx={{
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
                            margin: '0px',
                            marginBottom: '10px',
                            marginLeft: mobile.mobile ? '0px' : '20px'
                        }}
                    >
                        LinkedIn
                    </Typography>
                    <Link
                        href="https://www.linkedin.com/in/nathanmagro/"
                        style={{
                            textDecorationColor: light
                                ? colors.light.background
                                : colors.dark.background
                        }}
                    >
                        <Typography
                            // variant="linker"
                            sx={{
                                fontSize: '18px',
                                fontWeight: 400,
                                color: light ? colors.light.background : colors.dark.background,
                                margin: '0px',
                                marginBottom: '20px',
                                marginLeft: mobile.mobile ? '0px' : '20px',
                                wordBreak: 'break-all'
                            }}
                        >
                            linkedin.com/in/nathanmagro/
                        </Typography>
                    </Link>
                    <Typography
                        variant="subtitle"
                        sx={{
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
                            margin: '0px',
                            marginBottom: '10px',
                            marginLeft: mobile.mobile ? '0px' : '20px'
                        }}
                    >
                        Discord
                    </Typography>
                    <Typography
                        // variant="linker"
                        sx={{
                            fontSize: '18px',
                            fontWeight: 400,
                            color: light ? colors.light.background : colors.dark.background,
                            margin: '0px',
                            marginBottom: '20px',
                            marginLeft: mobile.mobile ? '0px' : '20px'
                        }}
                    >
                        xondoi
                    </Typography>

                    <Typography
                        variant="subtitle"
                        sx={{
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
                            margin: '0px',
                            marginBottom: '10px',
                            marginLeft: mobile.mobile ? '0px' : '20px'
                        }}
                    >
                        Email
                    </Typography>
                    <Typography
                        // variant="linker"
                        sx={{
                            fontSize: '18px',
                            fontWeight: 400,
                            color: light ? colors.light.background : colors.dark.background,
                            margin: '0px',
                            marginBottom: '20px',
                            marginLeft: mobile.mobile ? '0px' : '20px',
                            wordBreak: 'break-all'
                        }}
                    >
                        nathanmagro1993@gmail.com
                    </Typography>
                </Container>

                <Container
                    sx={{
                        width: mobile.mobile ? '100%' : '55%',
                        height: mobile.mobile ? 'fit-content' : '100vh',
                        padding: '20px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}
                >
                    <Container
                        sx={{
                            flexDirection: 'column',
                            width: mobile.mobile ? '100%' : '70%',
                            height: mobile.mobile ? '100%' : '70%',
                            overflowY: mobile.mobile ? 'hidden' : 'auto',
                            overflowX: 'hidden'
                        }}
                        hidescrollBar
                    >
                        <ContactMeForm />
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
