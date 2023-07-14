import { CSSProperties, ChangeEvent, FunctionComponent, useState } from 'react'
import { FieldContainer } from '../LayoutComponents'
import styled from '@emotion/styled'

export interface TextAreaFieldProps extends StyledInputProps {
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

const StyledInput = styled.textarea<StyledInputProps>(
    ({ sx }) => ({
        width: '100%',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'transparent',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 400,
        fontSize: '16px',
        padding: '15px 12px',
        resize: 'none',
        outline: 'none',
        ...sx,

        '::-webkit-scrollbar': {
            width: '10px',
            height: '10px',
            backgroundColor: 'transparent'
        },
        '::-webkit-scrollbar-thumb': {
            border: '2px solid transparent',
            backgroundClip: 'content-box',
            borderRadius: '8px',
            backgroundColor: sx?.color
        },
        '::-webkit-scrollbar-track': {}
    }),
    `:focus {
            outline: none;
        }`
)

export const TextAreaField: FunctionComponent<TextAreaFieldProps> = ({
    value,
    onChange,
    sx,
    fieldContainerSx,
    ...props
}) => {
    const [isFocus, setIsFocus] = useState(false)

    const onValueChange = (value: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(value.target.value)
    }

    return (
        <FieldContainer sx={fieldContainerSx} {...props} isFocus={isFocus}>
            <StyledInput
                value={value}
                onChange={onValueChange}
                sx={{ ...sx }}
                rows={4}
                style={{ height: undefined }}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
        </FieldContainer>
    )
}
