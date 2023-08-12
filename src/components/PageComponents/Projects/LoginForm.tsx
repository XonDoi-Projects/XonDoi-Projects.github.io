import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Typography } from '@/components/LayoutComponents/Typography'
import { Button, TextField } from '@/components/InputComponents'
import { colors } from '@/components/Colors'
import { Container, FadeInOut, FixedDiv } from '@/components/LayoutComponents'
import { useDarkTheme, useSize, useUser } from '@/components/Providers'
import { BiHide, BiShow } from 'react-icons/bi'

export interface LoginFormProps {
    setSkipLogin?: (value: boolean) => void
    warning?: string
    title: string
    loginText?: string
}

export const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
    const [snackbar, setSnackbar] = useState<{ message: string; color: string }>()
    const [showSnackbar, setShowSnackbar] = useState(false)

    const { setUser } = useUser()

    const [loading, setLoading] = useState(false)
    let timeoutRef = useRef<NodeJS.Timeout>()

    const [username, setUsername] = useState('')
    const [errorUsername, setErrorUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const [showPass, setShowPass] = useState(false)

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
                if (result.status === 200) {
                    const data = await result.json()

                    setUser(data.user)
                    setSnackbar({
                        message: data.message,
                        color: colors.light.success
                    })
                    setShowSnackbar(true)
                    setUsername('')
                    setErrorUsername('')
                    setPassword('')
                    setErrorPassword('')
                } else {
                    const data = await result.json()

                    setSnackbar({
                        message: data.message,
                        color: colors.light.error
                    })
                    setShowSnackbar(true)
                }
            } catch (e: any) {
                console.log(e)
                setSnackbar({
                    message: e.message,
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

        return () => clearTimeout(timeoutRef.current)
    }, [showSnackbar])

    return (
        <Container sx={{ width: '100%', height: 'fit-content', flexDirection: 'column' }}>
            <Typography variant="subtitle" sx={{ margin: '0px', textTransform: 'uppercase' }}>
                {props.title}
            </Typography>
            {props.warning ? (
                <Typography variant="small" sx={{ marginTop: '10px', marginBottom: '0px' }}>
                    {props.warning}
                </Typography>
            ) : (
                <></>
            )}

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
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={setPassword}
                errorText={errorPassword}
                label="Password"
                fieldContainerSx={{ marginBottom: '28px' }}
                sx={{ color: light ? colors.dark.background : colors.light.background }}
                suffix={
                    <Button
                        sx={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            padding: '0px',
                            backgroundColor: 'transparent'
                        }}
                        onClick={() => setShowPass(!showPass)}
                    >
                        {!showPass ? (
                            <BiShow style={{ fontSize: '24px' }} />
                        ) : (
                            <BiHide style={{ fontSize: '24px' }} />
                        )}
                    </Button>
                }
            />
            <Container
                sx={{
                    flex: 1,
                    marginTop: '16px',
                    flexDirection: 'row',
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
                    {props.loginText || 'Login'}
                </Button>
                {props.setSkipLogin ? (
                    <Button
                        onClick={() => props.setSkipLogin && props.setSkipLogin(true)}
                        sx={{
                            width: '100%',
                            borderRadius: '19px',
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
                            backgroundColor: light ? colors.light.accent : colors.dark.accent
                        }}
                        swapHover
                        contentSx={{ flex: 1 }}
                    >
                        Skip
                    </Button>
                ) : (
                    <></>
                )}
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
        </Container>
    )
}
