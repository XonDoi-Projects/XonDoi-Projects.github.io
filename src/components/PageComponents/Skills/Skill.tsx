import { CSSProperties, FunctionComponent, ReactNode, useEffect, useRef } from 'react'
import { Card, Container } from '../../LayoutComponents'
import { Typography } from '../../LayoutComponents/Typography'
import Image from 'next/image'
import { useDarkTheme, useSize } from '../../Providers'
import { colors } from '../../Colors'

export interface SkillProps {
    src: string
    alt: string
    scrollIntoViewPointer: boolean
    parentWidth: number
}

export const Skill: FunctionComponent<SkillProps> = (props) => {
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
                props.alt === 'Next' && !light ? (
                    <Container
                        sx={{
                            width: '170px',
                            height: '170px',
                            borderRadius: '50%',
                            backgroundColor: colors.light.background
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
                    </Container>
                ) : (
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
                )
            ) : props.alt === 'Next' && !light ? (
                <Container
                    sx={{
                        height: '160px',
                        width: '160px',
                        borderRadius: '50%',
                        backgroundColor: colors.light.background
                    }}
                >
                    <Image
                        src={props.src}
                        alt={props.alt}
                        fill
                        style={{
                            objectFit: 'scale-down'
                        }}
                    />
                </Container>
            ) : (
                <Image
                    src={props.src}
                    alt={props.alt}
                    fill
                    style={{
                        objectFit: 'scale-down'
                    }}
                />
            )}
        </Container>
    )
}
