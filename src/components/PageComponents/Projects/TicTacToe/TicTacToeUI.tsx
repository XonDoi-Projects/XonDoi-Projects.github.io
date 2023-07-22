import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { colors } from '@/components/Colors'
import { Container, FadeInOut, FixedDiv } from '@/components/LayoutComponents'
import { useDarkTheme, useSize, useUser } from '@/components/Providers'
import { Typography } from '@/components/LayoutComponents/Typography'
import { cloneDeep, isEqual } from 'lodash'
import { Button } from '@/components/InputComponents'
import e from 'cors'

export type TicTac = 'x' | 'o'

export interface TicTacToeLoginUIProps {
    setSkipLogin?: (value: boolean) => void
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

export const TicTacToeLoginUI: FunctionComponent<TicTacToeLoginUIProps> = (props) => {
    const mobile = useSize()
    const { light } = useDarkTheme()
    const { user, setUser } = useUser()

    const [ticTac, setTicTac] = useState<(TicTac | undefined)[]>(Array.from(Array(9)))
    const [playState, setPlayState] = useState<boolean>()
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const [draw, setDraw] = useState(false)

    //for easy, just use random number
    //for medium, base play on combination with highest win yield
    //for hard, base play on cell with highest win yield and block to avoid loss

    const handleBotPlay = useCallback(() => {
        console.log(playState)
        if (playState) {
            let ticTacPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9]

            //easy
            // let tempTicTac = cloneDeep(ticTac)

            // let filteredPositions = ticTacPositions.filter((_, index) => !ticTac[index])
            // const randomIndex = Math.floor(Math.random() * filteredPositions.length)

            // tempTicTac[filteredPositions[randomIndex] - 1] = 'o'

            //medium
            // let tempTicTac = cloneDeep(ticTac)

            // let currentPositions = ticTacPositions.filter((_, index) => tempTicTac[index] === 'o')

            // if (!currentPositions.length) {
            //     let filteredPositions = ticTacPositions.filter((_, index) => !tempTicTac[index])
            //     const randomIndex = Math.floor(Math.random() * filteredPositions.length)
            //     tempTicTac[filteredPositions[randomIndex] - 1] = 'o'
            // } else {
            //     let distance: number[] = Array.from(Array(7)).fill(0)

            //     let filteredWinningCombinations = winningCombinations.filter(
            //         (combination) =>
            //             !combination.some((position) => tempTicTac[position - 1] === 'x')
            //     )
            //     filteredWinningCombinations.forEach((combination, index) => {
            //         let match = combination.map(
            //             (position) =>
            //                 currentPositions.includes(position) && tempTicTac[position - 1] !== 'x'
            //         )

            //         distance[index] =
            //             match.reduce(
            //                 (previous, _, subIndex) =>
            //                     tempTicTac[filteredWinningCombinations[index][subIndex] - 1] === 'o'
            //                         ? previous + 1
            //                         : tempTicTac[
            //                               filteredWinningCombinations[index][subIndex] - 1
            //                           ] === 'x'
            //                         ? previous - 1
            //                         : previous + 0,
            //                 0
            //             ) / 3
            //     })

            //     let max = Math.max(...distance)
            //     let maxIndex = distance.findIndex((distance) => distance === max)

            //     let filteredPlatyer2Positions = filteredWinningCombinations[maxIndex].filter(
            //         (position) => {
            //             return !tempTicTac[position - 1]
            //         }
            //     )

            //     const randomIndex = Math.floor(Math.random() * filteredPlatyer2Positions.length)
            //     tempTicTac[filteredPlatyer2Positions[randomIndex] - 1] = 'o'

            //hard
            let tempTicTac = cloneDeep(ticTac)

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

                if (maxIndex === 0) {
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
    }, [playState, ticTac])

    const sendData = useCallback(async () => {}, [])

    useEffect(() => {
        if (playState && !win) {
            setTimeout(handleBotPlay, 2000)
        }
    }, [handleBotPlay, playState, win])

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
            return true
        }
        return false
    }

    const handleCheckLose = (value: (TicTac | undefined)[]) => {
        let ticTacPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        let filteredPositions = ticTacPositions.filter((_, index) => value[index] === 'o')

        let lose = winningCombinations.find((combination) => {
            return combination
                .map((position) => filteredPositions.includes(position))
                .every((item) => item)
        })

        if (lose) {
            return true
        }
        return false
    }

    const handleCheckDraw = (value: (TicTac | undefined)[]) => {
        let ticTacPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let filteredPositions = ticTacPositions.filter((_, index) => !value[index])

        if (!filteredPositions.length) {
            return true
        }
        return false
    }

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
                            if (!playState && !lose) {
                                let tempPrev = cloneDeep(ticTac)
                                tempPrev[index] = 'x'

                                setTicTac(tempPrev)

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
                            }
                        }}
                    >
                        <Typography>{cell || ''}</Typography>
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
                            backgroundColor: 'rgba(0,255,0,0.8)'
                        }}
                    >
                        <Typography
                            variant="title"
                            sx={{
                                margin: '0',
                                textAlign: 'center'
                            }}
                        >
                            Nailed it
                        </Typography>
                        <Typography variant="subtitle" sx={{ margin: '0', textAlign: 'center' }}>
                            You Win!
                        </Typography>
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
                            backgroundColor: 'rgba(255,0,0,0.8)'
                        }}
                    >
                        <Typography
                            variant="title"
                            sx={{
                                margin: '0',
                                textAlign: 'center'
                            }}
                        >
                            Toe Bad
                        </Typography>
                        <Typography
                            variant="subtitle"
                            sx={{
                                margin: '0',
                                textAlign: 'center'
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
                            backgroundColor: 'rgba(255,255,0,0.8)'
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
                <Button
                    sx={{
                        borderRadius: '19px',
                        color: light ? colors.light.accentForeground : colors.dark.accentForeground,
                        backgroundColor: light ? colors.light.accent : colors.dark.accent
                    }}
                    onClick={() => {
                        setPlayState(Math.ceil(Math.random() * 2) === 1 ? true : false)
                    }}
                    disabled={playState !== undefined ? true : false}
                >
                    Start
                </Button>

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
                    }}
                >
                    Reset
                </Button>
            </Container>
        </Container>
    )
}
