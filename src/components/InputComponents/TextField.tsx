import { CSSProperties, ChangeEvent, FunctionComponent, useState } from 'react'
import { FieldContainer } from '../LayoutComponents'
import styled from '@emotion/styled'

export interface TextFieldProps extends StyledInputProps {
    label?: string
    errorText?: string
    helperText?: string
    fieldContainerSx?: CSSProperties
    value: string
    onChange: (value: string) => void
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
                value={value}
                onChange={onValueChange}
                type="text"
                sx={{ ...sx }}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
        </FieldContainer>
    )
}
