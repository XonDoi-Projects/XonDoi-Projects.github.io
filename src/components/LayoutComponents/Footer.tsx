import { CSSProperties, FunctionComponent, ReactNode } from 'react'
import { Container } from './Container'
import { Card } from './Card'
import { Button } from '../InputComponents'
import Image from 'next/image'
import { Typography } from './Typography'
import Link from 'next/link'
import { useDarkTheme, useSize } from '../Providers'
import { colors } from '../Colors'

export interface FooterProps {
    sx?: CSSProperties
}

export const Footer: FunctionComponent<FooterProps> = (props) => {
    const { mobile, size } = useSize()
    const { light } = useDarkTheme()

    return (
        <Container
            sx={{
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                maxHeight: '70px',
                position: mobile ? 'relative' : 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 2,
                padding: '0px 5px',
                borderBottomRightRadius: '0px',
                borderBottomLeftRadius: '0px',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: !mobile
                    ? 'transparent'
                    : light
                    ? colors.light.background
                    : colors.dark.background,
                ...props.sx
            }}
        >
            <Container
                sx={{
                    maxWidth: 'fit-content',
                    backgroundColor: !mobile
                        ? 'transparent'
                        : light
                        ? colors.light.background
                        : colors.dark.background
                }}
            >
                <Link href="https://github.com/xondoi" target="_blank">
                    <Button
                        sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'transparent',
                            padding: '0px'
                        }}
                    >
                        <Image
                            src={light ? '/GitLogo.svg' : '/GitLogoDark.png'}
                            alt="Git Logo"
                            width={40}
                            height={40}
                            style={{ objectFit: 'scale-down' }}
                        />
                    </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/nathanmagro/" target="_blank">
                    <Button
                        sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'transparent',
                            padding: '0px'
                        }}
                    >
                        <Image
                            src={'/InLogo.svg'}
                            alt="LinkedIn Logo"
                            width={35}
                            height={35}
                            style={{ objectFit: 'scale-down' }}
                        />
                    </Button>
                </Link>
            </Container>
        </Container>
    )
}
