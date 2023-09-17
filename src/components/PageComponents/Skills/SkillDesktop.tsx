import { FunctionComponent, useEffect, useRef } from 'react'
import { Container } from '../../LayoutComponents'
import Image from 'next/image'
import { useDarkTheme, useSize } from '../../Providers'
import { colors } from '../../Colors'
import Link from 'next/link'

export interface SkillDesktopProps {
    src: string
    alt: string
    link: string
    scrollIntoViewPointer: boolean
    parentWidth: number
}

export const SkillDesktop: FunctionComponent<SkillDesktopProps> = (props) => {
    const mobile = useSize()
    const { light } = useDarkTheme()

    return (
        <Container
            sx={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {mobile.mobile ? (
                props.alt === 'NextJS' && !light ? (
                    <Container
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundColor: colors.light.background
                        }}
                    >
                        <Link
                            href={props.link}
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                src={props.src}
                                alt={props.alt}
                                width={
                                    mobile.mobile && mobile.size?.width
                                        ? mobile.size?.width - 70
                                        : props.parentWidth
                                }
                                height={170}
                                style={{
                                    position: 'relative',
                                    objectFit: 'scale-down'
                                }}
                            />
                        </Link>
                    </Container>
                ) : (
                    <Link href={props.link} target="_blank">
                        {' '}
                        <Image
                            src={props.src}
                            alt={props.alt}
                            width={
                                mobile.mobile && mobile.size?.width
                                    ? mobile.size?.width - 40
                                    : props.parentWidth
                            }
                            height={200}
                            style={{
                                position: 'relative',
                                objectFit: 'scale-down'
                            }}
                        />
                    </Link>
                )
            ) : props.alt === 'NextJS' && !light ? (
                <Container
                    sx={{
                        height: '100%',
                        width: '100%',
                        borderRadius: '50%',
                        backgroundColor: colors.light.background,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Link
                        href={props.link}
                        target="_blank"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        {' '}
                        <Image
                            src={props.src}
                            alt={props.alt}
                            width={props.parentWidth / 4 - 50}
                            height={props.parentWidth / 4 - 50}
                            style={{
                                boxSizing: 'border-box',
                                objectFit: 'scale-down'
                            }}
                        />
                    </Link>
                </Container>
            ) : (
                <Link href={props.link} target="_blank">
                    <Image
                        src={props.src}
                        alt={props.alt}
                        fill
                        style={{
                            objectFit: 'scale-down'
                        }}
                    />
                </Link>
            )}
        </Container>
    )
}
