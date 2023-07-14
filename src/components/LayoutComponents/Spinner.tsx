import { CSSProperties, FunctionComponent } from 'react'
import { Container } from './Container'
import { keyframes } from '@emotion/react'
import { useDarkTheme } from '../Providers'
import { colors } from '../Colors'

export interface SpinnerProps {
    sx?: CSSProperties
}

const rotation = keyframes({
    '0%': {
        transform: 'rotate(0deg)'
    },
    '100%': {
        transform: 'rotate(360deg)'
    }
})

export const Spinner: FunctionComponent<SpinnerProps> = (props) => {
    const { light } = useDarkTheme()

    const themeColors = light ? colors.light : colors.dark

    return (
        <Container
            sx={{
                width: '30px',
                height: '30px',
                margin: 'auto'
            }}
        >
            <Container
                sx={{
                    position: 'absolute',
                    boxSizing: 'border-box',
                    border: '3px solid',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    animation: `${rotation} 1.2s cubic-bezier(0.5,0,0.5,1) infinite`,
                    animationDelay: '-0.45s',
                    borderColor: 'transparent',
                    borderTopColor: themeColors.background
                }}
            />
            <Container
                sx={{
                    position: 'absolute',
                    boxSizing: 'border-box',
                    border: '3px solid',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    animation: `${rotation} 1.2s cubic-bezier(0.5,0,0.5,1) infinite`,
                    animationDelay: '-0.3s',
                    borderColor: 'transparent',
                    borderTopColor: themeColors.background
                }}
            />
            <Container
                sx={{
                    position: 'absolute',
                    boxSizing: 'border-box',
                    border: '3px solid',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    animation: `${rotation} 1.2s cubic-bezier(0.5,0,0.5,1) infinite`,
                    animationDelay: '-0.15s',
                    borderColor: 'transparent',
                    borderTopColor: themeColors.background
                }}
            />
            <Container
                sx={{
                    position: 'absolute',
                    boxSizing: 'border-box',
                    border: '3px solid',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    animation: `${rotation} 1.2s cubic-bezier(0.5,0,0.5,1) infinite`,
                    borderColor: 'transparent',
                    borderTopColor: themeColors.background
                }}
            />
        </Container>
    )
}
