import { CSSProperties, FunctionComponent, ReactNode, useEffect, useRef } from 'react'
import { Card, Container } from '../LayoutComponents'
import { Typography } from '../LayoutComponents/Typography'
import Image from 'next/image'
import { useDarkTheme, useSize } from '../Providers'
import { colors } from '../Colors'

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
                height: '200px'
            }}
        >
            {mobile.mobile ? (
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
