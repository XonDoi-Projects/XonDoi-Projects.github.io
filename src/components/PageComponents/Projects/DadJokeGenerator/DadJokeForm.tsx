import { CSSProperties, FunctionComponent } from 'react'
import { Card } from '@/components/LayoutComponents'
import { useDarkTheme, useSize } from '@/components/Providers'
import { colors } from '@/components/Colors'

export interface DadJokeFormProps {
    sx?: CSSProperties
}

export const DadJokeForm: FunctionComponent<DadJokeFormProps> = (props) => {
    const { light } = useDarkTheme()
    const mobile = useSize()

    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                border: 'solid',
                borderWidth: '1px',
                borderColor: light ? colors.light.accent : colors.dark.accent,
                boxSizing: 'border-box',
                alignItems: 'center',
                justifyContent: 'flex-start',
                margin: mobile.mobile ? '0px 0px 20px 0px ' : '0px',
                ...props.sx
            }}
        ></Card>
    )
}
