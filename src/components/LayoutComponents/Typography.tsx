import styled from '@emotion/styled'
import { CSSProperties, FunctionComponent, ReactNode } from 'react'
import { useDarkTheme } from '../Providers'
import { colors } from '../Colors'

type FontVariants =
    | 'supertitle'
    | 'title'
    | 'subtitle'
    | 'button'
    | 'body'
    | 'linker'
    | 'field'
    | 'small'

export interface TypographyProps extends StyledTypographyProps {
    children: ReactNode
}

interface FontCSS {
    fontSize: string
    fontWeight: number
    letterSpacing?: string
    color?: string
    textTransform?: string
}

type FontVariant = {
    [key in FontVariants]: FontCSS
}

const fontTemplates: FontVariant = {
    supertitle: {
        fontSize: '56px',
        fontWeight: 700
    },
    title: {
        fontSize: '38px',
        fontWeight: 600
    },
    subtitle: {
        fontSize: '32px',
        fontWeight: 500,
        textTransform: 'uppercase'
    },
    button: {
        fontSize: '18px',
        fontWeight: 500
    },
    body: {
        fontSize: '20px',
        fontWeight: 500,
        letterSpacing: '1px'
    },
    linker: {
        fontSize: '18px',
        fontWeight: 400
    },
    field: {
        fontSize: '16px',
        fontWeight: 400
    },
    small: { fontSize: '12px', fontWeight: 400 }
}

interface StyledTypographyProps {
    sx?: CSSProperties
    variant?: FontVariants
    light?: boolean
}

const StyledTypography = styled.p<StyledTypographyProps>(({ sx, variant, light }) => ({
    fontStyle: 'normal',
    ...sx,

    '@media (hover:hover) and (pointer: fine)': {
        '&:hover': {
            color:
                variant === 'linker'
                    ? light
                        ? colors.light.accent
                        : colors.dark.accent
                    : undefined
        }
    }
}))

export const Typography: FunctionComponent<TypographyProps> = (props) => {
    const variantSx = props.variant ? fontTemplates[props.variant] : {}

    const { light } = useDarkTheme()

    const themeColors = light ? colors.light : colors.dark

    return (
        <StyledTypography
            sx={{
                fontFamily:
                    props.variant === 'body'
                        ? 'Inter'
                        : props.variant === 'subtitle'
                        ? '"Montserrat", sans-serif'
                        : '"Roboto", sans-serif',
                color:
                    props.variant === 'supertitle' ||
                    props.variant === 'title' ||
                    props.variant === 'body'
                        ? themeColors.primary
                        : props.variant === 'subtitle' || props.variant === 'linker'
                        ? themeColors.secondary
                        : themeColors.foreground,
                ...variantSx,
                ...props.sx
            }}
            variant={props.variant}
            light={light}
        >
            {props.children}
        </StyledTypography>
    )
}

Typography.defaultProps = { variant: 'body' }
