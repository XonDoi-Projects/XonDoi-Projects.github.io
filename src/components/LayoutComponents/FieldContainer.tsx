import { CSSProperties, FunctionComponent, ReactNode } from 'react'
import { Container } from './Container'
import { Typography } from './Typography'
import { useDarkTheme } from '../Providers'
import { colors } from '../Colors'

export interface FieldContainerProps {
    sx?: CSSProperties
    label?: string
    errorText?: string
    helperText?: string
    children?: ReactNode
    isFocus?: boolean
}

export const FieldContainer: FunctionComponent<FieldContainerProps> = (props) => {
    const { light } = useDarkTheme()
    return (
        <>
            <Container>
                <Typography
                    variant="field"
                    sx={{
                        color: props.errorText
                            ? light
                                ? colors.light.error
                                : colors.dark.error
                            : light
                            ? colors.dark.background
                            : colors.light.background,
                        marginBottom: '0px'
                    }}
                >
                    {props.label || ''}
                </Typography>
            </Container>
            <Container
                sx={{
                    border: '1px solid',
                    borderColor: props.errorText
                        ? light
                            ? colors.light.error
                            : colors.dark.error
                        : props.isFocus
                        ? light
                            ? colors.light.secondary
                            : colors.dark.secondary
                        : light
                        ? colors.dark.background
                        : colors.light.background,
                    borderRadius: '4px',
                    marginBottom: '0px'
                }}
            >
                {props.children}
            </Container>
            <Container sx={{ height: '12px' }}>
                <Typography
                    variant="small"
                    sx={{
                        color: light ? colors.light.error : colors.dark.error,
                        margin: '0px'
                    }}
                >
                    {props.errorText}
                </Typography>
            </Container>
            <Container sx={{ height: '12px' }}>
                <Typography
                    variant="small"
                    sx={{
                        color: light ? colors.dark.background : colors.light.background,
                        margin: '0px'
                    }}
                >
                    {props.helperText}
                </Typography>
            </Container>
        </>
    )
}
