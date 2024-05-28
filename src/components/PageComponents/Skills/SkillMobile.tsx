import { FunctionComponent, useEffect, useRef } from 'react'
import { Container } from '../../LayoutComponents'
import Image from 'next/image'
import { useDarkTheme, useSize } from '../../Providers'
import { colors } from '../../Colors'
import Link from 'next/link'

export interface SkillMobileProps {
    src: string
    alt: string
    link: string
    scrollIntoViewPointer: boolean
    parentWidth: number
}

export const SkillMobile: FunctionComponent<SkillMobileProps> = (props) => {
    const skillsRef = useRef<HTMLDivElement>(null)

    const mobile = useSize()
    const { light } = useDarkTheme()

    useEffect(() => {
        if (props.scrollIntoViewPointer) {
            skillsRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'center'
            })
        }
    }, [props.scrollIntoViewPointer])

    return (
        <Container
            ref={skillsRef}
            sx={{
                minWidth:
                    mobile.mobile && mobile.size?.width
                        ? mobile.size?.width - 40 + 'px'
                        : props.parentWidth,
                height: '200px',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {mobile.mobile ? (
                props.alt === 'NextJS' && !light ? (
                    <Container
                        sx={{
                            width: '170px',
                            height: '170px',
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
                                width={170}
                                height={170}
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
                        height: '170px',
                        width: '170px',
                        borderRadius: '50%',
                        backgroundColor: colors.light.background
                    }}
                >
                    <Link
                        href={props.link}
                        target="_blank"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Image
                            src={props.src}
                            alt={props.alt}
                            fill
                            style={{
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
