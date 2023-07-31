import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Button, TextAreaField, TextField } from '../InputComponents'
import { mobileWidth, useContactForm, useDarkTheme, useSize } from '../Providers'
import { colors } from '../Colors'
import { Typography } from '../LayoutComponents/Typography'
import { Container, FadeInOut, FixedDiv } from '../LayoutComponents'

export interface ContactMeFormProps {}

export const ContactMeForm: FunctionComponent<ContactMeFormProps> = (props) => {
    const [snackbar, setSnackbar] = useState<{ message: string; color: string }>()
    const [showSnackbar, setShowSnackbar] = useState(false)

    const [loading, setLoading] = useState(false)
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

    const mobile = useSize()
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
            setLoading(true)
            try {
                const result = await fetch(`/api/contact`, {
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
                const data = await result.json()

                setSnackbar({
                    message: data.message,
                    color: colors.light.success
                })
                setShowSnackbar(true)
                setDisplayName('')
                setErrorName('')
                setEmail('')
                setErrorEmail('')
                setMessage('')
                setErrorMessage('')
            } catch (e) {
                setSnackbar({
                    message: 'Failed to send message!',
                    color: colors.light.error
                })
                setShowSnackbar(true)
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        if (timeoutRef.current !== undefined) {
            clearTimeout(timeoutRef.current)
        }

        if (showSnackbar) {
            timeoutRef.current = setTimeout(() => {
                setShowSnackbar(false)
            }, 3000)
        }
    }, [showSnackbar])

    return (
        <>
            <Typography variant="subtitle" sx={{ margin: '0px', textTransform: 'uppercase' }}>
                Get In Touch
            </Typography>
            <TextField
                value={displayName}
                onChange={(value) => {
                    setDisplayName(value)
                    setErrorName('')
                }}
                errorText={errorName}
                label="Name"
                fieldContainerSx={{ marginBottom: '28px' }}
                sx={{ color: light ? colors.dark.background : colors.light.background }}
            />
            <TextField
                value={email}
                onChange={(value) => {
                    setEmail(value)
                    setErrorEmail('')
                }}
                errorText={errorEmail}
                label="Email"
                fieldContainerSx={{ marginBottom: '28px' }}
                sx={{ color: light ? colors.dark.background : colors.light.background }}
            />
            <TextAreaField
                value={message}
                onChange={(value) => {
                    if (value.length <= 500) setMessage(value)
                    setErrorMessage('')
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
                        width: '80px',
                        borderRadius: '19px',
                        color: light ? colors.light.accentForeground : colors.dark.accentForeground,
                        backgroundColor: light ? colors.light.accent : colors.dark.accent
                    }}
                    swapHover
                    loading={loading}
                >
                    Send
                </Button>
            </Container>

            <FadeInOut show={showSnackbar}>
                <FixedDiv
                    sx={{
                        bottom: '50px',
                        left: '50%',
                        transform: 'translate(-50%,0)',
                        height: '70px',
                        maxWidth: mobile.mobile ? mobile.size?.width + 'px' : '400px',
                        padding: '0px 20px',
                        overflow: 'hidden',
                        backgroundColor: snackbar?.color,
                        borderRadius: '35px',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        sx={{
                            color: colors.light.background,
                            fontSize: '16px',
                            textAlign: 'center',
                            margin: 0
                        }}
                    >
                        {snackbar?.message}
                    </Typography>
                </FixedDiv>
            </FadeInOut>
        </>
    )
}
