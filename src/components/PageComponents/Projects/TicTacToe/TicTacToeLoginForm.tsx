import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Typography } from '@/components/LayoutComponents/Typography'
import { Button, TextField } from '@/components/InputComponents'
import { colors } from '@/components/Colors'
import { Container, FadeInOut, FixedDiv } from '@/components/LayoutComponents'
import { useDarkTheme, useSize, useUser } from '@/components/Providers'

export interface TicTacToeLoginFormProps {
    setSkipLogin: (value: boolean) => void
}

export const TicTacToeLoginForm: FunctionComponent<TicTacToeLoginFormProps> = (props) => {
    const [showSnackbar, setShowSnackbar] = useState<{ message: string; color: string }>()
    const { setUser } = useUser()

    const [loading, setLoading] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout>()

    const [username, setUsername] = useState('')
    const [errorUsername, setErrorUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const mobile = useSize()
    const { light } = useDarkTheme()

    const checkFields = () => {
        let hasError = false

        if (!username) {
            hasError = true
            setErrorUsername('This field is required')
        } else {
            setErrorUsername('')
        }

        if (!password) {
            hasError = true
            setErrorPassword('This field is required')
        } else {
            setErrorPassword('')
        }

        return hasError
    }

    const sendData = async () => {
        if (!checkFields()) {
            setLoading(true)
            try {
                const result = await fetch(`/api/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                })
                const data = await result.json()
                setUser(data.user)
                setShowSnackbar({
                    message: data.message,
                    color: colors.light.success
                })
                setUsername('')
                setErrorUsername('')
                setPassword('')
                setErrorPassword('')
            } catch (e) {
                setShowSnackbar({
                    message: 'Failed to send message!',
                    color: colors.light.error
                })
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
                setShowSnackbar(undefined)
            }, 3000)
        }
    }, [showSnackbar])

    return (
        <Container sx={{ width: '100%', flexDirection: 'column' }}>
            <Typography variant="subtitle" sx={{ margin: '0px', textTransform: 'uppercase' }}>
                Login to start
            </Typography>
            <Typography variant="small" sx={{ marginTop: '10px', marginBottom: '0px' }}>
                If this is your first time a user will be create. This is only required for
                leadboard tracking.{' '}
            </Typography>
            <TextField
                value={username}
                onChange={setUsername}
                errorText={errorUsername}
                label="Username"
                fieldContainerSx={{ marginBottom: '28px' }}
                sx={{
                    color: light ? colors.dark.background : colors.light.background,
                    width: '100%'
                }}
            />
            <TextField
                value={password}
                onChange={setPassword}
                errorText={errorPassword}
                label="Password"
                fieldContainerSx={{ marginBottom: '28px' }}
                sx={{ color: light ? colors.dark.background : colors.light.background }}
            />
            <Container
                sx={{
                    flex: 1,
                    flexDirection: mobile.mobile ? 'column' : 'row',
                    width: '100%',
                    backgroundColor: 'transparent',
                    gap: '10px'
                }}
            >
                <Button
                    onClick={sendData}
                    sx={{
                        width: '100%',
                        borderRadius: '19px',
                        color: light ? colors.light.accentForeground : colors.dark.accentForeground,
                        backgroundColor: light ? colors.light.accent : colors.dark.accent
                    }}
                    swapHover
                    loading={loading}
                    contentSx={{ flex: 1 }}
                >
                    Start
                </Button>
                <Button
                    onClick={() => props.setSkipLogin(true)}
                    sx={{
                        width: '100%',
                        borderRadius: '19px',
                        color: light ? colors.light.accentForeground : colors.dark.accentForeground,
                        backgroundColor: light ? colors.light.accent : colors.dark.accent
                    }}
                    swapHover
                    contentSx={{ flex: 1 }}
                >
                    Skip
                </Button>
            </Container>

            <FadeInOut show={showSnackbar ? true : false}>
                <FixedDiv
                    sx={{
                        bottom: '50px',
                        left: '50%',
                        transform: 'translate(-50%,0)',
                        height: '70px',
                        maxWidth: mobile.mobile ? mobile.size?.width + 'px' : '400px',
                        padding: '0px 20px',
                        overflow: 'hidden',
                        backgroundColor: showSnackbar?.color,
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
                        {showSnackbar?.message}
                    </Typography>
                </FixedDiv>
            </FadeInOut>
        </Container>
    )
}
