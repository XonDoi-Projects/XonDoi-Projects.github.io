import { CSSProperties, FunctionComponent, useEffect, useRef, useState } from 'react'
import { keyframes } from '@emotion/react'
import { Container } from '@/components/LayoutComponents'
import { DadJokeUI } from './DadJokeUI'
import { useSize } from '@/components/Providers'
import { Typography } from '@/components/LayoutComponents/Typography'
import { DadJokeForm } from './DadJokeForm'

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
}

const jokes: IJoke[] = [
    {
        text: 'React'
    },
    {
        text: 'JS'
    },
    {
        text: 'TS'
    },
    {
        text: 'Jest'
    },
    {
        text: 'NodeJS'
    },
    {
        text: 'MongoDB'
    },
    {
        text: 'Firebase'
    },
    {
        text: 'Next'
    }
]

export const DadJokeGenerator: FunctionComponent<DadJokeGeneratorProps> = (props) => {
    const mobile = useSize()

    const [jokeIndex, setJokeIndex] = useState(0)
    const [previousIndex, setPreviousIndex] = useState(0)

    const updateRef = useRef<NodeJS.Timer>()
    useEffect(() => {
        if (updateRef.current) {
            clearTimeout(updateRef.current)
        }

        updateRef.current = setTimeout(() => setPreviousIndex(jokeIndex), 300)

        return () => clearTimeout(updateRef.current)
    }, [jokeIndex])

    return (
        <Container
            key={jokeIndex.toString()}
            sx={{
                flex: 1,
                flexDirection: 'column',
                position: 'relative',
                width: '100%',
                height: 'fit-content',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '20px',
                ...props.sx
            }}
        >
            <Container
                sx={{
                    flex: mobile.mobile ? undefined : 1,
                    flexDirection: 'column',
                    position: 'relative',
                    width: '100%',
                    height: mobile.mobile ? 'fit-cotent' : undefined,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    animationName:
                        jokeIndex !== previousIndex
                            ? jokeIndex > previousIndex
                                ? `${flip}`
                                : `${flipReverse}`
                            : undefined,
                    animationTimingFunction: 'ease',
                    animationDuration: '1s'
                }}
            >
                <DadJokeUI jokeIndex={jokeIndex} setJokeIndex={setJokeIndex} jokes={jokes} />
            </Container>

            <Typography sx={{ margin: '0px' }} variant="subtitle">
                OR
            </Typography>
            <DadJokeForm
                sx={{
                    flex: mobile.mobile ? undefined : 1,
                    height: mobile.mobile ? 'fit-cotent' : undefined
                }}
            />
        </Container>
    )
}
