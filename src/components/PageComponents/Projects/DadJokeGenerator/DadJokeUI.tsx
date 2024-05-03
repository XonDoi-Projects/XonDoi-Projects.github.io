import { CSSProperties, FunctionComponent } from 'react'
import { Card, Container } from '@/components/LayoutComponents'
import { useDarkTheme, useSize, useUser } from '@/components/Providers'
import { colors } from '@/components/Colors'
import { Button } from '@/components/InputComponents'
import { BiChevronLeft, BiChevronRight, BiLike, BiSolidLike } from 'react-icons/bi'
import { IJoke } from './DadJokeGenerator'
import { Typography } from '@/components/LayoutComponents/Typography'
import { DateTime } from 'luxon'

export interface DadJokeUIProps {
    jokes: IJoke[]
    jokeIndex: number
    setJokeIndex: (value: number) => void
    sx?: CSSProperties
    reveal?: boolean
    setReveal?: (value: boolean) => void
    edit?: boolean
    setEdit?: (value: boolean) => void
    updateJokeLike?: () => void
}

export const DadJokeUI: FunctionComponent<DadJokeUIProps> = (props) => {
    const { light } = useDarkTheme()
    const mobile = useSize()
    const { user } = useUser()

    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: light ? colors.light.accent : colors.dark.accent,
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
                    height: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'transparent'
                }}
            >
                <Button
                    sx={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        opacity: props.jokeIndex === 0 ? 0.5 : 1,
                        padding: '0px',
                        zIndex: 1,
                        backgroundColor: 'transparent'
                    }}
                    onClick={() => props.setJokeIndex(props.jokeIndex - 1)}
                    disabled={props.jokeIndex === 0}
                    swapHover
                >
                    <BiChevronLeft
                        style={{
                            fontSize: '32px',
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground
                        }}
                    />
                </Button>
                <Button
                    sx={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        opacity: props.jokeIndex === props.jokes.length - 1 ? 0.5 : 1,
                        padding: '0px',
                        zIndex: 1,
                        backgroundColor: 'transparent'
                    }}
                    onClick={() => props.setJokeIndex(props.jokeIndex ? props.jokeIndex + 1 : 1)}
                    disabled={props.jokeIndex === props.jokes.length - 1}
                    swapHover
                >
                    <BiChevronRight
                        style={{
                            fontSize: '32px',
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground
                        }}
                    />
                </Button>
            </Container>
            <Container
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    padding: '20px 40px',
                    flexDirection: 'column',
                    gap: '20px'
                }}
            >
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '20px'
                    }}
                >
                    <Container
                        sx={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: '20px'
                        }}
                    >
                        <Typography
                            sx={{
                                height: '20px',
                                fontSize: '14px',
                                margin: 0,
                                color: light
                                    ? colors.light.accentForeground
                                    : colors.dark.accentForeground
                            }}
                        >
                            {!props.jokes[props.jokeIndex].submittedBy?.displayName
                                ? ''
                                : `Submitted By: ${
                                      props.jokes[props.jokeIndex].submittedBy?.displayName
                                  }`}
                        </Typography>
                        <Typography
                            sx={{
                                height: '20px',
                                fontSize: '14px',
                                margin: 0,
                                color: light
                                    ? colors.light.accentForeground
                                    : colors.dark.accentForeground
                            }}
                        >
                            {!props.jokes[props.jokeIndex].submittedOn
                                ? ''
                                : `Submitted On: ${DateTime.fromISO(
                                      props.jokes[props.jokeIndex].submittedOn || ''
                                  ).toFormat('MM/dd/yyyy')}`}
                        </Typography>
                    </Container>
                    <Container
                        sx={{
                            width: '20px',
                            height: '20px'
                        }}
                    >
                        <Button
                            sx={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                opacity: !user ? 0.5 : 1,
                                padding: '0px',
                                zIndex: 1,
                                backgroundColor: 'transparent'
                            }}
                            onClick={() => props.updateJokeLike && props.updateJokeLike()}
                            disabled={!user ? true : false}
                            swapHover
                        >
                            {user?._id && props.jokes[props.jokeIndex].likes?.includes(user._id) ? (
                                <BiSolidLike
                                    style={{
                                        fontSize: '16px',
                                        color: light
                                            ? colors.light.accentForeground
                                            : colors.dark.accentForeground
                                    }}
                                />
                            ) : (
                                <BiLike
                                    style={{
                                        fontSize: '16px',
                                        color: light
                                            ? colors.light.accentForeground
                                            : colors.dark.accentForeground
                                    }}
                                />
                            )}
                        </Button>
                        {props.jokes[props.jokeIndex].likes?.length ? (
                            <Container
                                sx={{
                                    position: 'absolute',
                                    top: '60%',
                                    left: '60%',
                                    backgroundColor: light
                                        ? colors.light.background
                                        : colors.dark.background,
                                    height: '12px',
                                    borderRadius: '6px',
                                    width: 'fit-content',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography
                                    sx={{ margin: '0', fontSize: '10px', padding: '0px 5px' }}
                                >
                                    {props.jokes[props.jokeIndex].likes?.length}
                                </Typography>
                            </Container>
                        ) : (
                            <></>
                        )}
                    </Container>
                </Container>
                <Container
                    sx={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                        overflowY: 'auto'
                    }}
                    hidescrollBar
                >
                    <Typography
                        sx={{
                            fontSize: mobile.mobile ? '20px' : '24px',
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground
                        }}
                    >
                        {props.jokes[props.jokeIndex].text}
                    </Typography>
                    <Typography
                        sx={{
                            marginLeft: '20px',
                            fontSize: mobile.mobile ? '20px' : '24px',
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
                            opacity: props.reveal ? 1 : 0,
                            transition: 'opacity 300ms ease'
                        }}
                    >
                        <strong>{props.jokes[props.jokeIndex].answer}</strong>
                    </Typography>
                    <Container sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            onClick={() => props.setReveal && props.setReveal(true)}
                            sx={{
                                width: '80px',
                                borderRadius: '19px',
                                backgroundColor: light
                                    ? colors.light.accentForeground
                                    : colors.dark.accentForeground,
                                color: light ? colors.light.accent : colors.dark.accent
                            }}
                        >
                            Reveal
                        </Button>
                        {user?._id === props.jokes[props.jokeIndex].submittedBy?._id ? (
                            <Button
                                onClick={() => props.setEdit && props.setEdit(true)}
                                sx={{
                                    width: '80px',
                                    borderRadius: '19px',
                                    backgroundColor: light
                                        ? colors.light.accentForeground
                                        : colors.dark.accentForeground,
                                    color: light ? colors.light.accent : colors.dark.accent
                                }}
                            >
                                Edit
                            </Button>
                        ) : (
                            <></>
                        )}
                    </Container>
                </Container>
            </Container>
        </Card>
    )
}
