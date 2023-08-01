import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { colors } from '@/components/Colors'
import { Container, FadeInOut, FixedDiv } from '@/components/LayoutComponents'
import { useDarkTheme, useSize, useUser } from '@/components/Providers'
import { Typography } from '@/components/LayoutComponents/Typography'
import { cloneDeep } from 'lodash'
import { Button } from '@/components/InputComponents'
import { DateTime } from 'luxon'
import Image from 'next/image'

export type TicTac = 'x' | 'o'

export interface TicTacToeLoginUIProps {
    setSkipLogin?: (value: boolean) => void
    time?: DateTime
    setTime: (value?: DateTime) => void
}

const winningCombinations = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
]

export const TicTacToeLoginUI: FunctionComponent<TicTacToeLoginUIProps> = ({
    time,
    setTime,
    ...props
}) => {
    const [snackbar, setSnackbar] = useState<{ message: string; color: string }>()
    const [showSnackbar, setShowSnackbar] = useState(false)

    let timeoutRef = useRef<NodeJS.Timeout>()

    const mobile = useSize()
    const { light } = useDarkTheme()
    const { user, setUser } = useUser()

    const [loadingScore, setLoadingScore] = useState(false)

    const [ticTac, setTicTac] = useState<(TicTac | undefined)[]>(Array.from(Array(9)))
    const [playState, setPlayState] = useState<boolean>()
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const [draw, setDraw] = useState(false)

    const [score, setScore] = useState(0)
    const [moves, setMoves] = useState(0)
    const [highScore, setHighScore] = useState(0)

    const playStateRef = useRef(playState)

    const [intervalId, setIntervalId] = useState<NodeJS.Timer>()
    const [startTime, setStartTime] = useState(false)

    const getUserScore = useCallback(async () => {
        console.log(1, user)
        if (user) {
            try {
                const result = await fetch('/api/scores/get-user-score', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query: { userId: user._id } })
                })

                const data = await result.json()

                setHighScore(data.score.score)
            } catch (e: any) {}
        }
    }, [user])

    useEffect(() => {
        getUserScore()
    }, [getUserScore])

    //for easy, just use random number
    //for medium, base play on combination with highest win yield
    //for hard, base play on cell with highest win yield and block to avoid loss

    useEffect(() => {
        if (startTime && !win && !lose && !draw) {
            let interval = setInterval(() => {
                const tempTime = cloneDeep(time)
                setTime(
                    tempTime?.plus({ millisecond: 100 }) ||
                        DateTime.now().set({
                            minute: 0,
                            second: 0,
                            millisecond: 0
                        })
                )
            }, 100)

            setIntervalId(interval)
            return () => clearInterval(interval)
        } else {
            setStartTime(false)
        }
    }, [draw, lose, setTime, startTime, time, win])

    useEffect(() => {
        playStateRef.current = playState
    }, [playState])

    const sendData = useCallback(async () => {}, [])

    useEffect(() => {
        if (win) {
            sendData()
        }
    }, [sendData, win])

    const handleCheckWin = (value: (TicTac | undefined)[]) => {
        let ticTacPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        let filteredPositions = ticTacPositions.filter((_, index) => value[index] === 'x')

        let win = winningCombinations.find((combination) => {
            return combination
                .map((position) => filteredPositions.includes(position))
                .every((item) => item)
        })

        if (win) {
            let seconds = 0
            const minutes = time?.minute

            if (time) {
                if (minutes) {
                    seconds = minutes * 60
                    seconds += time.second
                    seconds = seconds + time.millisecond / 1000
                } else {
                    seconds = time?.second || 0
                    seconds = seconds + time.millisecond / 1000
                }
            }

            const normalizedTime = seconds / 120 > 1 ? 1 : seconds / 120
            const normalizedMoves = moves / 5

            setScore(
                parseFloat(
                    (
                        (1 -
                            Math.sqrt(Math.pow(normalizedTime, 2) + Math.pow(normalizedMoves, 2))) *
                        1000
                    ).toFixed(1)
                )
            )
            setPlayState(undefined)
            clearInterval(intervalId)
            return true
        }
        return false
    }

    const handleCheckLose = useCallback(
        (value: (TicTac | undefined)[]) => {
            let ticTacPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9]

            let filteredPositions = ticTacPositions.filter((_, index) => value[index] === 'o')

            let lose = winningCombinations.find((combination) => {
                return combination
                    .map((position) => filteredPositions.includes(position))
                    .every((item) => item)
            })

            if (lose) {
                setPlayState(undefined)
                clearInterval(intervalId)
                return true
            }
            return false
        },
        [intervalId]
    )

    const handleCheckDraw = useCallback(
        (value: (TicTac | undefined)[]) => {
            let ticTacPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            let filteredPositions = ticTacPositions.filter((_, index) => !value[index])

            if (!filteredPositions.length) {
                setPlayState(undefined)
                clearInterval(intervalId)
                return true
            }
            return false
        },
        [intervalId]
    )

    const handleBotPlay = (ticTac: (TicTac | undefined)[]) => {
        if (playStateRef.current) {
            let ticTacPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9]

            //hard
            let tempTicTac = ticTac

            let currentPositions = ticTacPositions.filter((_, index) => tempTicTac[index] === 'o')

            if (!currentPositions.length) {
                const filteredPositions = ticTacPositions.filter((_, index) => !tempTicTac[index])
                const randomIndex = Math.floor(Math.random() * filteredPositions.length)
                tempTicTac[filteredPositions[randomIndex] - 1] = 'o'
            } else {
                let distanceX: number[] = Array.from(Array(7)).fill(0)
                let distanceO: number[] = Array.from(Array(7)).fill(0)

                const filteredWinningCombinationsX = winningCombinations.filter(
                    (combination) =>
                        !combination.some((position) => tempTicTac[position - 1] === 'x')
                )
                filteredWinningCombinationsX.forEach((combination, index) => {
                    let matchX = combination.map((position) => {
                        if (!tempTicTac[position - 1]) {
                            return undefined
                        } else if (
                            currentPositions.includes(position) &&
                            tempTicTac[position - 1] === 'x'
                        ) {
                            return true
                        } else {
                            return false
                        }
                    })

                    if (!matchX.some((match) => match === undefined)) {
                        distanceX[index] = 0
                        return
                    }
                    distanceX[index] =
                        (matchX.reduce(
                            (previous, _, subIndex) =>
                                tempTicTac[filteredWinningCombinationsX[index][subIndex] - 1] ===
                                'o'
                                    ? previous + 1
                                    : tempTicTac[
                                          filteredWinningCombinationsX[index][subIndex] - 1
                                      ] === 'x'
                                    ? previous - 1
                                    : previous + 0,
                            0
                        ) /
                            3) *
                        0.6
                })

                const filteredWinningCombinationsO = winningCombinations.filter((combination) =>
                    combination.some((position) => tempTicTac[position - 1] === 'x')
                )
                filteredWinningCombinationsO.forEach((combination, index) => {
                    let matchO = combination.map((position) => {
                        if (!tempTicTac[position - 1]) {
                            return undefined
                        } else if (
                            currentPositions.includes(position) &&
                            tempTicTac[position - 1] === 'o'
                        ) {
                            return true
                        } else {
                            return false
                        }
                    })

                    if (!matchO.some((match) => match === undefined)) {
                        distanceO[index] = 0
                        return
                    }
                    distanceO[index] =
                        (matchO.reduce(
                            (previous, _, subIndex) =>
                                tempTicTac[filteredWinningCombinationsO[index][subIndex] - 1] ===
                                'x'
                                    ? previous + 1
                                    : tempTicTac[
                                          filteredWinningCombinationsO[index][subIndex] - 1
                                      ] === 'o'
                                    ? previous - 1
                                    : previous + 0,
                            0
                        ) /
                            3) *
                        1.4
                })

                let maxX = Math.max(...distanceX)
                let maxO = Math.max(...distanceO)
                let max = Math.max(maxX, maxO)
                let maxIndex = [maxX, maxO].findIndex((distance) => distance === max)
                let maxIndexX = distanceX.findIndex((distance) => distance === maxX)
                let maxIndexO = distanceO.findIndex((distance) => distance === maxO)

                if (!filteredWinningCombinationsX.length) {
                    let filteredPositions = ticTacPositions.filter((_, index) => !tempTicTac[index])
                    const randomIndex = Math.floor(Math.random() * filteredPositions.length)
                    tempTicTac[filteredPositions[randomIndex] - 1] = 'o'
                } else if (maxIndex === 0) {
                    const filteredPlayer2Positions = filteredWinningCombinationsX[maxIndexX].filter(
                        (position) => {
                            return !tempTicTac[position - 1]
                        }
                    )
                    const randomIndex = Math.floor(Math.random() * filteredPlayer2Positions.length)
                    tempTicTac[filteredPlayer2Positions[randomIndex] - 1] = 'o'
                } else {
                    if (!filteredWinningCombinationsO.length) {
                        const filteredPositions = ticTacPositions.filter(
                            (_, index) => !ticTac[index]
                        )
                        const randomIndex = Math.floor(Math.random() * filteredPositions.length)

                        tempTicTac[filteredPositions[randomIndex] - 1] = 'o'
                    } else {
                        const filteredPlayer2Positions = filteredWinningCombinationsO[
                            maxIndexO
                        ].filter((position) => {
                            return !tempTicTac[position - 1]
                        })
                        const randomIndex = Math.floor(
                            Math.random() * filteredPlayer2Positions.length
                        )
                        tempTicTac[filteredPlayer2Positions[randomIndex] - 1] = 'o'
                    }
                }
            }

            setTicTac(tempTicTac)

            let lose = handleCheckLose(tempTicTac)
            if (lose) {
                setLose(true)
                return
            }
            let draw = handleCheckDraw(tempTicTac)
            if (draw) {
                setDraw(true)
                return
            }
            setPlayState(false)
        }
    }

    const handleScore = async () => {
        setLoadingScore(true)
        try {
            let timeObject = {
                year: 1993,
                month: 12,
                day: 12,
                hour: 0,
                minute: time?.minute,
                second: time?.second
            }
            let result: Response
            if (user) {
                result = await fetch(`/api/scores/submit-score`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user?._id,
                        score,
                        moves,
                        time: DateTime.fromObject(timeObject).toUTC().toISO()
                    })
                })
            } else {
                result = await fetch(`/api/scores/submit-score-anon`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        score,
                        moves,
                        time: DateTime.fromObject(timeObject).toUTC().toISO()
                    })
                })
            }

            if (result.status === 200) {
                setHighScore(score)
                const data = await result.json()

                setSnackbar({
                    message: data.message,
                    color: colors.light.success
                })
                setShowSnackbar(true)
                setTicTac(Array.from(Array(9)))
                setPlayState(undefined)
                setWin(false)
                setLose(false)
                setDraw(false)
                setMoves(0)
                setTime(undefined)
                setScore(0)
                clearInterval(intervalId)
                setStartTime(false)
            } else {
                const data = await result.json()

                setSnackbar({
                    message: data.message,
                    color: colors.light.error
                })
                setShowSnackbar(true)
            }
        } catch (e: any) {
            setSnackbar({
                message: e.message,
                color: colors.light.error
            })
            setShowSnackbar(true)
        }
        setLoadingScore(false)
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
        <Container sx={{ height: '100%', width: '100%', flexDirection: 'column' }}>
            <Container
                sx={{
                    width: '100%',
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3,1fr)',
                    gridTemplateRows: 'repeat(3,1fr)',
                    backgroundColor: light ? colors.light.accent : colors.dark.accent,
                    gap: '10px'
                }}
            >
                {ticTac.map((cell, index) => (
                    <Container
                        key={index}
                        sx={{
                            backgroundColor: light
                                ? colors.light.background
                                : colors.dark.background,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onClick={() => {
                            if (
                                playState !== undefined &&
                                playState !== true &&
                                !lose &&
                                !ticTac[index]
                            ) {
                                let tempPrev = cloneDeep(ticTac)
                                tempPrev[index] = 'x'

                                setTicTac(tempPrev)

                                setMoves(moves + 1)
                                let win = handleCheckWin(tempPrev)
                                if (win) {
                                    setWin(true)
                                    return
                                }

                                let draw = handleCheckDraw(tempPrev)
                                if (draw) {
                                    setDraw(true)
                                    return
                                }

                                setPlayState(true)

                                setTimeout(() => handleBotPlay(tempPrev), 2000)
                            }
                        }}
                    >
                        {cell === 'o' ? (
                            <Container
                                sx={{
                                    width: '50%',
                                    height: '50%',
                                    padding: '0px'
                                }}
                            >
                                <Image
                                    src="https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/TicTac.png?alt=media&token=8614269a-99b5-4b34-8f7a-592ba520dc32"
                                    alt="Tic Tac"
                                    fill
                                    style={{ objectFit: 'scale-down' }}
                                />
                            </Container>
                        ) : cell === 'x' ? (
                            <Container
                                sx={{
                                    width: '50%',
                                    height: '50%',
                                    padding: '0px'
                                }}
                            >
                                <Image
                                    src="https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/Toe3.png?alt=media&token=2c0c57b5-0594-40a1-93a3-1824157c818d"
                                    alt="Toe"
                                    fill
                                    style={{ objectFit: 'scale-down' }}
                                />
                            </Container>
                        ) : (
                            <></>
                        )}
                    </Container>
                ))}
                <FadeInOut
                    show={win}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <Container
                        sx={{
                            flexDirection: 'column',
                            position: 'absolute',
                            padding: '10px 20px',
                            height: 'fit-content',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '15px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,150,0,0.96)'
                        }}
                    >
                        <Typography
                            variant="title"
                            sx={{
                                margin: '0',
                                textAlign: 'center',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Nailed it
                        </Typography>
                        <Typography
                            variant="subtitle"
                            sx={{ margin: '0', textAlign: 'center', whiteSpace: 'nowrap' }}
                        >
                            You Win!
                        </Typography>

                        {score > highScore ? (
                            <Button
                                sx={{
                                    borderRadius: '19px',
                                    backgroundColor: light
                                        ? colors.light.accent
                                        : colors.dark.accent
                                }}
                                contentSx={{ width: 'fit-content', marginTop: '10px' }}
                                onClick={handleScore}
                                loading={loadingScore}
                            >
                                <Typography
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        margin: '0px 10px',
                                        color: light
                                            ? colors.light.accentForeground
                                            : colors.dark.accentForeground
                                    }}
                                >{`Submit high score: ${score}`}</Typography>
                            </Button>
                        ) : (
                            <Container sx={{ flexDirection: 'column' }}>
                                <Typography
                                    sx={{ margin: '3px 0px', textAlign: 'center' }}
                                >{`Your Score: ${score}`}</Typography>
                                <Typography
                                    sx={{ margin: '3px 0px', textAlign: 'center' }}
                                >{`High Score: ${highScore}`}</Typography>
                            </Container>
                        )}
                    </Container>
                </FadeInOut>

                <FadeInOut
                    show={lose}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <Container
                        sx={{
                            flexDirection: 'column',
                            position: 'absolute',
                            padding: '10px 20px',
                            height: 'fit-content',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '15px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(150,0,0,0.96)'
                        }}
                    >
                        <Typography
                            variant="title"
                            sx={{
                                margin: '0',
                                textAlign: 'center',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Toe Bad
                        </Typography>
                        <Typography
                            variant="subtitle"
                            sx={{
                                margin: '0',
                                textAlign: 'center',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            You Lose!
                        </Typography>
                    </Container>
                </FadeInOut>
                <FadeInOut
                    show={draw}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <Container
                        sx={{
                            flexDirection: 'column',
                            position: 'absolute',
                            padding: '10px 20px',
                            height: 'fit-content',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '15px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(150,150,0,0.96)'
                        }}
                    >
                        <Typography
                            variant="title"
                            sx={{
                                margin: '0',
                                textAlign: 'center'
                            }}
                        >
                            Draw
                        </Typography>
                    </Container>
                </FadeInOut>
            </Container>
            <Container
                sx={{
                    flexDirection: 'row',
                    height: '50px',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '10px'
                }}
            >
                {user ? (
                    <Button
                        sx={{
                            borderRadius: '19px',
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
                            backgroundColor: light ? colors.light.accent : colors.dark.accent
                        }}
                        onClick={() => setUser(undefined)}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        sx={{
                            borderRadius: '19px',
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
                            backgroundColor: light ? colors.light.accent : colors.dark.accent
                        }}
                        onClick={() => props.setSkipLogin && props.setSkipLogin(false)}
                    >
                        Login
                    </Button>
                )}
                {playState === undefined && time === undefined ? (
                    <Button
                        sx={{
                            borderRadius: '19px',
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
                            backgroundColor: light ? colors.light.accent : colors.dark.accent
                        }}
                        onClick={() => {
                            let state = Math.ceil(Math.random() * 2) === 1 ? true : false
                            setPlayState(state)

                            setStartTime(true)

                            if (state) {
                                setTimeout(() => handleBotPlay(ticTac), 2000)
                            }
                        }}
                    >
                        Start
                    </Button>
                ) : playState === true ? (
                    <Typography variant="body" sx={{ margin: '0' }}>
                        {' '}
                        Bot’s Turn
                    </Typography>
                ) : (
                    <Typography variant="body" sx={{ margin: '0' }}>
                        {' '}
                        Your Turn
                    </Typography>
                )}

                <Button
                    sx={{
                        borderRadius: '19px',
                        color: light ? colors.light.accentForeground : colors.dark.accentForeground,
                        backgroundColor: light ? colors.light.accent : colors.dark.accent
                    }}
                    onClick={() => {
                        setTicTac(Array.from(Array(9)))
                        setPlayState(undefined)
                        setWin(false)
                        setLose(false)
                        setDraw(false)
                        setMoves(0)
                        setTime(undefined)
                        setScore(0)
                        clearInterval(intervalId)
                        setStartTime(false)
                    }}
                >
                    Reset
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
        </Container>
    )
}
