import { CSSProperties, FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { keyframes } from '@emotion/react'
import { Container, Spinner } from '@/components/LayoutComponents'
import { DadJokeUI } from './DadJokeUI'
import { User, useDarkTheme, useSize } from '@/components/Providers'
import { Typography } from '@/components/LayoutComponents/Typography'
import { DadJokeForm } from './DadJokeForm'
import { colors } from '@/components/Colors'
import { LoginForm } from '../LoginForm'
import { DateTime } from 'luxon'

export interface DadJokeGeneratorProps {
    sx?: CSSProperties
}

const flip = keyframes({
    '0%': { transform: 'rotate3d(0,1,0,0deg)' },
    '100%': { transform: 'rotate3d(0,1,0,180deg)' }
})

const flipReverse = keyframes({
    '0%': { transform: 'rotate3d(0,1,0,0deg)' },
    '100%': { transform: 'rotate3d(0,1,0,-180deg)' }
})
export interface IJoke {
    text: string
    answer: string
    submittedBy?: User
    submittedOn?: string
}

export const DadJokeGenerator: FunctionComponent<DadJokeGeneratorProps> = (props) => {
    const { light } = useDarkTheme()
    const mobile = useSize()

    const [jokes, setJokes] = useState<IJoke[]>([])
    const [loading, setLoading] = useState(true)

    const [currentJokeIndex, setCurrentJokeIndex] = useState(0)
    const [newJokeIndex, setNewJokeIndex] = useState(0)
    const [previousJokeIndex, setPreviousJokeIndex] = useState(0)

    const [reveal, setReveal] = useState(false)

    const updatePreviousRef = useRef<NodeJS.Timer>()
    const updateCurrentRef = useRef<NodeJS.Timer>()

    const getJokes = useCallback(async () => {
        setLoading(true)
        try {
            const jokes = await fetch('/api/jokes/get-jokes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })

            const result = await jokes.json()

            setJokes(result.jokes)
        } catch (e: any) {
            console.log(e)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        getJokes()
    }, [getJokes])

    useEffect(() => {
        if (currentJokeIndex !== newJokeIndex) {
            if (updatePreviousRef.current) {
                clearTimeout(updatePreviousRef.current)
            }

            updatePreviousRef.current = setTimeout(
                () => setPreviousJokeIndex(currentJokeIndex),
                200
            )

            return () => clearTimeout(updatePreviousRef.current)
        }
    }, [currentJokeIndex, newJokeIndex])

    useEffect(() => {
        if (updateCurrentRef.current) {
            clearTimeout(updateCurrentRef.current)
        }

        updateCurrentRef.current = setTimeout(() => {
            setCurrentJokeIndex(newJokeIndex)
            setReveal(false)
        }, 200)

        return () => clearTimeout(updateCurrentRef.current)
    }, [newJokeIndex])

    return (
        <Container
            sx={{
                flex: 1,
                flexDirection: 'column',
                position: 'relative',
                width: '100%',
                height: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '20px',
                ...props.sx
            }}
        >
            <Container
                sx={{
                    width: '100%',
                    height: 'fit-content',
                    justifyContent: 'center',
                    alignItems: 'center',
                    perspective: '5000px',
                    borderRadius: '5px'
                }}
            >
                {loading ? (
                    <Container
                        sx={{
                            height: '100px',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Spinner
                            spinnerSx={{
                                borderTopColor: light ? colors.light.primary : colors.dark.primary
                            }}
                        />
                    </Container>
                ) : !jokes.length ? (
                    <Container
                        sx={{
                            height: '100px',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography>No jokes available</Typography>
                    </Container>
                ) : (
                    <Container
                        key={newJokeIndex.toString()}
                        sx={{
                            flex: mobile.mobile ? undefined : 1,
                            flexDirection: 'column',
                            position: 'relative',
                            width: '100%',
                            minHeight: '350px',
                            maxHeight: '500px',
                            borderRadius: '5px',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            backgroundColor: light ? colors.light.accent : colors.dark.accent,
                            animationName:
                                newJokeIndex !== previousJokeIndex
                                    ? newJokeIndex > previousJokeIndex
                                        ? `${flip}`
                                        : `${flipReverse}`
                                    : undefined,
                            animationTimingFunction: 'cubic-bezier(0, 1, 0.75, 1)',
                            animationDuration: '1s',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <Container
                            sx={{
                                opacity: 0,
                                position: 'relative',
                                width: '100%',
                                height: 'fit-content',
                                borderRadius: '5px',
                                backgroundColor: light ? colors.light.accent : colors.dark.accent,
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            <DadJokeUI
                                key={'ghostFront'}
                                jokeIndex={currentJokeIndex}
                                setJokeIndex={setNewJokeIndex}
                                jokes={jokes}
                            />
                        </Container>
                        <Container
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '5px',
                                backgroundColor: light ? colors.light.accent : colors.dark.accent,
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            <DadJokeUI
                                key={'front'}
                                jokeIndex={currentJokeIndex}
                                setJokeIndex={setNewJokeIndex}
                                jokes={jokes}
                                reveal={reveal}
                                setReveal={setReveal}
                            />
                        </Container>
                        <Container
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '5px',
                                backgroundColor: light ? colors.light.accent : colors.dark.accent,
                                transform: 'rotateY(180deg)',
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            <DadJokeUI
                                key={'back'}
                                jokeIndex={newJokeIndex}
                                setJokeIndex={setNewJokeIndex}
                                jokes={jokes}
                            />
                        </Container>
                    </Container>
                )}
            </Container>

            <Typography sx={{ margin: '0px' }} variant="subtitle">
                OR
            </Typography>
            <Container sx={{ paddingBottom: '10px', width: '100%' }}>
                <DadJokeForm
                    sx={{
                        height: 'fit-content',
                        boxSizing: 'border-box'
                    }}
                />
            </Container>
        </Container>
    )
}
