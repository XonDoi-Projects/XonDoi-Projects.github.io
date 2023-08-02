import { colors } from '@/components/Colors'
import { Button, RadioButtonGroup } from '@/components/InputComponents'
import { Card, Container, Overlay, Spinner } from '@/components/LayoutComponents'
import { useDarkTheme, useSize, useUser } from '@/components/Providers'
import { CSSProperties, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { BiRefresh, BiTrophy, BiX } from 'react-icons/bi'
import { TicTacToeLoginForm } from './TicTacToeLoginForm'
import { Typography } from '@/components/LayoutComponents/Typography'
import { TicTacToeLoginUI } from './TicTacToeUI'
import { DateTime } from 'luxon'
import { keyframes } from '@emotion/react'

export interface TicTacToeGameProps {
    sx?: CSSProperties
}

interface Leaderboard {
    scores: { name: any; score: string; moves: string; time: string }[]
}

const rotate = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
})

export const TicTacToeGame: FunctionComponent<TicTacToeGameProps> = (props) => {
    const { light } = useDarkTheme()
    const { user } = useUser()

    const mobile = useSize()

    const [showScore, setShowScore] = useState(false)
    const [skipLogin, setSkipLogin] = useState(false)

    const [leaderboard, setLeaderboard] = useState<Leaderboard>()
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(false)
    const [dirty, setDirty] = useState(false)

    const [time, setTime] = useState<DateTime>()

    const [filterBy, setFilterBy] = useState('Score')

    const pullData = useCallback(async () => {
        setLoadingLeaderboard(true)
        try {
            let sort = {}

            if (filterBy === 'Score') {
                sort = { score: -1 }
            } else if (filterBy === 'Time') {
                sort = { time: 1 }
            } else {
                sort = { moves: 1 }
            }
            const result = await fetch('/api/scores/get-scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sort })
            })

            const data = await result.json()

            setLeaderboard(data)

            if (dirty) {
                setDirty(false)
            }
        } catch (e: any) {}

        setLoadingLeaderboard(false)
    }, [dirty, filterBy])

    useEffect(() => {
        if (showScore) {
            pullData()
        }
    }, [pullData, showScore])

    return (
        <>
            <Card
                sx={{
                    flex: 1,
                    flexDirection: 'column',
                    position: 'relative',
                    width: '100%',
                    height: 'fit-content',
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
                        padding: '5px',
                        height: '50px',
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Container sx={{ flex: 1 }}>
                        <Button
                            sx={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                padding: '0px',
                                backgroundColor: 'transparent'
                            }}
                            onClick={() => setShowScore(!showScore)}
                        >
                            <BiTrophy style={{ fontSize: '24px' }} />
                        </Button>
                    </Container>

                    <Container sx={{ flex: 1, justifyContent: 'center' }}>
                        {' '}
                        <Typography
                            sx={{
                                margin: '0px 0px 0px 20px',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {user?.username || 'Anonymous'}
                        </Typography>
                    </Container>

                    <Container sx={{ flex: 1, justifyContent: 'flex-end', minWidth: '100px' }}>
                        <Typography sx={{ textAlign: 'right', width: '100%' }}>
                            {time?.toFormat('ss.S').replace(/(\.\d{1})\d+/, '$1') || 'Time'}
                        </Typography>
                    </Container>
                </Container>
                <Container
                    sx={{
                        flex: 1,
                        flexDirection: 'column',
                        width: mobile.mobile ? '100%' : user || skipLogin ? '100%' : '400px',
                        height: user ? '100%' : undefined,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        padding: '20px'
                    }}
                >
                    {/**Get user from provider to switch between form and game*/}
                    {!user?.username && !skipLogin ? (
                        <TicTacToeLoginForm setSkipLogin={setSkipLogin} />
                    ) : (
                        <TicTacToeLoginUI
                            setSkipLogin={setSkipLogin}
                            time={time}
                            setTime={setTime}
                        />
                    )}
                </Container>
            </Card>
            <Overlay
                show={showScore}
                openDirection="left"
                cover
                onClose={() => setShowScore(false)}
            >
                <Container
                    sx={{ flexDirection: 'column', padding: '20px', width: '100%', height: '100%' }}
                >
                    <Container
                        sx={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                        }}
                    >
                        <Typography
                            variant="title"
                            sx={{
                                color: light
                                    ? colors.light.accentForeground
                                    : colors.dark.accentForeground
                            }}
                        >
                            Leaderboard
                        </Typography>
                        <Container sx={{ flexDirection: 'row' }}>
                            <Button
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    padding: '0px',
                                    backgroundColor: 'transparent',
                                    color: light
                                        ? colors.light.accentForeground
                                        : colors.dark.accentForeground,
                                    animation: loadingLeaderboard ? `${rotate}` : undefined,
                                    animationDuration: '1s',
                                    animationTimingFunction: 'linear',
                                    animationIterationCount: 'infinite'
                                }}
                                onClick={() => setDirty(true)}
                            >
                                <BiRefresh style={{ fontSize: '24px' }} />
                            </Button>
                            <Button
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    padding: '0px',
                                    backgroundColor: 'transparent',
                                    color: light
                                        ? colors.light.accentForeground
                                        : colors.dark.accentForeground
                                }}
                                onClick={() => setShowScore(false)}
                            >
                                <BiX style={{ fontSize: '24px' }} />
                            </Button>
                        </Container>
                    </Container>
                    <Container sx={{ flexDirection: 'row', marginBottom: '40px' }}>
                        <RadioButtonGroup
                            buttonList={['Score', 'Time', 'Moves']}
                            value={filterBy}
                            onChange={setFilterBy}
                            direction="left"
                            contentSx={{ flexDirection: 'row' }}
                        />
                    </Container>
                    <Container sx={{ flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                        <Container
                            sx={{
                                // flex: 1,
                                flexShrink: 0,
                                flexDirection: 'row',
                                marginBottom: '20px',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Container sx={{ flexDirection: 'row', width: '40px' }}>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        margin: '0px',
                                        color: light
                                            ? colors.light.accentForeground
                                            : colors.dark.accentForeground
                                    }}
                                >
                                    #
                                </Typography>
                            </Container>
                            <Container sx={{ flexDirection: 'row', flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        margin: '0px',
                                        color: light
                                            ? colors.light.accentForeground
                                            : colors.dark.accentForeground
                                    }}
                                >
                                    Name
                                </Typography>
                            </Container>
                            <Container sx={{ flexDirection: 'row', width: '70px' }}>
                                <Typography
                                    sx={{
                                        width: '100%',
                                        textAlign: 'right',
                                        fontWeight: 600,
                                        margin: '0px',
                                        color: light
                                            ? colors.light.accentForeground
                                            : colors.dark.accentForeground
                                    }}
                                >
                                    {filterBy === 'Score'
                                        ? 'Score'
                                        : filterBy === 'Time'
                                        ? 'Time'
                                        : 'Moves'}
                                </Typography>
                            </Container>
                        </Container>
                        {loadingLeaderboard ? (
                            <Container sx={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Spinner />
                            </Container>
                        ) : leaderboard?.scores.length ? (
                            <Container
                                sx={{
                                    flexDirection: 'column',
                                    overflowY: 'auto',
                                    overflowX: 'hidden'
                                }}
                                swapScrollBar
                            >
                                {leaderboard?.scores.map((line, index) => (
                                    <Container
                                        key={index}
                                        sx={{
                                            flexDirection: 'row',
                                            marginBottom: '10px',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Container sx={{ flexDirection: 'row', width: '40px' }}>
                                            <Typography
                                                sx={{
                                                    margin: '0px',
                                                    color: light
                                                        ? colors.light.accentForeground
                                                        : colors.dark.accentForeground
                                                }}
                                            >{`${index + 1}.`}</Typography>
                                        </Container>
                                        <Container sx={{ flexDirection: 'row', flex: 1 }}>
                                            <Typography
                                                sx={{
                                                    margin: '0px',
                                                    color: light
                                                        ? colors.light.accentForeground
                                                        : colors.dark.accentForeground,
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {line.name ? `${line.name.username}` : `Anonymous`}
                                            </Typography>
                                        </Container>
                                        <Container sx={{ flexDirection: 'row', width: '70px' }}>
                                            <Typography
                                                sx={{
                                                    width: '100%',
                                                    textAlign: 'right',
                                                    margin: '0px',
                                                    color: light
                                                        ? colors.light.accentForeground
                                                        : colors.dark.accentForeground
                                                }}
                                            >{`${
                                                filterBy === 'Score'
                                                    ? line.score
                                                    : filterBy === 'Time'
                                                    ? DateTime.fromISO(line.time).toFormat('mm:ss')
                                                    : line.moves
                                            }`}</Typography>
                                        </Container>
                                    </Container>
                                ))}
                            </Container>
                        ) : (
                            <Container>
                                <Typography
                                    sx={{
                                        margin: '0px',
                                        color: light
                                            ? colors.light.accentForeground
                                            : colors.dark.accentForeground
                                    }}
                                >
                                    No Data Found
                                </Typography>
                            </Container>
                        )}
                    </Container>
                </Container>
            </Overlay>
        </>
    )
}
