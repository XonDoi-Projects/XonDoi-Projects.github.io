import { colors } from '@/components/Colors'
import { Button } from '@/components/InputComponents'
import { Card, Container } from '@/components/LayoutComponents'
import { Typography } from '@/components/LayoutComponents/Typography'
import { useSize, useDarkTheme } from '@/components/Providers'
import { keyframes } from '@emotion/react'
import Link from 'next/link'
import { CSSProperties, FunctionComponent, useState } from 'react'
import { BiChevronUp } from 'react-icons/bi'

export interface Project {
    title: string
    excerpt: string
    description: string
    link?: string
    tags?: string[]
}
export interface ProjectCardProps {
    sx?: CSSProperties
    project: Project
}

const scaleUp = keyframes({
    '0%': { transform: 'scale(1)', transformOrigin: 'center' },
    '100%': { transform: 'scale(1.1)', transformOrigin: 'center' }
})

const scaleDown = keyframes({
    '100%': { transform: 'scale(1)', transformOrigin: 'center' },
    '0%': { transform: 'scale(1.1)', transformOrigin: 'center' }
})

export const ProjectCard: FunctionComponent<ProjectCardProps> = (props) => {
    const mobile = useSize()
    const { light } = useDarkTheme()
    const [hover, setHover] = useState<boolean>()

    const [show, setShow] = useState(false)

    return (
        <Card
            sx={{
                flex: 1,
                position: 'relative',
                width: '100%',
                height: 'fit-content',
                border: 'solid',
                borderWidth: '1px',
                borderColor: light ? colors.light.accent : colors.dark.accent,
                boxSizing: 'border-box',
                justifyContent: 'center',
                alignItems: 'center',
                margin: mobile.mobile ? '0px 0px 20px 0px ' : '20px 0px',
                animation: `${hover ? scaleUp : hover !== undefined ? scaleDown : undefined}`,
                animationDuration: '0.1s',
                animationDirection: 'normal',
                animationTimingFunction: 'ease-in',
                animationFillMode: 'forwards',
                ...props.sx
            }}
        >
            {props.project.link ? (
                <Link href={props.project.link} style={{ width: '100%', textDecoration: 'none' }}>
                    <Container
                        sx={{
                            flexDirection: 'column',
                            flex: 1,
                            width: '100%',
                            height: 'fit-content',
                            padding: '20px',
                            overflow: 'auto'
                        }}
                        hidescrollBar
                        onPointerEnter={(e) => {
                            if (e.relatedTarget as HTMLDivElement) {
                                e.preventDefault()
                                setHover(true)
                            }
                        }}
                        onPointerLeave={(e) => {
                            if (e.relatedTarget as HTMLDivElement) {
                                e.preventDefault()
                                setHover(false)
                            }
                        }}
                    >
                        <Typography
                            variant="subtitle"
                            sx={{ fontSize: '30px', marginTop: '10px', marginBottom: '10px' }}
                        >
                            {props.project.title}
                        </Typography>
                        {show ? (
                            <Container sx={{ flexDirection: 'column' }}>
                                <Typography
                                    variant="body"
                                    sx={{ flex: 1, whiteSpace: 'pre-line', fontSize: '16px' }}
                                >
                                    {props.project.excerpt}
                                </Typography>
                                <Typography
                                    variant="body"
                                    sx={{ flex: 1, whiteSpace: 'pre-line', fontSize: '16px' }}
                                >
                                    {props.project.description}
                                </Typography>
                                <Container sx={{ flexDirection: 'row-reverse' }}>
                                    <Button
                                        sx={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            padding: '0px',
                                            backgroundColor: 'transparent'
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setShow(false)
                                            setHover(false)
                                        }}
                                    >
                                        <BiChevronUp style={{ fontSize: '20px' }} />
                                    </Button>
                                </Container>
                            </Container>
                        ) : (
                            <Container sx={{ flexDirection: 'column' }}>
                                <Typography
                                    variant="body"
                                    sx={{ flex: 1, whiteSpace: 'pre-line', fontSize: '16px' }}
                                >
                                    {props.project.excerpt}
                                </Typography>
                                <Typography
                                    variant="body"
                                    sx={{ width: 'fit-content', fontSize: '16px' }}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setShow(true)
                                    }}
                                    hasHover
                                >
                                    Read More...
                                </Typography>
                            </Container>
                        )}
                        <Container sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }}>
                            {props.project.tags?.map((tag, index, array) => (
                                <Container key={index} sx={{ gap: '10px' }}>
                                    <Container
                                        sx={{
                                            backgroundColor: light
                                                ? colors.light.secondary
                                                : colors.dark.secondary,
                                            height: '25px',
                                            width: 'fit-content',
                                            padding: '5px 10px',
                                            borderRadius: '12.5px'
                                        }}
                                    >
                                        <Typography
                                            variant="small"
                                            sx={{
                                                margin: '0',
                                                color: light
                                                    ? colors.light.background
                                                    : colors.dark.background
                                            }}
                                        >
                                            {tag}
                                        </Typography>
                                    </Container>
                                    {index < array.length - 1 ? (
                                        <Typography
                                            sx={{
                                                margin: '0px',
                                                color: light
                                                    ? colors.light.secondary
                                                    : colors.dark.secondary
                                            }}
                                        >
                                            •
                                        </Typography>
                                    ) : (
                                        <></>
                                    )}
                                </Container>
                            ))}
                        </Container>
                    </Container>
                </Link>
            ) : (
                <Container
                    sx={{
                        flexDirection: 'column',
                        flex: 1,
                        width: '100%',
                        height: 'fit-content',
                        padding: '20px',
                        overflow: 'auto'
                    }}
                    hidescrollBar
                    onMouseEnter={(e) => {
                        e.preventDefault()
                        setHover(true)
                    }}
                    onMouseLeave={(e) => {
                        e.preventDefault()
                        setHover(false)
                    }}
                >
                    <Typography
                        variant="subtitle"
                        sx={{ fontSize: '30px', marginTop: '10px', marginBottom: '10px' }}
                    >
                        {props.project.title}
                    </Typography>
                    <Typography
                        variant="body"
                        sx={{ flex: 1, whiteSpace: 'pre-line', fontSize: '16px' }}
                    >
                        {props.project.excerpt}
                    </Typography>
                </Container>
            )}
        </Card>
    )
}
