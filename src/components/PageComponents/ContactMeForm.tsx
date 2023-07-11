import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Button, TextAreaField, TextField } from '../InputComponents'
import { useContactForm, useDarkTheme } from '../Providers'
import { colors } from '../Colors'
import { Typography } from '../LayoutComponents/Typography'
import { Container, FadeInOut, FixedDiv } from '../LayoutComponents'

export interface ContactMeFormProps {}

export const ContactMeForm: FunctionComponent<ContactMeFormProps> = (props) => {
    const [showSnackbar, setShowSnackbar] = useState<{ message: string; color: string }>()

    const timeoutRef = useRef<NodeJS.Timeout>()

    const {
        displayName,
        email,
        errorEmail,
        errorMessage,
        errorName,
        message,
        setDisplayName,
        setEmail,
        setErrorEmail,
        setErrorMessage,
        setErrorName,
        setMessage
    } = useContactForm()

    const { light } = useDarkTheme()

    const checkFields = () => {
        let hasError = false

        if (!displayName) {
            hasError = true
            setErrorName('This field is required')
        } else {
            setErrorName('')
        }

        if (!email) {
            hasError = true
            setErrorEmail('This field is required')
        } else {
            setErrorEmail('')
        }

        if (!message) {
            hasError = true
            setErrorMessage('This field is required')
        } else {
            setErrorMessage('')
        }
        return hasError
    }

    const sendData = async () => {
        if (!checkFields()) {
            try {
                let url = ''
                if (process.env.NODE_ENV === 'development') {
                    url = ''
                } else {
                    url = 'https://xondoi-projects.github.io'
                }
                //api call
                console.log('step1')
                const result = await fetch(`${url}/api/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: displayName,
                        email: email,
                        message: message
                    })
                })
                console.log(result)
                console.log('step2')
                const data = await result.json()
                console.log('step3', data)

                setShowSnackbar({
                    message: data.message,
                    color: colors.light.success
                })
            } catch (e) {
                console.log(e)
                setShowSnackbar({
                    message: 'Failed to send message!',
                    color: colors.light.error
                })
            }
        }
    }

    useEffect(() => {
        if (timeoutRef.current !== undefined) {
            clearTimeout(timeoutRef.current)
        }

        if (showSnackbar) {
            timeoutRef.current = setTimeout(() => {
                setShowSnackbar(undefined)
            }, 3000)
        }
    }, [showSnackbar])

    return (
        <>
            <Typography variant="subtitle" sx={{ margin: '0px', textTransform: 'uppercase' }}>
                Send Me A Message
            </Typography>
            <TextField
                value={displayName}
                onChange={setDisplayName}
                errorText={errorName}
                label="Name"
                fieldContainerSx={{ marginBottom: '28px' }}
                sx={{ color: light ? colors.dark.background : colors.light.background }}
            />
            <TextField
                value={email}
                onChange={setEmail}
                errorText={errorEmail}
                label="Email"
                fieldContainerSx={{ marginBottom: '28px' }}
                sx={{ color: light ? colors.dark.background : colors.light.background }}
            />
            <TextAreaField
                value={message}
                onChange={(value) => {
                    if (value.length <= 500) setMessage(value)
                }}
                errorText={errorMessage}
                label="Message"
                fieldContainerSx={{ marginBottom: '28px' }}
                helperText={`${message.length}/500`}
                sx={{ color: light ? colors.dark.background : colors.light.background }}
            />
            <Container
                sx={{ width: '100%', backgroundColor: 'transparent', justifyContent: 'flex-end' }}
            >
                <Button
                    onClick={sendData}
                    sx={{
                        borderRadius: '19px',
                        color: light ? colors.light.accentForeground : colors.dark.accentForeground,
                        // border: '1px solid',
                        backgroundColor: light ? colors.light.accent : colors.dark.accent
                    }}
                    swapHover
                >
                    Send
                </Button>
            </Container>

            <FadeInOut show={showSnackbar ? true : false}>
                <FixedDiv
                    sx={{
                        bottom: '50px',
                        left: '50%',
                        transform: 'translate(-50%,0)',
                        height: '70px',
                        maxWidth: '400px',
                        padding: '0px 20px',
                        overflow: 'hidden',
                        backgroundColor: showSnackbar?.color,
                        borderRadius: '5px',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        sx={{
                            color: colors.light.background,
                            fontSize: '16px',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {showSnackbar?.message}
                    </Typography>
                </FixedDiv>
            </FadeInOut>
        </>
    )
}
