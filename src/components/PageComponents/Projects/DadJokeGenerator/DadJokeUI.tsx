import { CSSProperties, FunctionComponent, useEffect, useRef, useState } from 'react'
import { Card, Container } from '@/components/LayoutComponents'
import { useDarkTheme, useSize } from '@/components/Providers'
import { colors } from '@/components/Colors'
import { Button } from '@/components/InputComponents'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { IJoke } from './DadJokeGenerator'

export interface DadJokeUIProps {
    jokes: IJoke[]
    jokeIndex: number
    setJokeIndex: (value: number) => void
    sx?: CSSProperties
}

export const DadJokeUI: FunctionComponent<DadJokeUIProps> = (props) => {
    const { light } = useDarkTheme()
    const mobile = useSize()

    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
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
            <Container
                sx={{
                    position: 'absolute',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Button
                    sx={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        opacity: props.jokeIndex === 0 ? 0.5 : 1,
                        padding: '0px',
                        zIndex: 1,
                        backgroundColor: 'transparent'
                    }}
                    onClick={() => props.setJokeIndex(props.jokeIndex - 1)}
                    disabled={props.jokeIndex === 0}
                >
                    <BiChevronLeft style={{ fontSize: '60px' }} />
                </Button>
                <Button
                    sx={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        opacity: props.jokeIndex === props.jokes.length - 1 ? 0.5 : 1,
                        padding: '0px',
                        zIndex: 1,
                        backgroundColor: 'transparent'
                    }}
                    onClick={() => props.setJokeIndex(props.jokeIndex ? props.jokeIndex + 1 : 1)}
                    disabled={props.jokeIndex === props.jokes.length - 1}
                >
                    <BiChevronRight style={{ fontSize: '60px', backgroundColor: 'transparent' }} />
                </Button>
            </Container>
            <> {props.jokes[props.jokeIndex].text}</>
        </Card>
    )
}
