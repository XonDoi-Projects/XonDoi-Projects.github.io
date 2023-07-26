import { CSSProperties, FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react'
import { Container } from './Container'
import { Card } from './Card'
import { Button } from '../InputComponents'
import { Typography } from './Typography'
import Link from 'next/link'
import { useDarkTheme, useSize } from '../Providers'
import { BiMenu, BiAdjust } from 'react-icons/bi'
import { keyframes } from '@emotion/react'
import { colors } from '../Colors'
import { FadeInOut } from './FadeInOut'
import { SkillsShowcase } from '../PageComponents'
import { useClickOutside } from '../hooks'

export interface HeaderProps {
    sx?: CSSProperties
}

const nav = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Projects', link: '/projects' },
    { name: 'Contact', link: '/contact' }
]

export const Header: FunctionComponent<HeaderProps> = (props) => {
    const { mobile, size } = useSize()
    const { light, setLight } = useDarkTheme()

    const [show, setShow] = useState(false)

    const ref = useRef<HTMLDivElement | null>(null)
    const popupRef = useRef<HTMLDivElement | null>(null)

    const [navDOMRect, setNavDOMRect] = useState<DOMRect>()

    useEffect(() => {
        if (ref.current) {
            setNavDOMRect(ref.current.getBoundingClientRect())
        }
    }, [mobile])

    useClickOutside(popupRef, () => setShow(false))

    return (
        <Container
            ref={ref}
            sx={{
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                height: '50px',
                maxHeight: '50px',
                position: mobile ? 'sticky' : 'absolute',
                top: 0,
                left: 0,
                zIndex: 2,
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
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
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Container
                    sx={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            padding: '0px',
                            backgroundColor: 'transparent'
                        }}
                        onClick={() => setLight(!light)}
                    >
                        <BiAdjust style={{ fontSize: '30px' }} />
                    </Button>
                    <Container sx={{ width: '10px' }} />
                    {!mobile ? (
                        nav.map((item, index) => (
                            <Link
                                key={index}
                                href={item.link}
                                style={{ textDecoration: 'none', marginRight: '20px' }}
                            >
                                <Typography
                                    variant="linker"
                                    sx={{
                                        fontWeight: 600
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            </Link>
                        ))
                    ) : (
                        <>
                            <Button
                                sx={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    padding: '0px',
                                    backgroundColor: 'transparent'
                                }}
                                onClick={() => setShow(!show)}
                            >
                                <BiMenu style={{ fontSize: '30px' }} />
                            </Button>
                            <Container
                                ref={popupRef}
                                sx={{
                                    position: 'absolute',
                                    top: navDOMRect?.height,
                                    left: 0,
                                    width: size?.width,
                                    height: show ? nav.length * 57 + 'px' : '0px',
                                    overflow: 'hidden',
                                    zIndex: 9999,
                                    transition: 'height 0.4s',
                                    transitionTimingFunction: 'cubic-bezier(0, 0, 0, 1)'
                                }}
                            >
                                <Card
                                    sx={{
                                        flexDirection: 'column',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '0px'
                                    }}
                                >
                                    {nav.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.link}
                                            style={{
                                                textDecoration: 'none',
                                                marginLeft: '20px'
                                            }}
                                        >
                                            <Typography variant="linker" sx={{ fontWeight: 600 }}>
                                                {item.name}
                                            </Typography>
                                        </Link>
                                    ))}
                                </Card>
                            </Container>
                        </>
                    )}
                </Container>
            </Container>
        </Container>
    )
}
