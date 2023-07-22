import { colors } from '@/components/Colors'
import { Button } from '@/components/InputComponents'
import { Card, Container, Overlay } from '@/components/LayoutComponents'
import { useDarkTheme, useSize, useUser } from '@/components/Providers'
import { CSSProperties, FunctionComponent, useState } from 'react'
import { BiTrophy, BiX } from 'react-icons/bi'
import { TicTacToeLoginForm } from './TicTacToeLoginForm'
import { Typography } from '@/components/LayoutComponents/Typography'
import { TicTacToeLoginUI } from './TicTacToeUI'

export interface TicTacToeGameProps {
    sx?: CSSProperties
}

export const TicTacToeGame: FunctionComponent<TicTacToeGameProps> = (props) => {
    const { light } = useDarkTheme()
    const { user } = useUser()

    const mobile = useSize()

    const [showScore, setShowScore] = useState(false)
    const [skipLogin, setSkipLogin] = useState(false)

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
                    <Typography sx={{ margin: '0px 0px 0px 20px' }}>
                        {user?.username || 'Anonymous'}
                    </Typography>
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
                        <TicTacToeLoginUI setSkipLogin={setSkipLogin} />
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
                    sx={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: '20px'
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
            </Overlay>
        </>
    )
}
