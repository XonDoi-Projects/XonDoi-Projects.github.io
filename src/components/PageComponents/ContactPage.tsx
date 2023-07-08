import { FunctionComponent, createRef, useCallback, useEffect, useRef, useState } from 'react'
import { Container } from '../LayoutComponents'
import { ContactFormProvider, useDarkTheme, useSize } from '../Providers'
import { Typography } from '../LayoutComponents/Typography'
import Link from 'next/link'
import { colors } from '../Colors'
import { BiRightArrowAlt } from 'react-icons/bi'
import { Button } from '../InputComponents'
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
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden'
            }}
            hidescrollBar
        >
            <Container
                sx={{
                    flexDirection: mobile.mobile ? 'column' : 'row',
                    justifyContent: 'flex-start',
                    width: mobile.mobile ? mobile.size?.width : '100%',
                    height: mobile.mobile ? '100%' : '100%'
                }}
            >
                <Container
                    sx={{
                        width: mobile.mobile ? '100%' : '35%',
                        height: '100%',
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
                            marginLeft: mobile.mobile ? '0px' : '50px'
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
                            marginBottom: mobile.mobile ? '0px' : '10px',
                            marginLeft: mobile.mobile ? '0px' : '50px'
                        }}
                    >
                        Linked In
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
                            variant="linker"
                            sx={{
                                color: light ? colors.light.background : colors.dark.background,
                                margin: '0px',
                                marginBottom: '20px',
                                marginLeft: mobile.mobile ? '0px' : '50px'
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
                            marginLeft: mobile.mobile ? '0px' : '50px'
                        }}
                    >
                        Discord
                    </Typography>
                    <Typography
                        variant="linker"
                        sx={{
                            color: light ? colors.light.background : colors.dark.background,
                            margin: '0px',
                            marginBottom: '20px',
                            marginLeft: mobile.mobile ? '0px' : '50px'
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
                            marginLeft: mobile.mobile ? '0px' : '50px'
                        }}
                    >
                        Email
                    </Typography>
                    <Typography
                        variant="linker"
                        sx={{
                            color: light ? colors.light.background : colors.dark.background,
                            margin: '0px',
                            marginBottom: '20px',
                            marginLeft: mobile.mobile ? '0px' : '50px'
                        }}
                    >
                        nathanmagro1993@gmail.com
                    </Typography>
                </Container>

                <Container
                    sx={{
                        width: mobile.mobile ? '100%' : '65%',
                        height: mobile.mobile ? 'fit-content' : '100%',
                        padding: '30px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Container
                        sx={{
                            flexDirection: 'column',
                            width: mobile.mobile ? '100%' : '70%',
                            height: mobile.mobile ? '100%' : '70%'
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
