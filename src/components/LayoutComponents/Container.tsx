import Image from 'next/image'
import styled from '@emotion/styled'
import { CSSProperties, FunctionComponent, HTMLProps, Ref, forwardRef } from 'react'
import { useDarkTheme } from '../Providers'
import { colors } from '../Colors'

export interface StyledContainerProps extends HTMLProps<HTMLDivElement> {
    sx?: CSSProperties
    hidescrollBar?: boolean
    ref?: Ref<HTMLDivElement>
    light?: boolean
    // onWheel?: () => void
}

export const StyledContainer = styled.div<StyledContainerProps>(({ sx, hidescrollBar, light }) => ({
    display: 'flex',
    position: 'relative',
    padding: '0',
    margin: '0',
    flexShrink: 0,
    flexGrow: 0,
    boxSizing: 'border-box',

    ...sx,
    '::-webkit-scrollbar': {
        width: '10px',
        height: '10px',
        backgroundColor: 'transparent',
        display: hidescrollBar ? 'none' : undefined
    },
    '::-webkit-scrollbar-thumb': {
        border: '2px solid transparent',
        backgroundClip: 'content-box',
        borderRadius: '8px',
        backgroundColor: light ? colors.light.accent : colors.dark.accent
    },
    '::-webkit-scrollbar-track': {}
}))

export const Container: FunctionComponent<StyledContainerProps> = forwardRef((props, ref) => {
    const { light } = useDarkTheme()

    return (
        <StyledContainer
            id={props.id}
            ref={ref}
            sx={{
                ...props.sx
            }}
            light={light}
            hidescrollBar={props.hidescrollBar}
            onClick={props.onClick}
            onWheel={props.onWheel}
            onTouchMove={props.onTouchMove}
        >
            {props.children}
        </StyledContainer>
    )
})

Container.displayName = 'Container'

StyledContainer.defaultProps = {
    hidescrollBar: false
}
