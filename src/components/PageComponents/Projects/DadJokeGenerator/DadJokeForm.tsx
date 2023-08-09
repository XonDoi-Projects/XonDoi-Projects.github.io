import { CSSProperties, FunctionComponent, useEffect, useRef, useState } from 'react'
import { Card, Container, FadeInOut, FixedDiv } from '@/components/LayoutComponents'
import { useDarkTheme, useSize, useUser } from '@/components/Providers'
import { colors } from '@/components/Colors'
import { LoginForm } from '../LoginForm'
import { Typography } from '@/components/LayoutComponents/Typography'
import { Button, TextAreaField } from '@/components/InputComponents'

import BadWords from 'bad-words'

export interface DadJokeFormProps {
    sx?: CSSProperties
    setDirty?: (value: boolean) => void
}

export const DadJokeForm: FunctionComponent<DadJokeFormProps> = (props) => {
    const { user } = useUser()
    const { light } = useDarkTheme()
    const mobile = useSize()

    const [snackbar, setSnackbar] = useState<{ message: string; color: string }>()
    const [showSnackbar, setShowSnackbar] = useState(false)

    const [jokeLine, setJokeLine] = useState('')
    const [errorLine, setErrorLine] = useState('')
    const [jokeAnswer, setJokeAnswer] = useState('')
    const [errorAnswer, setErrorAnswer] = useState('')

    const [loading, setLoading] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout>()

    const checkFields = () => {
        let hasError = false
        const badWords = new BadWords()

        if (!jokeLine) {
            hasError = true
            setErrorLine('This field is required')
        } else if (badWords.isProfane(jokeLine)) {
            hasError = true
            setErrorLine('This field contains profanity')
        } else {
            setErrorLine('')
        }

        if (!jokeAnswer) {
            hasError = true
            setErrorAnswer('This field is required')
        } else if (badWords.isProfane(jokeAnswer)) {
            hasError = true
            setErrorAnswer('This field contains profanity')
        } else {
            setErrorAnswer('')
        }

        return hasError
    }

    const sendJoke = async () => {
        if (!checkFields()) {
            setLoading(true)
            try {
                const result = await fetch(`/api/jokes/submit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user?._id,
                        text: jokeLine,
                        answer: jokeAnswer
                    })
                })

                const data = await result.json()

                props.setDirty && props.setDirty(true)
                setJokeLine('')
                setJokeAnswer('')
                setSnackbar({
                    message: data.message,
                    color: colors.light.success
                })
                setShowSnackbar(true)
            } catch (e: any) {
                setSnackbar({
                    message: 'Failed to submit!',
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
            <Card
                sx={{
                    padding: '20px',
                    width: '100%',
                    border: 'solid',
                    borderWidth: '1px',
                    borderColor: light ? colors.light.accent : colors.dark.accent,
                    boxSizing: 'border-box',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    margin: mobile.mobile ? '0px 0px 20px 0px ' : '0px',
                    ...props.sx
                }}
            >
                {user ? (
                    <Container sx={{ width: '100%', flexDirection: 'column' }}>
                        <Typography variant="small">
                            To keep this NSFW, profanity is not allowed.
                        </Typography>
                        <TextAreaField
                            value={jokeLine}
                            onChange={setJokeLine}
                            label="Joke"
                            errorText={errorLine}
                            sx={{ color: light ? colors.dark.background : colors.light.background }}
                        />
                        <TextAreaField
                            value={jokeAnswer}
                            onChange={setJokeAnswer}
                            label="Punch Line"
                            errorText={errorAnswer}
                            sx={{ color: light ? colors.dark.background : colors.light.background }}
                        />
                        <Button
                            onClick={sendJoke}
                            sx={{
                                width: '80px',
                                borderRadius: '19px',
                                color: light
                                    ? colors.light.accentForeground
                                    : colors.dark.accentForeground,
                                backgroundColor: light ? colors.light.accent : colors.dark.accent
                            }}
                            swapHover
                            loading={loading}
                        >
                            Submit
                        </Button>
                    </Container>
                ) : (
                    <LoginForm
                        title="Login to submit"
                        warning='"If this is your first time, a user will be created. '
                    />
                )}
            </Card>

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
