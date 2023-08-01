import styled from '@emotion/styled'
import { CSSProperties, FunctionComponent, HTMLProps, Ref, forwardRef } from 'react'
import { useDarkTheme } from '../Providers'
import { colors } from '../Colors'

export interface StyledContainerProps extends HTMLProps<HTMLDivElement> {
    sx?: CSSProperties
    hidescrollBar?: boolean
    ref?: Ref<HTMLDivElement>
    light?: boolean
    swapScrollBar?: boolean
    // onWheel?: () => void
}

export const StyledContainer = styled.div<StyledContainerProps>(
    ({ sx, hidescrollBar, light, swapScrollBar }) => ({
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
            backgroundColor: swapScrollBar
                ? light
                    ? colors.light.background
                    : colors.dark.background
                : light
                ? colors.light.foreground
                : colors.dark.foreground
        },
        '::-webkit-scrollbar-track': {}
    })
)

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
            onTouchStart={props.onTouchStart}
            onTouchEnd={props.onTouchEnd}
            onTouchMove={props.onTouchMove}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            swapScrollBar={props.swapScrollBar}
        >
            {props.children}
        </StyledContainer>
    )
})

Container.displayName = 'Container'

StyledContainer.defaultProps = {
    hidescrollBar: false
}
