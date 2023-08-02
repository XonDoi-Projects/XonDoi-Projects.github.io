import { FunctionComponent } from 'react'
import { Container } from '../LayoutComponents'
import { useSize } from '../Providers'
import { Typography } from '../LayoutComponents/Typography'
import { TicTacToeGame } from './Projects'

export interface TicTacToePageProps {}

export const TicTacToePage: FunctionComponent<TicTacToePageProps> = (props) => {
    const mobile = useSize()

    return (
        <Container
            sx={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}
            hidescrollBar
        >
            <Container
                sx={{
                    flexDirection: mobile.mobile ? 'column' : 'row',
                    width: mobile.mobile ? mobile.size?.width : '100%',
                    height: mobile.mobile ? '100%' : '100%',
                    justifyContent: 'center'
                }}
            >
                <Container
                    sx={{
                        flexDirection: 'column',
                        padding: '20px',
                        width: mobile.mobile ? '100%' : '70%',
                        height: '100%',
                        alignItems: mobile.mobile ? 'center' : 'flex-start',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Typography
                        variant="supertitle"
                        sx={{ marginTop: '20px', marginBottom: '20px' }}
                    >
                        Tic-Tac-Toe
                    </Typography>
                    <TicTacToeGame />
                </Container>
            </Container>
        </Container>
    )
}
