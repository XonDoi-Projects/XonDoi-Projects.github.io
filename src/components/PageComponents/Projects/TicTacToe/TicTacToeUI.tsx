import { FunctionComponent, useState } from 'react'
import { colors } from '@/components/Colors'
import { Container } from '@/components/LayoutComponents'
import { useDarkTheme, useSize } from '@/components/Providers'

export interface TicTac {
    value: 'x' | 'o'
}

export interface TicTacToeLoginUIProps {}

export const TicTacToeLoginUI: FunctionComponent<TicTacToeLoginUIProps> = (props) => {
    const mobile = useSize()
    const { light } = useDarkTheme()

    const [ticTac, setTicTac] = useState<TicTac | undefined[]>()

    return (
        <Container sx={{ width: '100%', flexDirection: 'column' }}>
            <Container
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    backgroundColor: light ? colors.light.accent : colors.dark.accent,
                    gap: '10px'
                }}
            ></Container>
        </Container>
    )
}
