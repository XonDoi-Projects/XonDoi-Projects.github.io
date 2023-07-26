import styled from '@emotion/styled'
import {
    CSSProperties,
    ChangeEvent,
    Fragment,
    FunctionComponent,
    HTMLProps,
    ReactNode
} from 'react'
import { Container } from '../LayoutComponents'
import { Typography } from '../LayoutComponents/Typography'
import { useDarkTheme } from '../Providers'
import { colors } from '../Colors'
import { Button } from './Button'
import { values } from 'lodash'
import { BiRadioCircle, BiRadioCircleMarked, BiSolidRadio } from 'react-icons/bi'

export interface RadioButtonGroupProps extends StyledRadioButton {
    buttonList: string[]
    contentSx?: CSSProperties
    direction?: 'left' | 'right'
    value: string
    onChange: (value: string) => void
}

interface StyledRadioButton {
    disabled?: boolean
    light?: boolean
    sx?: CSSProperties
    children?: ReactNode
}

const StyledRadioButton = styled.div<StyledRadioButton>(({ disabled, light, sx }) => ({
    margin: 0,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20px',
    width: '20px',
    borderRadius: '50%',
    border: '1px solid',
    borderColor: light ? colors.light.background : colors.dark.background,
    ...sx
}))

export const RadioButtonGroup: FunctionComponent<RadioButtonGroupProps> = (props) => {
    const { light } = useDarkTheme()

    const onValueChange = (value: string) => {
        props.onChange(value)
    }

    return (
        <Container
            sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                ...props.contentSx
            }}
        >
            {props.buttonList.map((button, index) => (
                <Container
                    key={index}
                    sx={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        onClick={() => onValueChange(button)}
                        sx={{
                            margin: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '40px',
                            width: '40px',
                            borderRadius: '50%',
                            ...props.sx
                        }}
                    >
                        {/* <Container
                            sx={{
                                backgroundColor:
                                    props.value !== button
                                        ? undefined
                                        : light
                                        ? colors.light.background
                                        : colors.dark.background,
                                height: '10px',
                                width: '10px',
                                borderRadius: '50%'
                            }}
                        /> */}
                        {props.value !== button ? (
                            <BiRadioCircle
                                color={light ? colors.light.background : colors.dark.background}
                                style={{ fontSize: '30px' }}
                            />
                        ) : (
                            <BiRadioCircleMarked
                                color={light ? colors.light.background : colors.dark.background}
                                style={{ fontSize: '30px' }}
                            />
                        )}
                    </Button>
                    <Typography
                        variant="small"
                        sx={{
                            fontWeight: 500,
                            marginRight: '20px',
                            color: light ? colors.light.background : colors.dark.background
                        }}
                    >
                        {button}
                    </Typography>
                </Container>
            ))}
        </Container>
    )
}

RadioButtonGroup.defaultProps = { direction: 'right' }
