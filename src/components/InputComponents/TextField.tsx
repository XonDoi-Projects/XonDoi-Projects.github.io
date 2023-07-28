import { CSSProperties, ChangeEvent, FunctionComponent, ReactNode, useState } from 'react'
import { FieldContainer } from '../LayoutComponents'
import styled from '@emotion/styled'

export interface TextFieldProps extends StyledInputProps {
    label?: string
    errorText?: string
    helperText?: string
    fieldContainerSx?: CSSProperties
    value: string
    onChange: (value: string) => void
    suffix?: ReactNode
    type?: 'text' | 'password'
}

interface StyledInputProps {
    sx?: CSSProperties
}

const StyledInput = styled.input<StyledInputProps>(
    ({ sx }) => ({
        height: '40px',
        width: '100%',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'transparent',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 400,
        fontSize: '16px',
        outline: 'none',
        padding: '0px 10px',
        ...sx
    }),
    `:focus {
            outline: none;
        }`
)

export const TextField: FunctionComponent<TextFieldProps> = ({
    value,
    onChange,
    sx,
    fieldContainerSx,
    ...props
}) => {
    const [isFocus, setIsFocus] = useState(false)

    const onValueChange = (value: ChangeEvent<HTMLInputElement>) => {
        onChange(value.target.value)
    }

    return (
        <FieldContainer sx={fieldContainerSx} {...props} isFocus={isFocus}>
            <StyledInput
                type={props.type || 'text'}
                value={value}
                onChange={onValueChange}
                sx={{ ...sx }}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
            {props.suffix ? props.suffix : <></>}
        </FieldContainer>
    )
}
