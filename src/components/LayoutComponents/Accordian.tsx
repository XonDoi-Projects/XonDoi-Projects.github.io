import { FunctionComponent, useState } from 'react'
import { Container } from './Container'
import { Typography } from './Typography'
import { useDarkTheme } from '../Providers'
import { colors } from '../Colors'
import { BiChevronDown, BiChevronRight } from 'react-icons/bi'
import { Button } from '../InputComponents'

export interface AccordianProps {
    title: string
    data?: string[]
}

export const Accordian: FunctionComponent<AccordianProps> = (props) => {
    const [show, setShow] = useState(false)
    const { light } = useDarkTheme()

    return (
        <Container
            sx={{
                flex: show ? 1 : 0,
                flexDirection: 'column',
                minHeight: '50px',
                maxHeight: show && props.data ? (props.data.length + 1) * 50 + 'px' : '50px',
                height: show && props.data ? (props.data.length + 1) * 50 + 'px' : '50px',
                transition: 'all 0.3s',
                backgroundColor: light ? colors.light.background : colors.dark.background,
                border: '1px solid',
                borderColor: light ? colors.light.accent : colors.dark.accent,
                borderRadius: '10px',
                overflow: 'hidden'
            }}
        >
            <Container
                sx={{
                    backgroundColor: light ? colors.light.accent : colors.dark.accent,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: '10px'
                }}
            >
                <Typography
                    sx={{
                        margin: '0px',
                        color: light ? colors.light.accentForeground : colors.dark.accentForeground
                    }}
                >
                    {props.title}
                </Typography>
                <Button
                    sx={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        transform: show ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                        padding: '0px',
                        backgroundColor: 'transparent'
                    }}
                    onClick={() => setShow(!show)}
                >
                    <BiChevronRight
                        style={{
                            fontSize: '60px',
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground
                        }}
                    />
                </Button>
            </Container>
            {props.data?.map((item, index) => (
                <Container
                    key={index}
                    sx={{
                        height: '50px',
                        paddingLeft: '10px',
                        alignItems: 'center'
                    }}
                >
                    <Typography>{item}</Typography>
                </Container>
            ))}
        </Container>
    )
}
